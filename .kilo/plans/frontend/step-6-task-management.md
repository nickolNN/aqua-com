# Step 6: Task Management

## Goal

Implement task management with Kanban board, dependencies, and subtasks.

## Changes Required

| File/Directory | Action |
|----------------|--------|
| `src/stores/tasksSlice.ts` | Tasks Redux slice |
| `src/stores/kanbanSlice.ts` | Kanban board Redux slice |
| `src/api/tasksApi.ts` | RTK Query tasks endpoints |
| `src/views/TasksPage.tsx` | Tasks list page |
| `src/views/KanbanBoard.tsx` | Kanban board component |
| `src/views/TaskDetail.tsx` | Task detail view |
| `src/views/TaskForm.tsx` | Task create/edit form |

## Steps to Execute

- [ ] **FE** Create tasks Redux slice with state shape (task list, selected task, filters)
- [ ] **FE** Create RTK Query API definition for tasks with CRUD endpoints
- [ ] **FE** Implement task CRUD async thunks (createTask, updateTask, deleteTask, fetchTasks)
- [ ] **FE** Set up RTK Query cache tags for task dependencies
- [ ] **FE** Create Kanban board Redux slice with column state, drag state, board config
- [ ] **FE** Implement drag-and-drop Kanban board using Redux state
- [ ] **FE** Create Task List page
- [ ] **FE** Create Task Detail view with dependencies and subtasks
- [ ] **FE** Create Task Create/Edit form with validation
- [ ] **FE** Implement task dependency UI with Redux state management
- [ ] **FE** Implement task subtasks UI with nested relationships
- [ ] **FE** Connect RTK Query interceptor to centralized mock data

## Verification

- Task list displays mock data correctly
- Kanban board supports drag and drop between columns
- Task detail view shows dependencies and subtasks
- Task form validates inputs correctly

## Legend

| Tag | Meaning |
|-----|---------|
| **FE** | Frontend (React 19 + React Compiler + Redux Toolkit + RTK Query) |
