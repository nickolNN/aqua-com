import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
  }),
  tagTypes: ['Contact', 'Company', 'Task', 'Activity', 'Auth', 'Dashboard', 'Search'],
  endpoints: () => ({}),
  keepUnusedDataFor: 5,
});
