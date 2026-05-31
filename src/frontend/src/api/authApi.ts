import { api } from './api';

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export type LoginRequest = {
  email: string;
  password: string;
}

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
}

// Re-export the auth endpoints already defined in api.ts
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = api;

// Export authApi for compatibility
export const authApi = api;
