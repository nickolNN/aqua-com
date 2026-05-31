// =====================================================
// GlobalSearchBar Component
// =====================================================
// Provides a global search input that searches across all
// entity types (contacts, tasks, companies, activities)
// with real-time suggestions, results display, and saved filters.
// Connected to Redux state for saved filters.
// =====================================================

import { useState, useRef, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import {
  setQuery as setReduxQuery,
  loadSavedFilter,
  removeSavedFilter,
  saveFilter as saveFilterAction,
 globalSearch } from '@/stores/searchSlice';
import type { SavedFilter } from '@/stores/searchSlice';
import type { RootState } from '@/store/store';

type SearchResultItem = {
  type: string;
  id: string;
  title: string;
  subtitle: string;
  link?: string;
};

/**
 * GlobalSearchBar component that provides global search functionality
 * with saved filter support and real-time search across all entities.
 */
export default function GlobalSearchBar() {
  const dispatch = useDispatch();
  const savedFilters = useSelector(
    (state: RootState) => state.search.savedFilters
  );
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [showSavedFilters, setShowSavedFilters] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowSavedFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const resultsData = globalSearch(searchTerm);
    const resultsList: SearchResultItem[] = [];

    (resultsData.contacts as Record<string, unknown>[]).forEach((c: Record<string, unknown>) => {
      resultsList.push({
        type: 'contact',
        id: String(c.id),
        title: `${String(c.first_name || '')} ${String(c.last_name || '')}`,
        subtitle: String(c.email || ''),
        link: `/contacts/${c.id}`,
      });
    });

    (resultsData.tasks as Record<string, unknown>[]).forEach((t: Record<string, unknown>) => {
      resultsList.push({
        type: 'task',
        id: String(t.id),
        title: String(t.title || ''),
        subtitle: `${String(t.priority || '')} | ${String(t.status || '')}`,
        link: `/tasks`,
      });
    });

    (resultsData.companies as Record<string, unknown>[]).forEach((c: Record<string, unknown>) => {
      resultsList.push({
        type: 'company',
        id: String(c.id),
        title: String(c.name || ''),
        subtitle: String(c.industry || ''),
        link: `/companies/${c.id}`,
      });
    });

    (resultsData.activities as Record<string, unknown>[]).forEach((a: Record<string, unknown>) => {
      resultsList.push({
        type: 'activity',
        id: String(a.id),
        title: String(a.title || ''),
        subtitle: `${String(a.type || '')} | ${new Date(String(a.date)).toLocaleDateString()}`,
        link: '#',
      });
    });

    setResults(resultsList);
    setIsOpen(true);
    dispatch(setReduxQuery(searchTerm));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    performSearch(newQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleLoadSavedFilter = (filter: SavedFilter) => {
    dispatch(loadSavedFilter(filter));
    setShowSavedFilters(false);
    performSearch(String(filter.criteria.query || ''));
  };

  const handleSaveFilter = () => {
    const filterName = prompt('Enter filter name to save:');
    if (filterName && query) {
      const newFilter: SavedFilter = {
        id: Date.now().toString(),
        name: filterName,
        type: 'task',
        criteria: { query },
      };
      dispatch(saveFilterAction(newFilter));
    }
  };

  const totalResults = results.length;

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (query) performSearch(query);
        }}
        placeholder="Search contacts, tasks, companies..."
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Global search"
      />

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-1 left-0 w-full border border-input bg-white rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-2 text-xs text-gray-500 font-medium">
            {totalResults} result{totalResults !== 1 ? 's' : ''} found
          </div>
          {results.map((result, index) => (
            <a
              key={`${result.type}-${result.id}-${index}`}
              href={result.link || '#'}
              className="block px-3 py-1.5 text-sm hover:bg-gray-50 transition"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase">{result.type}</span>
                <span className="font-medium">{result.title}</span>
              </div>
              <div className="text-xs text-gray-500">{result.subtitle}</div>
            </a>
          ))}
        </div>
      )}

      {savedFilters.length > 0 && (
        <button
          className="mt-1 text-xs text-blue-600 hover:text-blue-800"
          onClick={() => setShowSavedFilters(!showSavedFilters)}
        >
          Saved Filters ({savedFilters.length})
        </button>
      )}

      {showSavedFilters && (
        <div className="absolute top-full mt-1 left-0 w-full border border-input bg-popover rounded-md p-2 shadow-lg">
          {savedFilters.map((filter) => (
            <div key={filter.id} className="flex items-center gap-2 px-2 py-1 text-sm hover:bg-gray-100">
              <button
                onClick={() => handleLoadSavedFilter(filter)}
                className="flex-1 text-left"
              >
                {filter.name}
              </button>
              <button
                onClick={() => dispatch(removeSavedFilter(filter.id))}
                className="text-xs text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={handleSaveFilter}
            className="text-xs text-blue-600 hover:text-blue-800 py-1"
          >
            Save Current Filter
          </button>
        </div>
      )}
    </div>
  );
}
