import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ActivitySchema, TaskSchema } from '@/mock-data/schemas';
import {
  getMockContacts,
  getMockCompanies,
  getMockTasks,
  getMockActivities,
} from '@/mock-data';

// =====================================================
// Types
// =====================================================

export interface SavedFilter {
  id: string;
  name: string;
  type: 'task' | 'contact' | 'company' | 'activity';
  criteria: Record<string, unknown>;
}

export interface FilterCriteria {
  query: string;
  status?: string;
  priority?: string;
  dateRange?: { start: string; end: string };
  type?: string;
  assignee?: string;
  customFields?: Record<string, unknown>;
}

export interface SearchState {
  query: string;
  results: Record<string, unknown[]>;
  isLoading: boolean;
  error: string | null;
  filters: FilterCriteria;
  savedFilters: SavedFilter[];
  activeSavedFilterId: string | null;
}

// =====================================================
// Constants
// =====================================================

const INITIAL_SAVED_FILTERS_KEY = 'savedFilters';

const initialState: SearchState = {
  query: '',
  results: { contacts: [], tasks: [], activities: [], companies: [] },
  isLoading: false,
  error: null,
  filters: { query: '', status: '', priority: '', dateRange: undefined, type: '' },
  savedFilters: [],
  activeSavedFilterId: null,
};

/** Load saved filters from localStorage */
function loadSavedFiltersFromStorage(): SavedFilter[] {
  try {
    const raw = localStorage.getItem(INITIAL_SAVED_FILTERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// =====================================================
// Slice
// =====================================================

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<Record<string, unknown[]>>) => {
      state.results = action.payload;
    },
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilterCriteria: (state, action: PayloadAction<Partial<FilterCriteria>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    loadSavedFilters: (state) => {
      state.savedFilters = loadSavedFiltersFromStorage();
    },
    saveFilter: (state, action: PayloadAction<SavedFilter>) => {
      const newFilters = [...state.savedFilters, action.payload];
      state.savedFilters = newFilters;
      try {
        localStorage.setItem(INITIAL_SAVED_FILTERS_KEY, JSON.stringify(newFilters));
      } catch { /* ignore storage errors */ }
    },
    removeSavedFilter: (state, action: PayloadAction<string>) => {
      const newFilters = state.savedFilters.filter((f) => f.id !== action.payload);
      state.savedFilters = newFilters;
      try {
        localStorage.setItem(INITIAL_SAVED_FILTERS_KEY, JSON.stringify(newFilters));
      } catch { /* ignore storage errors */ }
    },
    setActiveSavedFilter: (state, action: PayloadAction<string | null>) => {
      state.activeSavedFilterId = action.payload;
    },
    loadSavedFilter: (state, action: PayloadAction<SavedFilter>) => {
      state.activeSavedFilterId = action.payload.id;
      state.filters = {
        ...state.filters,
        ...action.payload.criteria,
      };
    },
    searchEntities: (state, action: PayloadAction<{ query: string; entityTypes: string[] }>) => {
      const { query, entityTypes } = action.payload;
      const filteredResults: Record<string, unknown[]> = {};
      entityTypes.forEach((type) => {
        filteredResults[type] = [];
      });
      state.results = filteredResults;
      state.query = query;
    },
    performFiltering: (state, action: PayloadAction<{
      data: unknown[];
      filters: FilterCriteria;
      entityType: string;
    }>) => {
      const { data, filters, entityType } = action.payload;
      const filterKeys = Object.entries(filters).filter(([k, v]) => k !== 'query' && v != null && v !== '');
      if (filterKeys.length === 0) {
        (state.results as Record<string, unknown>)[entityType] = data as unknown[];
        return;
      }
      const filtered: unknown[] = data.filter((item: unknown) => {
        const record: Record<string, unknown> = item as Record<string, unknown>;
        return filterKeys.every(([key, filterValue]) => {
          if (key === 'status') return record['status'] === filterValue;
          if (key === 'priority') return record['priority'] === filterValue;
          if (key === 'type') return record['type'] === filterValue;
          if (key === 'assignee' || key === 'assigned_to') {
            return record[key] === filterValue;
          }
          return String(record).toLowerCase().includes(String(filterValue).toLowerCase());
        });
      });
      state.results = { ...state.results, [entityType]: filtered };
    },
  },
});

// =====================================================
// Actions
// =====================================================

export const {
  setQuery,
  setResults,
  setSearchLoading,
  setError,
  setFilterCriteria,
  saveFilter,
  removeSavedFilter,
  setActiveSavedFilter,
  loadSavedFilter,
   loadSavedFilters,
   searchEntities,
   performFiltering,
 } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;

// =====================================================
// Filter utilities for React components
// =====================================================

/**
 * Filter tasks by criteria
 */
export function filterTasks(tasks: TaskSchema[], filters: Partial<FilterCriteria>): TaskSchema[] {
  let filtered = [...tasks];
  if (filters.priority && filters.priority !== 'all') {
    filtered = filtered.filter((t) => t.priority === filters.priority);
  }
  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter((t) => t.status === filters.status);
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    filtered = filtered.filter((t) =>
      t.title.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q) ||
      (t.status.includes(q)) ||
      (t.priority.includes(q))
    );
  }
  return filtered;
}

/**
 * Filter contacts by criteria
 */
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

export function filterContacts(contacts: unknown[], filters: Partial<FilterCriteria>): unknown[] {
  let filtered = [...contacts];
  if (filters.query) {
    const q = filters.query.toLowerCase();
    filtered = filtered.filter((c) =>
      isRecord(c) && JSON.stringify(c).toLowerCase().includes(q)
    );
  }
  return filtered;
}

/**
 * Filter activities by criteria
 */
export function filterActivities(activities: ActivitySchema[], filters: Partial<FilterCriteria>): ActivitySchema[] {
  let filtered = [...activities];
  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter((a) => a.type === filters.type);
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    filtered = filtered.filter((a) =>
      a.title.toLowerCase().includes(q) || (a.description?.toLowerCase().includes(q) || false)
    );
  }
  return filtered;
}

/**
 * Global search across all entities using mock data
 */
export function globalSearch(query: string): Record<string, unknown[]> {
  if (!query || !query.trim()) {
    return { contacts: [], tasks: [], activities: [], companies: [] };
  }
  const q = query.toLowerCase();
   const contacts = getMockContacts();
  const tasks = getMockTasks();
  const companies = getMockCompanies();
  const activities = getMockActivities();

  return {
    contacts: contacts.filter((c: Record<string, unknown>) =>
      JSON.stringify(c).toLowerCase().includes(q)
    ),
    tasks: tasks.filter((t: Record<string, unknown>) =>
      (t['title'] as string).toLowerCase().includes(q) ||
      ((t['description'] as string)?.toLowerCase().includes(q) || false)
    ),
    companies: companies.filter((c: Record<string, unknown>) =>
      (c['name'] as string).toLowerCase().includes(q)
    ),
    activities: activities.filter((a: Record<string, unknown>) =>
      (a['title'] as string).toLowerCase().includes(q) ||
      ((a['description'] as string)?.toLowerCase().includes(q) || false)
    ),
  };
}

export { initialState };
