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
      // Contacts
      { path: '/contacts', element: <ContactsView /> },
      { path: '/contacts/:id', element: <ContactDetailView /> },
      { path: '/contacts/new', element: <ContactForm /> },
      // Companies
      { path: '/companies', element: <CompaniesView /> },
      { path: '/companies/:id', element: <CompanyDetailView /> },
      { path: '/companies/new', element: <CompanyForm /> },
      // Tasks
      { path: '/tasks', element: <TasksView /> },
      { path: '/tasks/:id', element: <TaskDetailView /> },
      { path: '/tasks/new', element: <TaskForm /> },
      // Activities
      { path: '/activities', element: <ActivitiesView /> },
      { path: '/activities/:contactId', element: <ActivitiesView /> },
      // Reports
      { path: '/reports', element: <ReportsView /> },
      // Search
      { path: '/search', element: <SearchView /> },
    ],
  },
]);

export default router;
