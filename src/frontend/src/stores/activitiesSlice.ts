import { createSlice } from '@reduxjs/toolkit';
import type { Activity } from '@/types/entities';

export interface ActivitiesState {
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ActivitiesState = {
  activities: [],
  isLoading: false,
  error: null,
};

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setActivities: (state, action) => { state.activities = action.payload; },
    setActivitiesLoading: (state, action) => { state.isLoading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  },
});

export const { setActivities, setActivitiesLoading } = activitiesSlice.actions;
export const activitiesReducer = activitiesSlice.reducer;
