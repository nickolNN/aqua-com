// =====================================================
// SavedFilters Component
// =====================================================
// Displays saved filters and allows loading/removing them.
// Uses Redux store for saved filter state management.
// =====================================================

import { useSelector, useDispatch } from 'react-redux';
import { loadSavedFilter, removeSavedFilter } from '../../stores/searchSlice';
import type { SavedFilter } from '../../stores/searchSlice';

interface SavedFiltersProps {
  /** Entity type this filter applies to */
  entityType: 'task' | 'contact' | 'company' | 'activity';
}

/**
 * Renders a single saved filter button
 */
function SavedFilterButton({ filter }: { filter: SavedFilter }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-blue-50 rounded border border-blue-200">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-blue-700">{filter.name}</span>
        <span className="text-xs text-blue-500">({filter.type})</span>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => dispatch(loadSavedFilter(filter))}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Load
        </button>
        <button
          onClick={() => dispatch(removeSavedFilter(filter.id))}
          className="text-xs text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

/**
 * SavedFilters displays saved filters for the current entity type
 * and allows loading/removing them
 */
export function SavedFilters({ entityType }: SavedFiltersProps) {
  const loadedFilters = useSelector((state: { search: { savedFilters: SavedFilter[] } }) =>
    state.search.savedFilters
  );

  // Filter for the current entity type
  const entityFilters = loadedFilters.filter(
    (f) => f.type === entityType
  );

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Saved Filters</h4>
      {entityFilters.length === 0 ? (
        <div className="text-sm text-gray-500 italic">No saved filters for this entity type</div>
      ) : (
        <div className="space-y-1">
          {entityFilters.map((filter) => (
            <SavedFilterButton key={filter.id} filter={filter} />
          ))}
        </div>
      )}
    </div>
  );
}
