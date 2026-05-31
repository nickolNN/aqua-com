import { createSlice } from '@reduxjs/toolkit';

export interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  preferences: Record<string, unknown>;
  isLoading: boolean;
}

const initialState: SettingsState = {
  theme: 'light',
  language: 'en',
  preferences: {},
  isLoading: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => { state.theme = action.payload; },
    setLanguage: (state, action) => { state.language = action.payload; },
    setPreferences: (state, action) => { state.preferences = action.payload; },
    setSettingsLoading: (state, action) => { state.isLoading = action.payload; },
  },
});

export const { setTheme, setLanguage, setPreferences, setSettingsLoading } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
