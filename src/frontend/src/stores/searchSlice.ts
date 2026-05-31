import { createSlice } from '@reduxjs/toolkit';

export interface SearchState {
  query: string;
  results: Record<string, unknown>;
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  results: {},
  isLoading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => { state.query = action.payload; },
    setResults: (state, action) => { state.results = action.payload; },
    setSearchLoading: (state, action) => { state.isLoading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  },
});

export const { setQuery, setResults, setSearchLoading } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
