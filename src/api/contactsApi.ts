import { api } from './api';
import type { Contact } from '@/types/entities';

export const contactsApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;
