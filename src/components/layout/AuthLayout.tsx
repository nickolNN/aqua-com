import { Outlet } from 'react-router-dom';

/**
 * AuthLayout component provides the layout for authentication pages (login, register).
 * Centers content and provides a clean, minimal background.
 */
export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Aqua CRM</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your account</p>
        </div>
        <div className="rounded-lg glass p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
