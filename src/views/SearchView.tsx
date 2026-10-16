// =====================================================
// SearchView Component
// =====================================================
// Full-page view for searching across all entities
// with advanced filtering and saved filter support.
// =====================================================

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setQuery as setReduxQuery,
  setFilterCriteria,
  loadSavedFilter,
  removeSavedFilter,
  saveFilter as saveFilterAction,
 globalSearch } from '@/stores/searchSlice';
import type { SavedFilter } from '@/stores/searchSlice';
import { SearchResults } from '@/components/search/SearchResults';
import FilterBar from '@/components/layout/FilterBar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

/**
 * SearchView component provides a full-page search experience
 * with advanced filtering, saved filters, and search results.
 */
export function SearchView() {
  const dispatch = useDispatch();
  const savedFilters = useSelector((state: { search: { savedFilters: unknown[] } }) => state.search.savedFilters);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'saved' | 'advanced'>('search');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
    setQuery(searchTerm);
    dispatch(setReduxQuery(searchTerm));
  };

  const handleFilterChange = (newFilters: Record<string, unknown>) => {
    dispatch(setFilterCriteria(newFilters));
  };

 const handleLoadSavedFilter = (filter: { id: string; name: string; criteria: Record<string, unknown>; type: string }) => {
    const typedFilter = filter as unknown as { id: string; name: string; criteria: Record<string, unknown>; type: 'task' | 'contact' | 'company' | 'activity' };
    dispatch(loadSavedFilter(typedFilter));
    setActiveTab('search');
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Search</h1>
        <p className="text-sm text-muted-foreground">Search across contacts, companies, tasks, and activities</p>
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <Input
            name="search"
            type="text"
            defaultValue={query}
            placeholder="Search contacts, tasks, companies..."
            aria-label="Search"
          />
          <Button type="submit" size="sm">
            Search
          </Button>
        </div>
      </form>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
     <button
           className={`px-3 py-1 rounded text-sm ${activeTab === 'search' ? 'bg-muted' : 'hover:bg-muted'}`}
           onClick={() => setActiveTab('search')}
         >
           Search Results
         </button>
         <button
           className={`px-3 py-1 rounded text-sm ${activeTab === 'saved' ? 'bg-muted' : 'hover:bg-muted'}`}
           onClick={() => setActiveTab('saved')}
         >
           Saved Filters ({savedFilters.length})
         </button>
         <button
           className={`px-3 py-1 rounded text-sm ${activeTab === 'advanced' ? 'bg-muted' : 'hover:bg-muted'}`}
           onClick={() => setActiveTab('advanced')}
         >
          Advanced Filters
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'search' && query && (
        <div>
          <SearchResults results={globalSearch(query)} query={query} />
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="space-y-2">
          {savedFilters.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No saved filters yet</div>
          )}
          {savedFilters.map((filterItem: unknown) => {
            const filter = filterItem as SavedFilter;
            return (
              <div key={filter.id} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                <div>
                  <span className="font-medium">{filter.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">{JSON.stringify(filter.criteria)}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLoadSavedFilter(filter)}
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => dispatch(removeSavedFilter(filter.id))}
                    className="text-sm text-destructive hover:text-destructive/80"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          <button
            onClick={() => {
              if (query) {
                const newFilter = {
                  name: `Filter ${savedFilters.length + 1}`,
                  criteria: { query },
                };
                dispatch(saveFilterAction({
                  id: Date.now().toString(),
                  name: newFilter.name,
                  type: 'task',
                  criteria: newFilter.criteria,
                }));
              }
            }}
            className="text-sm text-primary hover:text-primary/80"
          >
            Save Current Search
          </button>
        </div>
      )}

      {activeTab === 'advanced' && (
        <div className="mt-4">
          <FilterBar entityType="tasks" onFilterChange={handleFilterChange} />
          <FilterBar entityType="contacts" onFilterChange={handleFilterChange} />
          <FilterBar entityType="companies" onFilterChange={handleFilterChange} />
          <FilterBar entityType="activities" onFilterChange={handleFilterChange} />
        </div>
      )}
    </div>
  );
}

export default SearchView;
