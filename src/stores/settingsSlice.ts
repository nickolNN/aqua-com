import { createSlice, type UnknownAction } from '@reduxjs/toolkit';

export interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  preferences: Record<string, unknown>;
  isLoading: boolean;
}

const getSystemThemePreference = (): 'light' | 'dark' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getThemeFromStorage = (): 'light' | 'dark' => {
  let stored: string | null;
  try {
    stored = localStorage.getItem('theme');
  } catch {
    return getSystemThemePreference();
  }
  if (stored === 'light' || stored === 'dark') return stored;
  return getSystemThemePreference();
};

// The initial state is computed when the store is created, not when this
// module is evaluated: a fresh store must reflect the persisted theme even
// if the module evaluation itself is reused (e.g. by Vite HMR).
const getInitialState = (): SettingsState => ({
  theme: typeof window !== 'undefined' ? getThemeFromStorage() : 'light',
  language: 'en',
  preferences: {},
  isLoading: false,
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState: getInitialState(),
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

export const selectSettingsTheme = (state: { settings: SettingsState }) => state.settings.theme;

// Lazily compute the initial state for new stores (see getInitialState).
export const settingsReducer = (state: SettingsState | undefined, action: UnknownAction): SettingsState =>
  state === undefined ? getInitialState() : settingsSlice.reducer(state, action);

export const applyTheme = (theme?: string) => {
  const themeToApply = theme ?? (localStorage.getItem('theme') as 'light' | 'dark') ?? getSystemThemePreference();
  document.documentElement.classList.toggle('dark', themeToApply === 'dark');
};
