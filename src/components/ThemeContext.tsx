import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSettingsTheme, setTheme as setThemeAction } from '@/stores/settingsSlice';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const applyTheme = (theme: 'light' | 'dark') => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.setProperty('--background', theme === 'dark' ? '224 71% 4%' : '0 0% 100%');
  document.documentElement.style.setProperty('--foreground', theme === 'dark' ? '213 96% 98%' : '222.2 84% 4.9%');
  document.documentElement.style.setProperty('--border', theme === 'dark' ? '240 3.7% 15.9%' : '224 10% 94%');
  document.documentElement.style.setProperty('--sidebar', theme ==='dark' ? '240 10% 3.9%' : '0 0% 98%');
  document.documentElement.style.setProperty('--sidebar-foreground', theme ==='dark' ? '213 96% 98%' : '222.2 84% 4.9%');
  document.documentElement.style.setProperty('--sidebar-border', theme ==='dark' ? '240 3.7% 15.9%' : '224 10% 94%');
  document.documentElement.style.setProperty('--sidebar-accent', theme ==='dark' ? '240 3.7% 15.9%' : '224 10% 94%');
  document.documentElement.style.setProperty('--sidebar-accent-foreground', theme ==='dark' ? '213 96% 98%' : '224 10% 10%');
  document.documentElement.style.setProperty('--radius', '0.5rem');
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
