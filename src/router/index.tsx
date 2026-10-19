import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout, MainLayout } from '@/components/layout';
import { LoginView } from '@/views/LoginView';
import { RegisterView } from '@/views/RegisterView';
import { PasswordResetView } from '@/views/PasswordResetView';
import { PrivateRoute } from '@/components/PrivateRoute';
import { DashboardView } from '@/views/DashboardView';
import { ContactsView } from '@/views/ContactsView';
import { ContactDetailView } from '@/views/ContactDetailView';
import { ContactForm } from '@/views/ContactForm';
import { CompaniesView } from '@/views/CompaniesView';
import { CompanyDetailView } from '@/views/CompanyDetailView';
import { CompanyForm } from '@/views/CompanyForm';
import { TasksView } from '@/views/TasksView';
import { TaskDetailView } from '@/views/TaskDetailView';
import { TaskForm } from '@/views/TaskForm';
import { ActivitiesView } from '@/views/ActivitiesView';
import { ReportsView } from '@/views/ReportsView';
import { SearchView } from '@/views/SearchView';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginView /> },
      { path: '/register', element: <RegisterView /> },
      { path: '/password-reset', element: <PasswordResetView /> },
    ],
  },
  {
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    children: [
      { path: '/', element: <DashboardView /> },
      { path: '/contacts', element: <ContactsView /> },
      { path: '/contacts/:id', element: <ContactForm /> },
      { path: '/contacts/:id/details', element: <ContactDetailView /> },
      { path: '/companies', element: <CompaniesView /> },
      { path: '/companies/:id', element: <CompanyForm /> },
      { path: '/companies/:id/details', element: <CompanyDetailView /> },
      { path: '/tasks', element: <TasksView /> },
      { path: '/tasks/:id', element: <TaskForm /> },
      { path: '/tasks/:id/details', element: <TaskDetailView /> },
      { path: '/tasks/new', element: <TaskForm /> },
      { path: '/activities', element: <ActivitiesView /> },
      { path: '/activities/:contactId', element: <ActivitiesView /> },
      { path: '/reports', element: <ReportsView /> },
      { path: '/search', element: <SearchView /> },
    ],
  },
]);

export default router;
