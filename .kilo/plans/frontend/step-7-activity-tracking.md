# Step 7: Activity Tracking

## Goal

Implement activity tracking with timeline view and CRUD operations.

## Changes Required

| File/Directory | Action |
|----------------|--------|
| `src/stores/activitiesSlice.ts` | Activities Redux slice |
| `src/api/activitiesApi.ts` | RTK Query activities endpoints |
| `src/views/ActivitiesPage.tsx` | Activities timeline page |
| `src/views/ActivityForm.tsx` | Activity create/edit form |

## Steps to Execute

- [ ] **FE** Create activities Redux slice with state shape (activity list, filters)
- [ ] **FE** Create RTK Query API definition for activities with CRUD endpoints
- [ ] **FE** Implement activity CRUD async thunks
- [ ] **FE** Set up RTK Query mock interceptor for activities
- [ ] **FE** Create Activity Timeline view with chronological display
- [ ] **FE** Create Activity Create/Edit form with validation
- [ ] **FE** Implement activity type selector with Redux state
- [ ] **FE** Display activity timeline with sorting and filtering

## Verification

- Activity timeline displays mock data chronologically
- Activity form validates inputs correctly
- Activity filtering and sorting works
- Activity CRUD operations update mock data correctly

## Legend

| Tag | Meaning |
|-----|---------|
| **FE** | Frontend (React 19 + React Compiler + Redux Toolkit + RTK Query) |
