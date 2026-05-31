import { createSlice } from '@reduxjs/toolkit';

export type KanbanColumn = 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface KanbanState {
  columns: KanbanColumn[];
  boardConfig: {
    showCompleted: boolean;
    sortBy: 'priority' | 'due_date' | 'title';
    order: 'asc' | 'desc';
  };
}

const initialState: KanbanState = {
  columns: ['open', 'in_progress', 'completed', 'cancelled'],
  boardConfig: {
    showCompleted: true,
    sortBy: 'priority',
    order: 'asc',
  },
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    updateBoardConfig: (_, action) => {
      return { ...initialState, boardConfig: action.payload };
    },
    reorderColumn: (_, action) => {
      return { ...initialState, columns: action.payload };
    },
  },
});

export const { updateBoardConfig, reorderColumn } = kanbanSlice.actions;
export const kanbanReducer = kanbanSlice.reducer;