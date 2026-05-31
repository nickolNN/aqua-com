import { createSlice } from '@reduxjs/toolkit';

export interface DashboardState {
  stats: Record<string, unknown>;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: {},
  isLoading: false,
  error: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action) => { state.stats = action.payload; },
    setDashboardLoading: (state, action) => { state.isLoading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  },
});

export const { setStats, setDashboardLoading } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
