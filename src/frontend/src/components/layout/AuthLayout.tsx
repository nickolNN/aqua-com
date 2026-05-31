import { Outlet } from 'react-router-dom';

/**
 * AuthLayout component provides the layout for authentication pages (login, register).
 * Centers content and provides a clean, minimal background.
 */
export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Aqua CRM</h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
