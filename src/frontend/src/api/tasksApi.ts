import { api } from './api';
import type { Task, TaskCreateInput, TaskDependency, TaskUpdateInput } from '@/types/entities';

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all tasks with filtering and sorting
    getTasks: builder.query<Task[], string>({
      query: (search) => `/tasks${search ? `&search=${search}` : ''}`,
      providesTags: (result) =>
        result
          ? result.map((task) => ({ type: 'Task' as const, id: task.id as unknown as string }))
          : [{ type: 'Task' }],
    }),
    // Get single task by ID
    getTask: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, _err, id) => (result ? [{ type: 'Task', id }] : [{ type: 'Task', id }]),
    }),
    // Create a new task
    createTask: builder.mutation<Task, TaskCreateInput>({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),
    // Update a task
    updateTask: builder.mutation<Task, { id: string; data: TaskUpdateInput }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _err, arg) => [{ type: 'Task', id: arg.id }],
    }),
    // Delete a task
     deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, _err, id) => [{ type: 'Task', id }],
    }),
    // Add a task dependency
    addTaskDependency: builder.mutation<TaskDependency, { taskId: string; data: { predecessor_task_id: string; dependency_type: string } }>({
       query: ({ taskId, data }) => ({
         url: `/tasks/${taskId}/dependencies`,
         method: 'POST',
         body: data,
       }),
       invalidatesTags: (_result, _err, arg) => [{ type: 'Task', id: arg.taskId }],
     }),
    // Remove a task dependency
   removeTaskDependency: builder.mutation<void, { taskId: string; dependencyId: string }>({
       query: ({ taskId, dependencyId }) => ({
         url: `/tasks/${taskId}/dependencies/${dependencyId}`,
         method: 'DELETE',
       }),
       invalidatesTags: (_result, _err, arg) => [{ type: 'Task', id: arg.taskId }],
     }),
   }),
 });

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAddTaskDependencyMutation,
  useRemoveTaskDependencyMutation,
} = tasksApi as Record<string, unknown>;

export const useGetTasksQueryTyped = tasksApi['useGetTasksQuery'] as (arg: string) => {
  data: Task[] | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};
export const useGetTaskQueryTyped = tasksApi['useGetTaskQuery'] as (arg: string) => {
  data: Task | undefined;
  isLoading: boolean;
};
export const useCreateTaskMutationTyped = tasksApi['useCreateTaskMutation'] as unknown as () => [
  (data: TaskCreateInput) => void,
  unknown,
];
export const useUpdateTaskMutationTyped = tasksApi['useUpdateTaskMutation'] as unknown as () => [
  (input: { id: string; data: TaskUpdateInput }) => void,
  unknown,
];
export const useDeleteTaskMutationTyped = tasksApi['useDeleteTaskMutation'] as unknown as () => [
  (id: string) => void,
  unknown,
];
export const useAddTaskDependencyMutationTyped = tasksApi['useAddTaskDependencyMutation'] as unknown as () => [
  (input: { taskId: string; data: Record<string, unknown> }) => void,
  unknown,
];
export const useRemoveTaskDependencyMutationTyped = tasksApi['useRemoveTaskDependencyMutation'] as unknown as () => [
  (input: { taskId: string; dependencyId: string }) => void,
  unknown,
];
