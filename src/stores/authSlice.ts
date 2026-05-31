import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/types/entities';

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.user = {
        id: action.payload.user.id,
        email: action.payload.user.email,
        role: action.payload.user.role,
        token: action.payload.token,
      };
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    loginFailure: (state) => {
      state.isLoading = false;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setError,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

// Selectors
export const selectAuthUser = (state: { auth: AuthState }): AuthUser | null =>
  state.auth.user;

export const selectIsAuthenticated = (state: { auth: AuthState }): boolean =>
  state.auth.isAuthenticated;

export const selectAuthLoading = (state: { auth: AuthState }): boolean =>
  state.auth.isLoading;

export const selectAuthError = (state: { auth: AuthState }): string | null =>
  state.auth.error;

export const useAuth = () => authSlice;
