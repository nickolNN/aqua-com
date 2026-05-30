import { api } from './api';
import type { Activity } from '@/types/entities';

export const activitiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
});

export const {
  useGetActivitiesQuery,
  useGetActivityQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} = activitiesApi;
