# Auth Flow Fix

## Goal

Fix the auth flow so that after logging in, the PrivateRoute allows access to protected routes (dashboard, contacts, etc.) instead of redirecting to login.

## Problem

The login flow stores a JWT token in `localStorage`, but the Redux auth slice's `isAuthenticated` state is never updated. The `PrivateRoute` component only checks Redux state (`selectIsAuthenticated`), so authenticated users are redirected back to login.

## Changes Required

| File/Directory | Action |
|----------------|--------|
| `src/stores/authSlice.ts` | Add `loginSuccess` action that sets `user` and `isAuthenticated` |
| `src/views/LoginView.tsx` | Dispatch `loginSuccess` after login mutation completes |
| `src/views/RegisterView.tsx` | Dispatch `loginSuccess` after register completes |
| `src/views/LoginView.tsx` (or `PrivateRoute.tsx`) | Restore auth state from localStorage on page load |

## Steps to Execute

- [ ] **FE** Update LoginView to dispatch `loginSuccess` after successful login mutation, passing the user object from the response
- [ ] **FE** Update RegisterView to dispatch `loginSuccess` after successful registration
- [ ] **FE** Add `loginSuccess` to the auth slice reducer (already exists at line 36 but not used by LoginView)
- [ ] **FE** On page load, check localStorage for a token and dispatch `loginSuccess` to restore auth state
- [ ] **FE** Verify that after login, navigating to `/` shows the dashboard without redirecting to login

## Verification

- Login page: entering valid credentials and clicking "Sign in" navigates to dashboard (not back to login)
- Page refresh after login: user remains authenticated, protected routes are accessible
- Register page: after registration, user is logged in and can access protected routes
- Logout: clearing auth state redirects to login

## Legend

| Tag | Meaning |
|-----|---------|
| **FE** | Frontend (React 19 + React Compiler + Redux Toolkit + RTK Query)
