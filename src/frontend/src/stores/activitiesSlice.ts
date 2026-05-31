// =====================================================
// Activity Redux Slice
// =====================================================
import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { ActivitySchema } from '@/mock-data/schemas';
import { generateActivities } from '@/mock-data/generators';

export const ACTIVITY_TYPES = ['call', 'meeting', 'email', 'note', 'task', 'deal', 'other'] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

// Async thunk for loading activities from API
export const fetchActivities = createAsyncThunk(
  'activities/fetchActivities',
  async () => {
    const activities = generateActivities(10);
    return activities;
  },
);

// Async thunk for creating an activity
export const createActivityThunk = createAsyncThunk(
  'activities/createActivity',
  async (activity: Omit<ActivitySchema, 'id' | 'created_by' | 'created_at'> & { contact_id?: string }) => {
    const newActivity: ActivitySchema = {
      ...activity,
      id: Math.random().toString(36).substring(7),
      created_by: 'current-user',
      created_at: new Date().toISOString(),
    };
    return newActivity;
  },
);

// Async thunk for updating an activity
export const updateActivityThunk = createAsyncThunk(
  'activities/updateActivity',
  async ({ id, data }: { id: string; data: Partial<ActivitySchema> }) => {
    const updatedActivity = { id, ...data } as ActivitySchema;
    return updatedActivity;
  },
);

// Async thunk for deleting an activity
export const deleteActivityThunk = createAsyncThunk(
  'activities/deleteActivity',
  async (id: string) => {
    return id;
  },
);

// Async thunk for loading mock activities
export const loadMockActivitiesThunk = createAsyncThunk(
  'activities/loadMockActivities',
  async () => generateActivities(10),
);

export interface ActivitiesState {
  activities: ActivitySchema[];
  selectedActivityId: string | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    type?: ActivityType;
    status?: string;
    dateRange?: string[];
    contactId?: string;
    companyId?: string;
  };
}

const initialState: ActivitiesState = {
  activities: [],
  selectedActivityId: null,
  isLoading: false,
  error: null,
  filters: {},
};

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<ActivitySchema[]>) => {
      state.activities = action.payload;
    },
    selectActivity: (state, action: PayloadAction<string>) => {
      state.selectedActivityId = action.payload;
    },
    addActivity: (state, action: PayloadAction<ActivitySchema>) => {
      state.activities.push(action.payload);
    },
    updateActivity: (state, action: PayloadAction<Partial<ActivitySchema>>) => {
      const index = state.activities.findIndex(
        (a) => a.id === action.payload.id
      );
      if (index !== -1) {
        Object.assign(state.activities[index], action.payload);
      }
    },
    deleteActivity: (state, action: PayloadAction<string>) => {
      state.activities = state.activities.filter(
        (a) => a.id !== action.payload
      );
    },
    setFilters: (state, action: PayloadAction<Partial<ActivitiesState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setActivitiesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    loadMockActivities: (state) => {
      state.activities = generateActivities(10);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch activities
      .addCase(fetchActivities.fulfilled, (state, action) => {
      state.activities = action.payload;
      })
      // Create activity
      .addCase(createActivityThunk.fulfilled, (state, action) => {
      state.activities.push(action.payload);
      })
      // Update activity
      .addCase(updateActivityThunk.fulfilled, (state, action) => {
      const index = state.activities.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        Object.assign(state.activities[index], action.payload);
      }
      })
      // Delete activity
      .addCase(deleteActivityThunk.fulfilled, (state, action) => {
      state.activities = state.activities.filter((a) => a.id !== action.payload);
      })
      // Load mock activities
      .addCase(loadMockActivitiesThunk.fulfilled, (state, action) => {
      state.activities = action.payload;
      });
  },
});

export const {
  setActivities,
  selectActivity,
  addActivity,
  updateActivity,
  deleteActivity,
  setFilters,
  clearFilters,
  setActivitiesLoading,
  setError,
  loadMockActivities,
} = activitiesSlice.actions;

export const activitiesReducer = activitiesSlice.reducer;
export default activitiesSlice.reducer;
