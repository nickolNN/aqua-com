import { LayoutDashboard, User, Building2, CheckSquare, MessageSquare } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/layout/Sidebar';
import GlobalSearchBar from './GlobalSearchBar';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setTheme } from '@/stores/settingsSlice';
import SidebarNavItem from './SidebarNavItem';

/**
 * MainLayout component provides the main application layout with sidebar, header, and content area.
 * Includes global search bar for searching across all entity types.
 */
export function MainLayout() {
  const theme = useSelector((state: { settings: { theme: string } }) => state.settings.theme);
  const dispatch = useAppDispatch();

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
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
              onClick={handleThemeToggle}
              className="text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
            >
              {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
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
