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

- [x] **FE** Create tasks Redux slice with state shape (task list, selected task, filters) → `src/stores/tasksSlice.ts`
- [x] **FE** Create RTK Query API definition for tasks with CRUD endpoints → `src/api/tasksApi.ts`
- [x] **FE** Implement task CRUD async thunks (createTask, updateTask, deleteTask, fetchTasks) → via RTK Query endpoints
- [x] **FE** Set up RTK Query cache tags for task dependencies → `src/api/tasksApi.ts` (tags: `Task`, `Task` with ID)
- [x] **FE** Create Kanban board Redux slice with column state, drag state, board config → `src/stores/kanbanSlice.ts`
- [x] **FE** Implement drag-and-drop Kanban board using Redux state → `src/components/tasks/KanbanBoard.tsx`
- [x] **FE** Create Task List page → `src/views/TasksView.tsx`
- [x] **FE** Create Task Detail view with dependencies and subtasks → `src/views/TaskDetailView.tsx`
- [x] **FE** Create Task Create/Edit form with validation → `src/views/TaskForm.tsx`
- [x] **FE** Implement task dependency UI with Redux state management → `src/views/TaskDetailView.tsx` (renders dependencies list)
- [x] **FE** Implement task subtasks UI with nested relationships → `src/types/entities.ts` (Task.subtask_count)
- [x] **FE** Connect RTK Query interceptor to centralized mock data → `src/mock-data/interceptors/index.ts`, `src/mock-data/interceptors/rtk-mock-interceptors.ts`, `src/mock-data/persistence/index.ts`

## Verification

- Task list displays mock data correctly
- Kanban board supports drag and drop between columns
- Task detail view shows dependencies and subtasks
- Task form validates inputs correctly

## Legend

| Tag | Meaning |
|-----|---------|
| **FE** | Frontend (React 19 + React Compiler + Redux Toolkit + RTK Query) |
