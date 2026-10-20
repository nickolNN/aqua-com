import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout, MainLayout } from '@/components/layout';
import { LoginView } from '@/views/LoginView';
import { PrivateRoute } from '@/components/PrivateRoute';
import { TasksView } from '@/views/TasksView';
import { TaskDetailView } from '@/views/TaskDetailView';
import { TaskForm } from '@/views/TaskForm';

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
      { path: '/tasks/new', element: <TaskForm /> },
      { path: '/tasks/:id', element: <TaskForm /> },
      { path: '/tasks/:id/details', element: <TaskDetailView /> },
    ],
  },
]);

export default router;
