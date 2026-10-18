import { createSlice } from '@reduxjs/toolkit';

export interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  preferences: Record<string, unknown>;
  isLoading: boolean;
}

// Helper to check system preference
const getSystemThemePreference = (): 'light' | 'dark' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getThemeFromStorage = (): 'light' | 'dark' => {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (e) {
    console.warn('localStorage access denied', e);
  }
  return getSystemThemePreference();
};

const initialState: SettingsState = {
  theme: typeof window !== 'undefined' ? getThemeFromStorage() : 'light',
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
      try { localStorage.setItem('theme', action.payload as 'light' | 'dark'); } catch { /* ignore */ }
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

// Apply theme to document element
export const applyTheme = (theme?: string) => {
  const themeToApply = theme ?? (localStorage.getItem('theme') as 'light' | 'dark') ?? getSystemThemePreference();
  document.documentElement.classList.toggle('dark', themeToApply === 'dark');
};
