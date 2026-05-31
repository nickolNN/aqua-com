import { api } from './api';
import type { Company } from '@/types/entities';

export const companiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companiesApi;
