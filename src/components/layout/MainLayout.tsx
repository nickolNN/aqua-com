import { LayoutDashboard, User, Building2, CheckSquare, MessageSquare, Sun, Moon, LogOut } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/layout/Sidebar';
import GlobalSearchBar from './GlobalSearchBar';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setTheme } from '@/stores/settingsSlice';
import type { RootState } from '@/store/store';
import SidebarNavItem from './SidebarNavItem';
import { applyTheme } from '@/stores/settingsSlice';
import { useEffect } from 'react';
import { useLogoutMutation } from '@/api/api';
import { logoutSuccess } from '@/stores/authSlice';

/**
 * MainLayout component provides the main application layout with sidebar, header, and content area.
 * Includes global search bar for searching across all entity types.
 */
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
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-64 flex flex-col border-r bg-sidebar text-sidebar-foreground">
        <Sidebar>
          <SidebarHeader logo="Aqua CRM" />
          <SidebarContent>
            <nav className="flex flex-col gap-1 p-2">
              <SidebarNavItem to="/" label="Dashboard" icon={<LayoutDashboard size={16} />} />
              <SidebarNavItem to="/contacts" label="Contacts" icon={<User size={16} />} />
              <SidebarNavItem to="/companies" label="Companies" icon={<Building2 size={16} />} />
              <SidebarNavItem to="/tasks" label="Tasks" icon={<CheckSquare size={16} />} />
              <SidebarNavItem to="/activities" label="Activities" icon={<MessageSquare size={16} />} />
            </nav>
          </SidebarContent>
          <SidebarFooter>
            <button
              type="button"
              onClick={handleThemeToggle}
              aria-label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              role="switch"
              aria-checked={currentTheme === 'dark'}
              className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
            >
              {currentTheme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
              <span>{currentTheme === 'dark' ? 'dark' : 'light'}</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out"
              className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </SidebarFooter>
        </Sidebar>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Global search bar */}
        <div className="sticky top-0 z-50 border-b bg-white px-6 py-4">
          <GlobalSearchBar />
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
