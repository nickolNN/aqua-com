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

// Re-export the auth endpoints already defined in api.ts
export const { useLoginMutation, useLogoutMutation } = api;

export const authApi = api;
