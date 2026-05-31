// =====================================================
// RTK Query Activities API
// =====================================================
import { api } from './api';
import type { ActivitySchema } from '@/mock-data/schemas';

// Activity type constants
export const ACTIVITY_TYPES = ['call', 'meeting', 'email', 'note', 'task', 'deal', 'other'] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export interface CreateActivityRequest {
  type: ActivityType;
  title: string;
  description?: string;
  contact_id?: string;
  company_id?: string;
  date: string;
  duration?: number;
}

export interface UpdateActivityRequest {
  type?: ActivityType;
  title?: string;
  description?: string;
  contact_id?: string;
  company_id?: string;
  date?: string;
  duration?: number;
}

export const activitiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query<{ activities: ActivitySchema[], total: number }, { page?: number; limit?: number; search?: string }>({
      query: ({ page = 1, limit = 50, search }) => ({
        url: `/activities`,
        params: { page: String(page), limit: String(limit), search: search || '' },
      }),
      providesTags: ['Activity'],
    }),
    getActivity: builder.query<ActivitySchema, string>({
      query: (id) => `/activities/${id}`,
      providesTags: (_: unknown, __: unknown, id: string) =>
        [{ type: 'Activity', id }] as const,
    }),
    createActivity: builder.mutation<ActivitySchema, CreateActivityRequest>({
      query: (data) => ({
        url: '/activities',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Activity'],
    }),
    updateActivity: builder.mutation<ActivitySchema, { id: string; data: Partial<ActivitySchema> }>({
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
