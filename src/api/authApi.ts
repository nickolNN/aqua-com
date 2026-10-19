import { api } from './api';

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type PasswordResetRequest = {
  email: string;
};

export type PasswordResetResponse = {
  message: string;
};

// Re-export the auth endpoints already defined in api.ts
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = api;

export const passwordResetApi = api.injectEndpoints({
  endpoints: (builder) => ({
    passwordReset: builder.mutation<
      PasswordResetResponse,
      PasswordResetRequest
    >({
      query: (data) => ({
        url: '/auth/password-reset',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { usePasswordResetMutation } = passwordResetApi;

export const authApi = api;
