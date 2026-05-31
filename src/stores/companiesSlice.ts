import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
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
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
    },
    updateCompany: (state, action: PayloadAction<Company>) => {
      const index = state.companies.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    },
    deleteCompany: (state, action: PayloadAction<string>) => {
      const index = state.companies.findIndex((c) => c.id === action.payload);
      if (index !== -1) {
        state.companies.splice(index, 1);
      }
    },
    setSelectedCompany: (state, action: PayloadAction<Company | null>) => {
      state.selected = action.payload;
    },
    setCompaniesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
  setSelectedCompany,
  setCompaniesLoading,
  setError,
} = companiesSlice.actions;

export const companiesReducer = companiesSlice.reducer;
