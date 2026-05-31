import { createSlice } from '@reduxjs/toolkit';
import type { Company } from '@/types/entities';

export interface CompaniesState {
  companies: Company[];
  selected: Company | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  companies: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies: (state, action) => { state.companies = action.payload; },
    setSelectedCompany: (state, action) => { state.selected = action.payload; },
    setCompaniesLoading: (state, action) => { state.isLoading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  },
});

export const { setCompanies, setSelectedCompany, setCompaniesLoading } = companiesSlice.actions;
export const companiesReducer = companiesSlice.reducer;
