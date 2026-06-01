import { createSlice } from '@reduxjs/toolkit';
import type { Task } from '@/types/entities';

export interface TasksState {
  tasks: Task[];
  selectedTask: Task | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status: string;
    priority: string;
    search: string;
  };
}

const initialState: TasksState = {
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
  filters: {
    status: '',
    priority: '',
    search: '',
  },
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    setTasksLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      state.tasks = state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus as Task['status'] } : t
      );
    },
  },
});

export const {
  setTasks,
  setSelectedTask,
  setTasksLoading,
  setError,
  setFilters,
  updateTaskStatus,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
