import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { KanbanQuickAdd } from './KanbanQuickAdd';
import { useCreateTaskMutation, useUpdateTaskMutation, useUpdateTaskStatusMutation } from '@/api/tasksApi';
import { updateTaskStatus } from '@/stores/tasksSlice';
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

interface KanbanColumnProps {
  column: KanbanColumn;
  tasks: Task[];
  highlighted: boolean;
  onTaskClick: (taskId: string) => void;
  onAddTask: (status: string, title: string) => Promise<void>;
}

function KanbanColumn({ column, tasks, highlighted, onTaskClick, onAddTask }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column });

  // Stage 27: a11y — the droppable container announces its column name.
  // Drop indicator: `isOver` is true only when the over-droppable is the column
  // itself; `highlighted` covers drags over cards in a non-empty column
  // (closestCenter makes the card the over item, not the column).
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
        {tasks.map((task) => (
          <KanbanTaskCard key={task.id} task={task} column={column} onTaskClick={onTaskClick} />
        ))}
      </SortableContext>

      {/* Stage 26: empty column → glass stub Card; the quick-add button above stays. */}
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
}

function KanbanTaskCard({ task, column, onTaskClick }: KanbanTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { from: column },
  });

  // Stage 27: a11y — cards are focusable (useSortable sets tabIndex) and
  // announce title + priority; aria-grabbed mirrors the drag state.
  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      aria-label={`${task.title}, priority ${task.priority}`}
      aria-grabbed={isDragging}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
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
  const dispatch = useDispatch();
  const [createTask] = useCreateTaskMutation();
  const [updateTaskStatusMutation] = useUpdateTaskStatusMutation();
  const [updateTaskMutation] = useUpdateTaskMutation();

  // Stage 27: a11y — KeyboardSensor lets cards be grabbed (Space) and moved
  // (arrows, Escape to cancel) without a pointer.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor),
  );

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // Drop-indicator target column, resolved on every drag move: `over` is
  // either a column droppable or a card sortable (data.from → its column),
  // the same resolution handleDragEnd uses for the actual drop.
  const [overColumn, setOverColumn] = useState<KanbanColumn | null>(null);

  const handleDragOver = (event: DragOverEvent) => {
    const overId = String(event.over?.id ?? '');
    const to = COLUMNS.includes(overId as KanbanColumn)
      ? (overId as KanbanColumn)
      : (event.over?.data.current?.from as KanbanColumn | undefined);
    setOverColumn(to ?? null);
  };

  // Local board state so in-column reordering (stage 22) is visible immediately;
  // re-syncs whenever the RTK query refetches (stage 19 pattern).
  const [boardTasks, setBoardTasks] = useState<Task[]>(tasks);
  useEffect(() => {
    setBoardTasks(tasks);
  }, [tasks]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(String(event.active.id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    // Hide the drag ghost and the drop indicator in all cases
    // (including drops outside any column).
    setActiveTaskId(null);
    setOverColumn(null);

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
      // Cross-column drop → status change (stage 19 pattern).
      const taskId = String(active.id);
      const newStatus = to;

      // Instant UI update (existing handleDrop pattern).
      dispatch(updateTaskStatus({ taskId, newStatus }));

      try {
        await updateTaskStatusMutation({ id: taskId, data: { status: newStatus } }).unwrap();
      } catch (err) {
        console.error('Failed to update task status:', err);
      }
      return;
    }

    // In-column drop onto a different card → reorder within the column (stage 22).
    if (from === undefined || activeIndex === undefined || overIndex === undefined || overIndex === activeIndex) {
      return; // dropped onto its own card or the column background — no-op
    }

    const columnTasks = boardTasks
      .filter((task) => task.status === from)
      .sort((a, b) => a.position - b.position);
    const newOrder = arrayMove(columnTasks, activeIndex, overIndex);
    setBoardTasks((prev) =>
      prev.map((task) => {
        const newIndex = newOrder.findIndex((t) => t.id === task.id);
        return newIndex >= 0 ? { ...task, position: newIndex } : task;
      }),
    );

    // Stage 23: persist the renumbered positions — PUT every task whose position
    // changed, through the active RTK layer (stage 16 → localStorage).
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

  // Stage 25: quick-add from the column header — new task lands at the end of
  // its column (position = max existing position + 1, so scattered positions
  // left by the seed store or cross-column drops can't push it into the
  // middle). createTask invalidates the 'Task' tag → getTasks refetches →
  // boardTasks re-syncs via the useEffect.
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Kanban Board</h2>
        <Button size="sm" variant="outline">
          Filter
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={() => {
          setActiveTaskId(null);
          setOverColumn(null);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {COLUMNS.map((column) => {
            const columnTasks = boardTasks
              .filter((task) => task.status === column)
              .sort((a, b) => a.position - b.position);

            return (
              <KanbanColumn
                key={column}
                column={column}
                tasks={columnTasks}
                highlighted={overColumn === column}
                onTaskClick={onTaskClick}
                onAddTask={handleAddTask}
              />
            );
          })}
        </div>

        {/* Drag feedback: ghost card following the pointer during the drag. */}
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
