import type { Task } from '@/types/entities';

/**
 * Pure insert-index resolver for cross-column kanban drops.
 *
 * dnd-kit's native layout animation (rectSortingStrategy) inserts the active
 * card at the HOVERED card's index — `arrayMove(items, activeIndex, overIndex)`
 * — and the visible gap always sits at the hovered card's original position.
 * The drop must land where that gap is, so the insert index is simply the
 * hovered card's index; over the column background / an empty column / no
 * hovered index (keyboard drag) the card lands at the end of the column.
 *
 * Pure on purpose: no DOM, no React state — trivially testable and wired
 * into handleDragEnd.
 */
export interface ResolveInsertIndexArgs {
  /** over.data.current.sortable.index — the hovered card's index in its column. */
  overIndex?: number;
  /** Number of tasks in the target column (sorted by position). */
  targetCount: number;
}

export function resolveInsertIndex(args: ResolveInsertIndexArgs): number {
  const { overIndex, targetCount } = args;
  return overIndex ?? targetCount;
}

/**
 * Pure drop-PREVIEW resolver for kanban drags — where the dragged card will
 * land, resolved DURING the drag (no drop, no persistence).
 * Feeds the live landing-slot indicator in KanbanBoard; the actual drop in
 * handleDragEnd uses the same index, so the card lands exactly where the
 * dashed slot showed.
 *
 * The slot is expressed in the FULL list (the target column's tasks, active
 * card included) and is exactly dnd-kit's landing position: the hovered
 * card's index, or the end of the column when the pointer is over the column
 * background / the column is empty. dnd-kit's native shift animation creates
 * the gap there (cards below shift down when landing above; cards between the
 * active card and the landing pack up when moving down), so the preview needs
 * no per-card offset of its own.
 *
 * `noOp` is true when the drop is the identity: the hovered card is the
 * active card itself, or the pointer is over the in-column background (no
 * hovered card) — `handleDragEnd` treats both as no-ops, so the board
 * renders no slot and the card stays where it is.
 *
 * Pure on purpose: no DOM, no React state — trivially testable. The caller
 * resolves the target column exactly like handleDragOver does (overId if it
 * is a column droppable, else over.data.current.from) and passes it in.
 */
export interface DropPreviewArgs {
  /**
   * Target column resolved by the caller exactly like handleDragOver
   * (overId when it is a column droppable, else over.data.current.from);
   * null when the over node does not resolve to a column.
   */
  column: string | null;
  /** active.data.current.from — the dragged card's own column. */
  activeColumn: string;
  /** active.data.current.sortable.index — the dragged card's index in its column. */
  activeIndex: number;
  /** over?.id as a string; null when there is no over node. */
  overId: string | null;
  /** over.data.current.sortable.index — the hovered card's index in its column. */
  overIndex?: number;
  /** Target column's tasks sorted by position; includes the active card when
   *  it is inside the target column. */
  targetTasks: Task[];
}

export interface DropPreview {
  /** Target column the preview applies to. */
  column: string;
  /** 0-based landing position in the FULL list (active card included) —
   *  where the dashed slot is shown and where the drop lands. */
  insertIndex: number;
  /** True when the active card is inside the target column. */
  activeIsInTarget: boolean;
  /** True when the drop is the identity: the hovered card is the active card
   *  itself, or the over node is the in-column background (no hovered card)
   *  — no slot, nothing moves. */
  noOp: boolean;
}

export function resolveDropPreview(args: DropPreviewArgs): DropPreview | null {
  const { column, activeColumn, activeIndex, overId, overIndex, targetTasks } = args;

  // Rule 1: no over node / no resolvable column → no preview; the caller keeps
  // the existing column-ring feedback as today.
  if (overId === null || column === null) return null;

  const activeIsInTarget = activeColumn === column;

  // Rule 2/3: the landing is the hovered card's index (dnd-kit's native
  // arrayMove target), or the end of the column when the pointer is over the
  // column background / the column is empty / there is no hovered index
  // (keyboard drag). Cross-column and in-column share the same rule; the
  // no-op check below is what distinguishes them.
  const insertIndex = overIndex ?? targetTasks.length;

  return {
    column,
    insertIndex,
    activeIsInTarget,
    // The drop is the identity in two cases: hovering the active card itself,
    // or the in-column background (no hovered card) — handleDragEnd no-ops
    // both, so the card stays where it is and the board shows no slot.
    noOp: activeIsInTarget && (overIndex === undefined || insertIndex === activeIndex),
  };
}
