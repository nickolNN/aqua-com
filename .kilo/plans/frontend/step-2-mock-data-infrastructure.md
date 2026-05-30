# Step 2: Mock Data Infrastructure

## Goal

Create centralized mock data infrastructure with RTK Query interceptor and MSW support for frontend-only operation.

## Changes Required

| File/Directory | Action |
|----------------|--------|
| `src/mock-data/` | Create centralized mock data directory |
| `src/mock-data/schemas/` | Define TypeScript interfaces for entity schemas |
| `src/mock-data/generators/` | Create mock data generators for each entity |
| `src/mock-data/index.ts` | Export all mock data |
| `src/api/interceptors/` | Set up RTK Query interceptor for mock data |
| `src/mock-msw/` | Set up MSW handlers |

## Steps to Execute

- [ ] **FE** Define mock data schemas (ContactSchema, CompanySchema, TaskSchema, ActivitySchema, UserSchema) using TypeScript interfaces
- [ ] **FE** Create mock data generators for each entity with realistic sample data
- [ ] **FE** Create centralized mock data index file exporting all entities
- [ ] **FE** Implement RTK Query interceptor that intercepts API requests and returns mock data
- [ ] **FE** Set up MSW (Mock Service Worker) with handlers for all CRUD operations
- [ ] **FE** Create mock handlers for all CRUD operations (create, read, update, delete, search, filter)
- [ ] **FE** Implement mock data persistence layer using localStorage
- [ ] **FE** Connect mock infrastructure to RTK Query endpoints

## Verification

- Mock data generates realistic sample data for all entities
- RTK Query interceptor returns mock data for all API endpoints
- MSW handlers intercept API requests correctly
- localStorage persistence survives page refreshes
- Build succeeds without errors (`pnpm run build`)

## Legend

| Tag | Meaning |
|-----|---------|
| **FE** | Frontend (React 19 + React Compiler + Redux Toolkit + RTK Query) |
