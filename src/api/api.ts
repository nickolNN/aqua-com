import { createApi } from '@reduxjs/toolkit/query/react';
import { mockBaseQuery } from './interceptors';


// Login/Register types
export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}
export type RegisterRequest = {
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
  baseQuery: mockBaseQuery,
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
  }),
  keepUnusedDataFor: 5,
});

// Export hooks
export const {
  // Auth hooks
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = api;
