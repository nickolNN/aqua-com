import { Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/components/ThemeContext';
import { Button } from '@/components/ui/Button';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useLogoutMutation } from '@/api/api';
import { logoutSuccess } from '@/stores/authSlice';

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    dispatch(logoutSuccess());
    try {
      await logout().unwrap();
    } catch {
      // ignore logout API error
    }
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between gap-2 glass px-4 py-2 text-sidebar-foreground">
      <Button size="sm" onClick={() => navigate('/tasks?new')}>
        New Task
      </Button>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          data-testid="theme-toggle"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </header>
  );
}
