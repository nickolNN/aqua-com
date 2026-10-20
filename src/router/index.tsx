import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout, MainLayout } from '@/components/layout';
import { LoginView } from '@/views/LoginView';
import { PrivateRoute } from '@/components/PrivateRoute';
import { TasksView } from '@/views/TasksView';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginView /> },
    ],
  },
  {
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    children: [
      { path: '/', element: <TasksView /> },
      { path: '/tasks', element: <TasksView /> },
    ],
  },
  // Catch-all: every removed/unknown route (e.g. /tasks/:id, /tasks/:id/details)
  // redirects to the board. Auth is handled by PrivateRoute on /tasks.
  { path: '*', element: <Navigate to="/tasks" replace /> },
]);

export default router;
