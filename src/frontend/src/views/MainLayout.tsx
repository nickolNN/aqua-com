import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/">Aqua CRM</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/contacts">Contacts</a>
              <a href="/companies">Companies</a>
              <a href="/tasks">Tasks</a>
              <a href="/activities">Activities</a>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
