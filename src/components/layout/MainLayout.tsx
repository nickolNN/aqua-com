import { CheckSquare, Sun, Moon, LogOut } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarHeader, SidebarContent } from '@/components/layout/Sidebar';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setTheme } from '@/stores/settingsSlice';
import type { RootState } from '@/store/store';
import SidebarNavItem from './SidebarNavItem';
import { applyTheme } from '@/stores/settingsSlice';
import { useEffect } from 'react';
import { useLogoutMutation } from '@/api/api';
import { logoutSuccess } from '@/stores/authSlice';

export function MainLayout() {
  const dispatch = useAppDispatch();
  const currentTheme = useSelector((state: RootState) => state.settings.theme);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };

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
    <div className="flex min-h-screen">
      <aside className="sticky top-0 h-screen w-64 flex flex-col glass text-sidebar-foreground">
        <Sidebar>
          <SidebarHeader logo="Aqua CRM" />
          <SidebarContent>
            <nav className="flex flex-col gap-1 p-2">
              <SidebarNavItem to="/tasks" label="Tasks" icon={<CheckSquare size={16} />} />
              <SidebarNavItem
                onClick={handleThemeToggle}
                icon={currentTheme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                data-testid="theme-toggle"
                aria-label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              />
              <SidebarNavItem onClick={handleLogout} icon={<LogOut size={16} />} label="Log out" />
            </nav>
          </SidebarContent>
        </Sidebar>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
