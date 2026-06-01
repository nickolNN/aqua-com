import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCreateTaskMutationTyped, useUpdateTaskMutationTyped } from '@/api/tasksApi';
import type { TaskCreateInput } from '@/types/entities';

export function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [createTask, createTaskState] = useCreateTaskMutationTyped();
  const [updateTask] = useUpdateTaskMutationTyped();
  const isSuccess = (createTaskState as { isSuccess?: boolean })?.isSuccess;

  const [formData, setFormData] = useState<TaskCreateInput>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'open',
    due_date: undefined,
    assigned_to: '',
    parent_task_id: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const cleanedData: TaskCreateInput = {
      title: formData.title,
      description: formData.description || undefined,
      priority: formData.priority,
      status: formData.status,
      due_date: formData.due_date,
      assigned_to: formData.assigned_to || undefined,
      parent_task_id: formData.parent_task_id || undefined,
    };

    try {
      if (isEdit) {
        const taskToUseId = id;
        const result = await updateTask({ id: taskToUseId as string, data: cleanedData });
        if (result.data) {
          navigate(`/tasks/${taskToUseId}`);
        }
      } else {
        const result = await createTask(cleanedData);
        if (result.data) {
          navigate('/tasks');
        }
      }
    } catch (err) {
      console.error('Failed to save task:', err);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="text-green-500">
          Task {isEdit ? 'updated' : 'created'} successfully!
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isEdit ? 'Edit Task' : 'Create Task'}
        </h1>
        <Link
          to={isEdit ? `/tasks/${id}` : '/tasks'}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded-md p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label htmlFor="assigned_to" className="block text-sm font-medium mb-1">
              Assigned To
            </label>
            <input
              id="assigned_to"
              name="assigned_to"
              type="text"
              value={formData.assigned_to || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isEdit ? 'Update Task' : 'Create Task'}
          </button>
          <Link
            to={isEdit ? `/tasks/${id}` : '/tasks'}
            className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
