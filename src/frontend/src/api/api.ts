import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Contact, Company, Task, Activity } from '@/types/entities';

// Login/Register types
interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}
interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  error: string | null;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Query params for filtering
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

// RTK Query API definition
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
  }),
  tagTypes: ['Contact', 'Company', 'Task', 'Activity', 'Auth', 'Dashboard', 'Search'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    // Contacts endpoints
    getContacts: builder.query<Contact[], string>({
      query: (search) => `/contacts${search ? `?search=${search}` : ''}`,
      providesTags: ['Contact'],
    }),
    getContact: builder.query<Contact, string>({
      query: (id) => `/contacts/${id}`,
      providesTags: ['Contact'],
    }),
    createContact: builder.mutation<Contact, Partial<Contact>>({
      query: (data) => ({
        url: '/contacts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Contact'],
    }),
    updateContact: builder.mutation<Contact, { id: string; data: Partial<Contact> }>({
      query: ({ id, data }) => ({
        url: `/contacts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),

    // Companies endpoints
    getCompanies: builder.query<Company[], string>({
      query: (search) => `/companies${search ? `?search=${search}` : ''}`,
      providesTags: ['Company'],
    }),
    getCompany: builder.query<Company, string>({
      query: (id) => `/companies/${id}`,
      providesTags: ['Company'],
    }),
    createCompany: builder.mutation<Company, Partial<Company>>({
      query: (data) => ({
        url: '/companies',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Company'],
    }),
    updateCompany: builder.mutation<Company, { id: string; data: Partial<Company> }>({
      query: ({ id, data }) => ({
        url: `/companies/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Company'],
    }),
    deleteCompany: builder.mutation<void, string>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Company'],
    }),

    // Tasks endpoints
    getTasks: builder.query<Task[], string>({
      query: (search) => `/tasks${search ? `&search=${search}` : ''}`,
      providesTags: ['Task'],
    }),
    getTask: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: ['Task'],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),

    // Activities endpoints
    getActivities: builder.query<Activity[], string>({
      query: (search) => `/activities${search ? `&search=${search}` : ''}`,
      providesTags: ['Activity'],
    }),
    getActivity: builder.query<Activity, string>({
      query: (id) => `/activities/${id}`,
      providesTags: ['Activity'],
    }),
    createActivity: builder.mutation<Activity, Partial<Activity>>({
      query: (data) => ({
        url: '/activities',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Activity'],
    }),
    updateActivity: builder.mutation<Activity, { id: string; data: Partial<Activity> }>({
      query: ({ id, data }) => ({
        url: `/activities/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Activity'],
    }),
    deleteActivity: builder.mutation<void, string>({
      query: (id) => ({
        url: `/activities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Activity'],
    }),
  }),
  keepUnusedDataFor: 5,
});

// Export hooks
export const {
  // Auth hooks
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  // Contacts hooks
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
  // Companies hooks
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  // Tasks hooks
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  // Activities hooks
  useGetActivitiesQuery,
  useGetActivityQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} = api;
