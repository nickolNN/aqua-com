import type { ClientRect } from '@dnd-kit/core';

/**
 * Pure insert-index resolver for cross-column kanban drops (plan D2/D3).
 *
 * Given the drop target (a card, or the column background) and the vertical
 * centers of the dragged ghost card and the hovered card, computes the
 * zero-based index in the target column where the dropped card should land:
 *
 * - over a card: the hovered card's index if the ghost center is at or above
 *   the card center (the card lands above it), otherwise index + 1 (below it);
 * - over the column background / an empty column / no rect data (e.g.
 *   keyboard drag, plan D8): the end of the column (index = targetCount).
 *
 * Pure on purpose: no DOM, no React state — trivially testable and wired
 * into handleDragEnd in Stage 4.
 */
export interface ResolveInsertIndexArgs {
  /** True when the over-node is the column droppable (background), not a card. */
  overIsColumn: boolean;
  /** over.data.current.sortable.index — the hovered card's index in its column. */
  overIndex?: number;
  /** over.rect — the hovered card's bounding box (null for column drops). */
  overRect: ClientRect | null;
  /** active.rect.current.translated — the dragged ghost's bounding box. */
  ghostRect: ClientRect | null;
  /** Number of tasks in the target column (sorted by position). */
  targetCount: number;
}

export function resolveInsertIndex(args: ResolveInsertIndexArgs): number {
  const { overIsColumn, overIndex, overRect, ghostRect, targetCount } = args;

  // Drop onto the column background (or an empty column) → end of the column.
  if (overIsColumn) return targetCount;

  // No rect data or no hovered-card index (e.g. keyboard drag) → end fallback.
  if (overIndex === undefined || overRect === null || ghostRect === null) {
    return targetCount;
  }

  // "Above/below" = comparison of vertical centers (plan D3): both rects live
  // in the same ClientRect coordinate system, so scrolling doesn't matter.
  const ghostCenter = ghostRect.top + ghostRect.height / 2;
  const overCenter = overRect.top + overRect.height / 2;
  return ghostCenter <= overCenter ? overIndex : overIndex + 1;
}
