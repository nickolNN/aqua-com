import { api } from './api';
import type { Task, TaskCreateInput, TaskDependency, TaskUpdateInput } from '@/types/entities';

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], string>({
      query: (search) => `/tasks${search ? `&search=${search}` : ''}`,
      providesTags: (result) =>
        result
          ? result.map((task) => ({ type: 'Task' as const, id: task.id as unknown as string }))
          : [{ type: 'Task' }],
    }),
    getTask: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, _err, id) => (result ? [{ type: 'Task', id }] : [{ type: 'Task', id }]),
    }),
    createTask: builder.mutation<Task, TaskCreateInput>({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<Task, { id: string; data: TaskUpdateInput }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _err, arg) => [{ type: 'Task', id: arg.id }],
    }),
     deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, _err, id) => [{ type: 'Task', id }],
    }),
    addTaskDependency: builder.mutation<TaskDependency, { taskId: string; data: { predecessor_task_id: string; dependency_type: string } }>({
       query: ({ taskId, data }) => ({
         url: `/tasks/${taskId}/dependencies`,
         method: 'POST',
         body: data,
       }),
       invalidatesTags: (_result, _err, arg) => [{ type: 'Task', id: arg.taskId }],
      }),
   removeTaskDependency: builder.mutation<void, { taskId: string; dependencyId: string }>({
       query: ({ taskId, dependencyId }) => ({
         url: `/tasks/${taskId}/dependencies/${dependencyId}`,
         method: 'DELETE',
       }),
       invalidatesTags: (_result, _err, arg) => [{ type: 'Task', id: arg.taskId }],
      }),
    // Optional `position`: the card lands at that index in the target column (cross-column drop).
    updateTaskStatus: builder.mutation<Task, { id: string; data: { status: string; position?: number } }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}/status`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _err, arg) => [{ type: 'Task', id: arg.id }],
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
  useUpdateTaskStatusMutation,
} = tasksApi;

export const useGetTasksQueryTyped = tasksApi['useGetTasksQuery'] as (arg: string) => {
  data: Task[] | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: unknown;
};
export const useGetTaskQueryTyped = tasksApi['useGetTaskQuery'] as (arg: string) => {
  data: Task | undefined;
  isLoading: boolean;
};
export const useCreateTaskMutationTyped = tasksApi['useCreateTaskMutation'] as unknown as () => [
  (data: TaskCreateInput) => Promise<{ data: Task }>,
  unknown,
  { isSuccess: boolean },
];
export const useUpdateTaskMutationTyped = tasksApi['useUpdateTaskMutation'] as unknown as () => [
  (input: { id: string; data: TaskUpdateInput }) => Promise<{ data: Task }>,
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
export const useUpdateTaskStatusMutationTyped = tasksApi['useUpdateTaskStatusMutation'] as unknown as () => [
  (input: { id: string; data: { status: string; position?: number } }) => Promise<{ data: Task }>,
  unknown,
];
