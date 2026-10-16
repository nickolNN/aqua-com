import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSettingsTheme, setTheme as setThemeAction } from '@/stores/settingsSlice';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// The palette lives in src/styles/tailwind.css (`:root` / `.dark`); this only
// toggles the `.dark` class so the CSS variables apply. No inline overrides.
const applyTheme = (theme: 'light' | 'dark') => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useSelector(selectSettingsTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setThemeAction(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
