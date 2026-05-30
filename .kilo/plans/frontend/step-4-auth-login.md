# Step 4: Auth & Login

## Goal

Implement authentication system with login, register, logout, and route guards.

## Changes Required

| File/Directory | Action |
|----------------|--------|
| `src/stores/authSlice.ts` | Auth Redux slice with login/register/logout |
| `src/api/authApi.ts` | RTK Query auth endpoints |
| `src/views/LoginPage.tsx` | Login page component |
| `src/views/RegisterPage.tsx` | Register page component |
| `src/views/PasswordResetPage.tsx` | Password reset page |
| `src/components/AuthLayout.tsx` | Auth layout wrapper |
| `src/components/PrivateRoute.tsx` | Route guard component |

## Steps to Execute

- [ ] **FE** Create auth Redux slice with initialState, reducers, async login/register/logout thunks
- [ ] **FE** Create RTK Query auth endpoints (login, register, password reset)
- [ ] **FE** Create Login page with form validation
- [ ] **FE** Create Register page with form validation
- [ ] **FE** Create Password Reset page with form validation
- [ ] **FE** Implement auth route guard (PrivateRoute) using Redux state and selectors
- [ ] **FE** Store JWT token in Redux slice and localStorage
- [ ] **FE** Implement logout thunk (clear auth state, redirect to login)

## Verification

- Login/Register pages validate form inputs correctly
- Route guard protects authenticated routes
- JWT token persists across page refreshes
- Logout clears auth state and redirects to login

## Legend

| Tag | Meaning |
|-----|---------|
| **FE** | Frontend (React 19 + React Compiler + Redux Toolkit + RTK Query) |
