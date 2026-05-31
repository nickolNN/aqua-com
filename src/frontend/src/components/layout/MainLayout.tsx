import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import GlobalSearchBar from './GlobalSearchBar';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setTheme } from '@/stores/settingsSlice';

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
      <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground">
        <Sidebar>
          <SidebarHeader logo="Aqua CRM" />
          <SidebarContent>
            <nav className="flex flex-col gap-1 p-2">
              <a
                href="/"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/contacts"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                Contacts
              </a>
              <a
                href="/companies"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                Companies
              </a>
              <a
                href="/tasks"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                Tasks
              </a>
              <a
                href="/activities"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                Activities
              </a>
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
      <div className="flex-1">
        {/* Header with global search bar */}
        <Header title="Aqua CRM">
          <GlobalSearchBar />
        </Header>

        {/* Main content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
