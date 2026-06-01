import { useState, type FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCreateTaskMutationTyped, useUpdateTaskMutationTyped } from '@/api/tasksApi';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/Select';
import type { TaskCreateInput } from '@/types/entities';

interface TaskFormErrors {
  title?: string;
  assigned_to?: string;
}

export function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const [errors, setErrors] = useState<TaskFormErrors>({});

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'title' && value) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: TaskFormErrors = {};
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

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
        <div className="text-primary">
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
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Cancel
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Task' : 'Create Task'}</CardTitle>
          <CardDescription>Fill in the task details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && (
                  <p className="text-xs text-destructive mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium mb-1">
                  Priority
                </label>
                <Select value={formData.priority} onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value as 'low' | 'medium' | 'high' | 'urgent' }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">
                  Status
                </label>
                <Select value={formData.status} onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as 'open' | 'in_progress' | 'completed' | 'cancelled' }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="assigned_to" className="block text-sm font-medium mb-1">
                  Assigned To
                </label>
                <Input
                  id="assigned_to"
                  name="assigned_to"
                  type="text"
                  value={formData.assigned_to || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
            <div className="flex gap-4">
              <Button type="submit">
                {isEdit ? 'Update Task' : 'Create Task'}
              </Button>
              <Link
                to={isEdit ? `/tasks/${id}` : '/tasks'}
              >
                Cancel
              </Link>
            </div>
          </CardFooter>
      </Card>
    </div>
  );
}
