import { useSelector, useDispatch } from 'react-redux';
import { loadSavedFilter, removeSavedFilter } from '../../stores/searchSlice';
import type { SavedFilter } from '../../stores/searchSlice';

interface SavedFiltersProps {
  entityType: 'task' | 'contact' | 'company' | 'activity';
}

function SavedFilterButton({ filter }: { filter: SavedFilter }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-muted rounded-lg border">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{filter.name}</span>
        <span className="text-xs text-muted-foreground">({filter.type})</span>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => dispatch(loadSavedFilter(filter))}
          className="text-xs text-primary hover:text-primary/80"
        >
          Load
        </button>
        <button
          onClick={() => dispatch(removeSavedFilter(filter.id))}
          className="text-xs text-destructive hover:text-destructive/80"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export function SavedFilters({ entityType }: SavedFiltersProps) {
  const loadedFilters = useSelector((state: { search: { savedFilters: SavedFilter[] } }) =>
    state.search.savedFilters
  );

  const entityFilters = loadedFilters.filter(
    (f) => f.type === entityType
  );

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Saved Filters</h4>
      {entityFilters.length === 0 ? (
        <div className="text-sm text-muted-foreground italic">No saved filters for this entity type</div>
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
