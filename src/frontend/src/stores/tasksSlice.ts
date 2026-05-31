import { createSlice } from '@reduxjs/toolkit';
import type { Task } from '@/types/entities';

export interface TasksState {
  tasks: Task[];
  selected: Task | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => { state.tasks = action.payload; },
    setSelectedTask: (state, action) => { state.selected = action.payload; },
    setTasksLoading: (state, action) => { state.isLoading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  },
});

export const { setTasks, setSelectedTask, setTasksLoading } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
