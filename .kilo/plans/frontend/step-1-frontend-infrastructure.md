# Step 1: Frontend Infrastructure Setup

## Goal

Set up the React 19 + TypeScript + Redux Toolkit frontend foundation with Vite build system, routing, Redux store, RTK Query, and type definitions.

## Changes Required

| File/Directory | Action |
|----------------|--------|
| `package.json` | Add dependencies (React, TypeScript, Redux Toolkit, RTK Query, React Router, Tailwind CSS, Vite) |
| `vite.config.ts` | Configure Vite with path aliases and build options |
| `tsconfig.json` | Configure TypeScript with strict mode and path aliases |
| `src/types/` | Create TypeScript type definitions |
| `src/store/` | Create Redux store configuration |
| `src/api/` | Create RTK Query API definitions |
| `src/slices/` | Create Redux slices |
| `src/router/` | Create route definitions |
| `src/styles/` | Configure Tailwind CSS |
| `src/utils/` | Create utility functions |

## Steps to Execute

- [ ] **FE** Configure Vite build system with path aliases (src/ -> /) and build options
- [ ] **FE** Set up Tailwind CSS with theme configuration (dark mode support)
- [ ] **FE** Configure TypeScript with tsconfig.json for strict mode and path aliases
- [ ] **FE** Create TypeScript type definitions for all entities (Contact, Company, Task, Activity, User) in src/types/
- [ ] **FE** Create Redux store with reducers, middleware (RTK, thunk, logger), devtools, and persistence
- [ ] **FE** Create RTK Query API definition with base endpoint and tags system for cache invalidation
- [ ] **FE** Create all Redux slices: auth, contacts, companies, tasks, activities, dashboard, search, settings
- [ ] **FE** Create all Redux async thunks for each slice (fetch, create, update, delete)
- [ ] **FE** Create RTK Query API endpoints for all resources
- [ ] **FE** Set up React Router with routes: auth, contacts, companies, tasks, activities, dashboard
- [ ] **FE** Create React Context providers (ThemeContext, AuthContext) for global state management
- [ ] **FE** Create utility functions directory (src/utils/) with shared helpers

## Verification

- Frontend project builds without errors (`pnpm run build`)
- TypeScript compiles without errors (`tsc --noEmit`)
- No lint errors (`pnpm lint`)

## Legend

| Tag | Meaning |
|-----|---------|
| **FE** | Frontend (React 19 + React Compiler + Redux Toolkit + RTK Query) |
