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
  document.documentElement.style.setProperty('--background', theme === 'dark' ? '#030711' : '#ffffff');
  document.documentElement.style.setProperty('--foreground', theme === 'dark' ? '#f5f9ff' : '#020817');
  document.documentElement.style.setProperty('--border', theme === 'dark' ? '#27272a' : '#eeeff1');
  document.documentElement.style.setProperty('--sidebar', theme === 'dark' ? '#09090b' : '#fafafa');
  document.documentElement.style.setProperty('--sidebar-foreground', theme === 'dark' ? '#f5f9ff' : '#020817');
  document.documentElement.style.setProperty('--sidebar-border', theme === 'dark' ? '#27272a' : '#eeeff1');
  document.documentElement.style.setProperty('--sidebar-accent', theme === 'dark' ? '#27272a' : '#eeeff1');
  document.documentElement.style.setProperty('--sidebar-accent-foreground', theme === 'dark' ? '#f5f9ff' : '#17181c');
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
