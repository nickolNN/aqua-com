import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout, MainLayout } from '@/components/layout';
import { LoginView } from '@/views/LoginView';
import { DashboardView } from '@/views/DashboardView';
import { ContactsView } from '@/views/ContactsView';
import { CompaniesView } from '@/views/CompaniesView';
import { TasksView } from '@/views/TasksView';
import { ActivitiesView } from '@/views/ActivitiesView';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginView />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <DashboardView />,
      },
      {
        path: '/contacts',
        element: <ContactsView />,
      },
      {
        path: '/contacts/:id',
        element: <ContactsView />,
      },
      {
        path: '/companies',
        element: <CompaniesView />,
      },
      {
        path: '/companies/:id',
        element: <CompaniesView />,
      },
      {
        path: '/tasks',
        element: <TasksView />,
      },
      {
        path: '/tasks/:id',
        element: <TasksView />,
      },
      {
        path: '/activities',
        element: <ActivitiesView />,
      },
      {
        path: '/activities/:contactId',
        element: <ActivitiesView />,
      },
    ],
  },
]);

export default router;
