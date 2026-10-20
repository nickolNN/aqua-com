import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  type CollisionDetection,
  type DragEndEvent,
  type DragMoveEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { KanbanQuickAdd } from './KanbanQuickAdd';
import { useCreateTaskMutation, useUpdateTaskMutation, useUpdateTaskStatusMutation } from '@/api/tasksApi';
import { resolveDropPreview, resolveInsertIndex, type DropPreview } from './kanbanInsert';
import type { Task } from '@/types/entities';
import { cn } from '@/lib/utils';

type KanbanColumn = 'open' | 'in_progress' | 'completed' | 'cancelled';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

const columnLabels: Record<KanbanColumn, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const COLUMNS: KanbanColumn[] = ['open', 'in_progress', 'completed', 'cancelled'];

const columnClass = 'rounded-lg p-3 bg-muted border';

/**
 * Fallback card height for the dashed slot when no rect data is available;
 * the live value is the dragged card's own layout height
 * (active.rect.current.initial), so the slot matches the card being dragged,
 * not an arbitrary constant.
 */
const CARD_HEIGHT_FALLBACK = 96;

/** The flex `gap-2` (8px) between cards — the cross-column preview shift is
 *  one card + this gap. */
const CARD_GAP = 8;

/** Drop preview state: the pure resolver's answer plus the dragged card's
 *  layout height (sizes the dashed slot). */
interface DropPreviewState extends DropPreview {
  cardHeight: number;
}

// Layout-aware collision detector. dnd-kit's
// closestCenter reads the *transformed* DOM rect of every sortable node, so
// the preview offsets (cards shifted down via transform) would feed back
// into the `over` resolution and oscillate around the midpoint; the detector
// resolves `over` from the pointer against the column geometry instead:
// pointer inside a column → closest card in THAT column (vertical distance —
// the horizontal one is equal for every card in a column, gaps included);
// pointer below the column's last card → the column droppable (end of the
// column, closestCenter parity); no pointer (keyboard drag) → the active
// card itself (the in-column resolver then returns a no-op); pointer in no
// column (the 16px gaps between columns) → no over.
// A pointer inside a column stays put: shifting a card's measured rect down
// only moves it further from a pointer above it, and the pointer never sits
// inside the shifted run (it sits inside the slot's gap, below the last
// unshifted card), so `over` cannot oscillate.
const layoutCollisionDetection: CollisionDetection = ({
  active,
  droppableContainers,
  pointerCoordinates,
}) => {
  if (!pointerCoordinates) return [{ id: active.id }];
  const pointer = pointerCoordinates;

  for (const container of droppableContainers) {
    const rect = container.rect.current;
    if (!rect) continue;
    if (pointer.x < rect.left || pointer.x > rect.right || pointer.y < rect.top || pointer.y > rect.bottom) {
      continue; // pointer not in this column
    }

    const column = container.id as KanbanColumn;
    const cards = droppableContainers.filter((node) => node.data.current?.from === column);
    const lastCardRect = cards[cards.length - 1]?.rect.current;
    if (lastCardRect && pointer.y > lastCardRect.bottom) return [{ id: container.id }];

    let closestId: string | number | null = null;
    let closestDistance = Infinity;
    for (const card of cards) {
      const cardRect = card.rect.current;
      if (cardRect === null) continue;
      const distance = Math.abs(pointer.y - (cardRect.top + cardRect.height / 2));
      if (distance < closestDistance) {
        closestDistance = distance;
        closestId = card.id;
      }
    }
    return closestId !== null ? [{ id: closestId }] : [{ id: container.id }];
  }

  return [];
};

interface KanbanColumnProps {
  column: KanbanColumn;
  tasks: Task[];
  highlighted: boolean;
  onTaskClick: (taskId: string) => void;
  onAddTask: (status: string, title: string) => Promise<void>;
  /** The live landing-slot preview (drop preview), when it targets this
   *  column (null otherwise). */
  dropPreview: DropPreviewState | null;
  /** Registers each card's DOM node by id (slot sizing from the dragged
   *  card's layout height). */
  registerCard: (id: string, el: HTMLElement | null) => void;
}

function KanbanColumn({
  column,
  tasks,
  highlighted,
  onTaskClick,
  onAddTask,
  dropPreview,
  registerCard,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column });

  // This column hosts the live landing slot (drop preview).
  const isPreviewColumn = dropPreview?.column === column;

  // No-op preview (the card lands where it is): nothing moves — no slot.
  // dnd-kit's own layout animation is the identity in this case, so there is
  // no gap for the slot to mark.
  const isNoOp = isPreviewColumn && dropPreview !== null && dropPreview.noOp;

  // Dashed landing slot: rendered absolutely positioned, so the layout (and
  // dnd-kit's measurements) is untouched. dnd-kit's native layout animation
  // (rectSortingStrategy) already shifts the cards out of the way during the
  // drag — the active card is inserted at the hovered card's index and the
  // gap it opens always sits at the HOVERED card's original (layout) top. So
  // the slot top is the hovered card's offsetTop (layout position — transforms
  // don't affect it), measured from the DOM; at the end of a non-empty column
  // it is the last card's bottom, and an empty column slots at the top.
  const slotVisible =
    isPreviewColumn && dropPreview !== null && dropPreview.insertIndex <= tasks.length && !isNoOp;

  // The cards' DOM nodes, in position order — the hovered card is
  // tasks[insertIndex] (the full list includes the active card), and the
  // last card is tasks[tasks.length - 1].
  const cardEls = useRef<Array<HTMLElement | null>>([]);
  const [slotTop, setSlotTop] = useState(0);
  useLayoutEffect(() => {
    if (!slotVisible || dropPreview === null) return;
    const n = tasks.length;
    const i = dropPreview.insertIndex;
    if (i < n) {
      const el = cardEls.current[i];
      setSlotTop(el ? el.offsetTop : 0);
    } else if (n > 0) {
      const el = cardEls.current[n - 1];
      setSlotTop(el ? el.offsetTop + el.offsetHeight : 0);
    } else {
      setSlotTop(0);
    }
  }, [slotVisible, dropPreview, tasks]);

  // The cross-column per-card shift: dnd-kit's native layout animation only
  // reorders the ACTIVE column (the target column's items never include the
  // active card, so it opens no gap);
  // in a cross-column preview the target column's cards at/after the slot
  // slide down by one card + gap. In-column the native animation already
  // shifts the cards (and packs them up), so no offset there — only the slot.
  const offsetFor = (index: number) =>
    isPreviewColumn &&
    dropPreview !== null &&
    !dropPreview.noOp &&
    !dropPreview.activeIsInTarget &&
    index >= dropPreview.insertIndex
      ? dropPreview.cardHeight + CARD_GAP
      : 0;

  // a11y — the droppable container announces its column name.
  // Drop indicator: `isOver` is true only when the over-droppable is the column
  // itself (pointer below the last card / no rect data, per the layout-aware
  // collision detector); `highlighted` covers drags over cards in a
  // non-empty column.
  return (
    <div
      ref={setNodeRef}
      role="group"
      aria-label={columnLabels[column]}
      className={cn(columnClass, (isOver || highlighted) && 'ring-2 ring-primary')}
    >
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-medium">{columnLabels[column]}</h3>
        <Badge variant="secondary" data-testid="kanban-column-count">
          {tasks.length}
        </Badge>
      </div>
      <div className="mb-2">
        <KanbanQuickAdd onSubmit={(title) => onAddTask(column, title)} />
      </div>

      <SortableContext items={tasks.map((task) => task.id)}>
        {/* 8px vertical gap between cards; dnd-kit measures only the sortable
            cards, so the flex wrapper doesn't affect the drag logic. `relative`
            anchors the absolute dashed slot to the cards' layout top. */}
        <div className="relative flex flex-col gap-2">
          {slotVisible && (
            <div
              aria-hidden="true"
              data-testid="kanban-drop-slot"
              className="pointer-events-none absolute inset-x-0 z-10 rounded-lg border-2 border-dashed border-primary/60 bg-primary/5"
              style={{ top: slotTop, height: dropPreview!.cardHeight }}
            />
          )}
          {tasks.map((task, index) => (
            <KanbanTaskCard
              key={task.id}
              task={task}
              column={column}
              onTaskClick={onTaskClick}
              offsetY={offsetFor(index)}
              registerCard={registerCard}
              cardRef={(el) => {
                cardEls.current[index] = el;
              }}
            />
          ))}
        </div>
      </SortableContext>

      {tasks.length === 0 && (
        <Card className="p-6 text-center text-muted-foreground" data-testid="kanban-empty-column">
          No tasks
        </Card>
      )}
    </div>
  );
}

interface KanbanCardContentProps {
  task: Task;
}

/** Presentational card body, shared by the real card and the drag ghost. */
function KanbanCardContent({ task }: KanbanCardContentProps) {
  return (
    <>
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium">{task.title}</span>
        <Badge variant="priority" value={task.priority}>
          {task.priority}
        </Badge>
      </div>
      {task.description && (
        <p className="text-sm text-muted-foreground mt-2 truncate">{task.description}</p>
      )}
      {task.due_date && (
        <p className="text-xs text-muted-foreground mt-1">
          Due: {new Date(task.due_date).toLocaleDateString()}
        </p>
      )}
    </>
  );
}

interface KanbanTaskCardProps {
  task: Task;
  column: KanbanColumn;
  onTaskClick: (taskId: string) => void;
  /** The card's DOM node (position order) — lets the column measure the
   *  hovered card's layout top for the dashed landing slot. */
  cardRef?: (el: HTMLElement | null) => void;
  /** The cross-column shift — cards at/after the landing slot slide down by
   *  one card + gap; 0 otherwise. */
  offsetY?: number;
  /** Registers the card's DOM node by id. */
  registerCard?: (id: string, el: HTMLElement | null) => void;
}

function KanbanTaskCard({ task, column, onTaskClick, cardRef, registerCard, offsetY = 0 }: KanbanTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { from: column },
  });

  // dnd-kit's Transform object as a CSS string (its type is not a CSS
  // transform); null outside a layout animation. The cross-column offset
  // merges into it: dnd-kit's native animation only reorders the active
  // column, so the target column's cards shift via this offset.
  const cssTransform = transform
    ? `translate3d(${transform.x}px, ${transform.y + offsetY}px, 0)`
    : offsetY
      ? `translateY(${offsetY}px)`
      : undefined;

  // a11y — cards are focusable (useSortable sets tabIndex) and announce
  // title + priority; aria-grabbed mirrors the drag state.
  return (
    <Card
      data-testid="kanban-task-card"
      ref={(el) => {
        setNodeRef(el);
        cardRef?.(el);
        registerCard?.(task.id, el);
      }}
      {...listeners}
      {...attributes}
      aria-label={`${task.title}, priority ${task.priority}`}
      aria-grabbed={isDragging}
      // dnd-kit's own transform/transition when present (in-column native
      // animation); a local transition animates the cross-column offset,
      // where dnd-kit has no transform of its own.
      style={{
        transform: cssTransform,
        transition: transition ?? (offsetY ? 'transform 200ms ease' : undefined),
      }}
      onClick={(e) => {
        // dnd-kit suppresses clicks that follow a drag; call it first, then navigate.
        listeners?.onClick?.(e);
        onTaskClick(task.id);
      }}
      className={cn(
        'p-3 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
        isDragging && 'opacity-50 ring-2 ring-primary/40',
      )}
    >
      <KanbanCardContent task={task} />
    </Card>
  );
}

export function KanbanBoard({ tasks, onTaskClick }: KanbanBoardProps) {
  const [createTask] = useCreateTaskMutation();
  const [updateTaskStatusMutation] = useUpdateTaskStatusMutation();
  const [updateTaskMutation] = useUpdateTaskMutation();

  // KeyboardSensor: Space grabs a card, arrows move it, Escape cancels.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor),
  );

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // Drop-indicator target column, resolved on every drag move: `over` is
  // either a column droppable or a card sortable (data.from → its column),
  // the same resolution handleDragEnd uses for the actual drop.
  const [overColumn, setOverColumn] = useState<KanbanColumn | null>(null);

  // The live landing-slot preview, resolved on every drag move by the pure
  // resolver; cleared on drop/cancel.
  const [dropPreview, setDropPreview] = useState<DropPreviewState | null>(null);

  // The cards' DOM nodes by id — sizes the dashed slot from the dragged
  // card's own LAYOUT height (offsetHeight — transforms do not affect it).
  // dnd-kit's `active.rect.current.initial` is the DragOverlay ghost's rect
  // when a ghost is mounted (scale-105 → 5% too big), so the slot is sized
  // from the DOM instead (slot = size of the dragged card).
  const cardElsById = useRef<Map<string, HTMLElement>>(new Map());
  const registerCard = (id: string, el: HTMLElement | null) => {
    if (el) cardElsById.current.set(id, el);
    else cardElsById.current.delete(id);
  };

  // Resolve the live landing slot — no preview when the over node does not
  // resolve to a column; the ghost rect height sizes the slot and the
  // per-card shift. Shared by dragOver (coarse — fires when `over` changes)
  // and dragMove (fine — fires on every pointer move, so the slot tracks the
  // pointer within one over-card).
  const updateDropPreview = (event: DragOverEvent | DragMoveEvent) => {
    const overId = String(event.over?.id ?? '');
    const to = COLUMNS.includes(overId as KanbanColumn)
      ? (overId as KanbanColumn)
      : (event.over?.data.current?.from as KanbanColumn | undefined);
    if (!to) {
      setDropPreview(null);
      return;
    }
    const preview = resolveDropPreview({
      column: to,
      activeColumn: event.active.data.current?.from as KanbanColumn,
      activeIndex: (event.active.data.current?.sortable?.index as number | undefined) ?? 0,
      overId: event.over ? String(event.over.id) : null,
      overIndex: event.over?.data.current?.sortable?.index as number | undefined,
      targetTasks: boardTasks
        .filter((task) => task.status === to)
        .sort((a, b) => a.position - b.position),
    });
    // The dragged card's own LAYOUT height (DOM offsetHeight — see
    // cardElsById above) sizes the slot; the DragOverlay ghost's rect is
    // scaled (scale-105) and would be 5% too big.
    const cardHeight =
      cardElsById.current.get(String(event.active.id))?.offsetHeight ??
      event.over?.rect?.height ??
      CARD_HEIGHT_FALLBACK;
    setDropPreview(preview ? { ...preview, cardHeight } : null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const overId = String(event.over?.id ?? '');
    const to = COLUMNS.includes(overId as KanbanColumn)
      ? (overId as KanbanColumn)
      : (event.over?.data.current?.from as KanbanColumn | undefined);
    setOverColumn(to ?? null);
    updateDropPreview(event);
  };

  // onDragOver only fires when `over` changes, so the preview is re-resolved
  // on every pointer move as well.
  const handleDragMove = (event: DragMoveEvent) => {
    updateDropPreview(event);
  };

  // Local board state so in-column reordering is visible immediately;
  // re-syncs whenever the RTK query refetches.
  const [boardTasks, setBoardTasks] = useState<Task[]>(tasks);
  useEffect(() => {
    setBoardTasks(tasks);
  }, [tasks]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(String(event.active.id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    // Hide the drag ghost, the drop indicator and the landing-slot preview
    // in all cases (including drops outside any column).
    setActiveTaskId(null);
    setOverColumn(null);
    setDropPreview(null);

    if (!over) return;

    const from = active.data.current?.from as KanbanColumn | undefined;
    // `over` is either a column (droppable) or a card (sortable) — resolve its column.
    const overId = String(over.id);
    const to = COLUMNS.includes(overId as KanbanColumn)
      ? (overId as KanbanColumn)
      : (over.data.current?.from as KanbanColumn | undefined);
    const activeIndex = active.data.current?.sortable?.index as number | undefined;
    const overIndex = over.data.current?.sortable?.index as number | undefined;

    if (to && to !== from) {
      const taskId = String(active.id);
      const newStatus = to;

      const toTasks = boardTasks
        .filter((task) => task.status === newStatus)
        .sort((a, b) => a.position - b.position);
      // The hovered card's index (dnd-kit's native landing — the same gap the
      // live preview showed), or the end of the column over the background.
      const insertIndex = resolveInsertIndex({ overIndex, targetCount: toTasks.length });

      // Instant UI update: moved card lands at insertIndex; target-column
      // cards at or after that index bump +1 (scattered positions stay ordered).
      setBoardTasks((prev) =>
        prev.map((task) => {
          if (task.id === taskId) return { ...task, status: newStatus, position: insertIndex };
          if (task.status === newStatus && task.position >= insertIndex) {
            return { ...task, position: task.position + 1 };
          }
          return task;
        }),
      );

      try {
        await updateTaskStatusMutation({ id: taskId, data: { status: newStatus, position: insertIndex } }).unwrap();
      } catch (err) {
        console.error('Failed to update task status:', err);
      }

      // Persist the renumbered positions: PUT every changed task through the
      // active RTK layer.
      for (let index = 0; index < toTasks.length; index++) {
        const task = toTasks[index];
        if (task.id === taskId) continue;
        const newPosition = index >= insertIndex ? index + 1 : index;
        if (task.position === newPosition) continue; // position unchanged
        try {
          await updateTaskMutation({ id: task.id, data: { position: newPosition } }).unwrap();
        } catch (err) {
          console.error('Failed to update task position:', err);
        }
      }
      return;
    }

    // In-column drop onto a different card → reorder within the column.
    if (from === undefined || activeIndex === undefined || overIndex === undefined) {
      return; // dropped onto the column background — no-op
    }

    const columnTasks = boardTasks
      .filter((task) => task.status === from)
      .sort((a, b) => a.position - b.position);
    // Landing at the hovered card's index — dnd-kit's native landing (the same
    // gap the live preview showed), so the card lands exactly where the dashed
    // slot was. Over the active card itself → the identity (the preview's
    // `noOp` flag), so skip the drop.
    if (overIndex === activeIndex) {
      return; // no-op: the card lands where it is — the same rule the preview uses
    }
    const newOrder = arrayMove(columnTasks, activeIndex, overIndex);
    setBoardTasks((prev) =>
      prev.map((task) => {
        const newIndex = newOrder.findIndex((t) => t.id === task.id);
        return newIndex >= 0 ? { ...task, position: newIndex } : task;
      }),
    );

    // Persist the renumbered positions: PUT every changed task through the
    // active RTK layer.
    for (let index = 0; index < newOrder.length; index++) {
      const task = newOrder[index];
      if (task.position === index) continue; // position unchanged
      try {
        await updateTaskMutation({ id: task.id, data: { position: index } }).unwrap();
      } catch (err) {
        console.error('Failed to update task position:', err);
      }
    }
  };

  const activeTask = activeTaskId ? tasks.find((task) => task.id === activeTaskId) ?? null : null;

  // Quick-add: new task lands at the end of its column (position = max + 1, so
  // scattered positions can't push it into the middle). createTask invalidates
  // the 'Task' tag → getTasks refetches → boardTasks re-syncs via the useEffect.
  const handleAddTask = async (status: string, title: string) => {
    const columnTasks = boardTasks.filter((task) => task.status === status);
    const nextPosition =
      columnTasks.length > 0 ? Math.max(...columnTasks.map((task) => task.position)) + 1 : 0;
    try {
      await createTask({
        title,
        status: status as 'open' | 'in_progress' | 'completed' | 'cancelled',
        priority: 'medium',
        position: nextPosition,
      }).unwrap();
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  return (
    <div className="py-6">
      <DndContext
        sensors={sensors}
        collisionDetection={layoutCollisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onDragCancel={() => {
          setActiveTaskId(null);
          setOverColumn(null);
          setDropPreview(null);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {COLUMNS.map((column) => {
            const columnTasks = boardTasks
              .filter((task) => task.status === column)
              .sort((a, b) => a.position - b.position);
            const columnPreview =
              dropPreview && dropPreview.column === column ? dropPreview : null;

            return (
              <KanbanColumn
                key={column}
                column={column}
                tasks={columnTasks}
                highlighted={overColumn === column}
                onTaskClick={onTaskClick}
                onAddTask={handleAddTask}
                dropPreview={columnPreview}
                registerCard={registerCard}
              />
            );
          })}
        </div>

        {/* Drag ghost following the pointer. */}
        <DragOverlay>
          {activeTask ? (
            <Card className="p-3 opacity-80 scale-105 shadow-lg" aria-hidden="true">
              <KanbanCardContent task={activeTask} />
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
