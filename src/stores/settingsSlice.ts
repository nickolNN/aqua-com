import { createSlice } from '@reduxjs/toolkit';

export interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  preferences: Record<string, unknown>;
  isLoading: boolean;
}

const initialState: SettingsState = {
  theme: (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light',
  language: 'en',
  preferences: {},
  isLoading: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    setLanguage: (state, action) => { state.language = action.payload; },
    setPreferences: (state, action) => { state.preferences = action.payload; },
    setSettingsLoading: (state, action) => { state.isLoading = action.payload; },
  },
});

export const { setTheme, setLanguage, setPreferences, setSettingsLoading } = settingsSlice.actions;

// Selectors
export const selectSettingsTheme = (state: { settings: SettingsState }) => state.settings.theme;

export const settingsReducer = settingsSlice.reducer;
