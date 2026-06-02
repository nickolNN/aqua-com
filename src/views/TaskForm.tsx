import { useState, useEffect, type FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetTasksQuery } from '@/api/tasksApi';
import { useCreateTaskMutation, useUpdateTaskMutation } from '@/api/tasksApi';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/Select';
import type { TaskCreateInput } from '@/types/entities';

interface TaskFormErrors {
  title?: string;
  assigned_to?: string;
  parent_task_id?: string;
  dependencies?: string;
}

interface DependencyField {
  predecessor_task_id: string;
  dependency_type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
  id: string;
}

export function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubtask, setIsSubtask] = useState(false);
  const [subtaskParentId, setSubtaskParentId] = useState('');
  const [dependencies, setDependencies] = useState<DependencyField[]>([]);

  const { data: tasks, isLoading: tasksLoading } = useGetTasksQuery('');

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [formData, setFormData] = useState<TaskCreateInput>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'open',
    due_date: undefined,
    assigned_to: '',
    parent_task_id: '',
    dependencies: [],
  });

  useEffect(() => {
    if (isEdit && id) {
      const task = tasks?.find((t: { id: string }) => t.id === id);
      if (task) {
        setFormData({
          title: task.title || '',
          description: task.description || '',
          priority: task.priority || 'medium',
          status: task.status || 'open',
          due_date: task.due_date || undefined,
          assigned_to: task.assigned_to || '',
          parent_task_id: task.parent_task_id || '',
          dependencies: task.dependencies || [],
        });
        if (task.parent_task_id) {
          setIsSubtask(true);
          setSubtaskParentId(task.parent_task_id);
        }
      }
    }
  }, [tasks, isEdit, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'title') {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: TaskFormErrors = {};
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (isSubtask && !formData.parent_task_id) {
      newErrors.parent_task_id = 'Parent task is required for subtasks';
    }

    const depTypes = dependencies.map(d => d.dependency_type);
    if (dependencies.length > 1 && (depTypes.includes('start_to_start') && depTypes.includes('finish_to_finish'))) {
      newErrors.dependencies = 'Cannot mix start-to-start and finish-to-finish dependencies';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddDependency = () => {
    const newId = `dep-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    setDependencies(prev => [
      ...prev,
      { predecessor_task_id: '', dependency_type: 'finish_to_start', id: newId }
    ]);
  };

  const handleRemoveDependency = (depId: string) => {
    setDependencies(prev => prev.filter(d => d.id !== depId));
  };

  const handleDependencyChange = (depId: string, field: string, value: string) => {
    setDependencies(prev =>
      prev.map(dep => {
        if (dep.id === depId) {
          const updated = { ...dep, [field]: value };
          if (field === 'predecessor_task_id') {
            updated.predecessor_task_id = value;
          } else {
            updated.dependency_type = value as typeof dep.dependency_type;
          }
          return updated;
        }
        return dep;
      })
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setErrorMessage(null);
    if (!validate()) return;

    if (isEdit) {
      setIsUpdating(true);
      try {
        const result = await updateTask({ id: id as string, data: formData });
        if (result.data) {
          setSuccess('Task updated successfully');
          navigate(`/tasks/${id}`);
        }
      } catch (err) {
        setErrorMessage('Failed to update task');
      } finally {
        setIsUpdating(false);
      }
    } else {
      setIsCreating(true);
      try {
        const result = await createTask(formData);
        if (result.data) {
          setSuccess('Task created successfully');
          navigate('/tasks');
        }
      } catch (err) {
        setErrorMessage('Failed to create task');
      } finally {
        setIsCreating(false);
      }
    }
  };

  const getTaskOptions = () => {
    return (tasks || []).map((task: { id: string; title: string }) => (
      <SelectItem key={task.id} value={task.id}>
        {task.title}
      </SelectItem>
    ));
  };

  if (success) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="text-green-600">{success}</div>
        <Link to="/tasks" className="text-primary">Back to tasks</Link>
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

      {errorMessage && (
        <div className="text-destructive mb-4">{errorMessage}</div>
      )}

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
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    id="is_subtask"
                    checked={isSubtask}
                    onChange={(e) => {
                      setIsSubtask(e.target.checked);
                    }}
                    className="h-4 w-4 accent-primary"
                  />
                  <label htmlFor="is_subtask" className="text-sm font-medium">
                    Create as subtask
                  </label>
                </div>

                {isSubtask && (
                  <div className="mb-4">
                    <label htmlFor="parent_task" className="block text-sm font-medium mb-1">
                      Parent Task
                    </label>
                    <Select value={subtaskParentId} onValueChange={(value) => {
                      setSubtaskParentId(value);
                      setFormData(prev => ({ ...prev, parent_task_id: value }));
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent task..." />
                      </SelectTrigger>
                      <SelectContent>
                        {tasksLoading && <SelectItem value="loading">Loading...</SelectItem>}
                        {getTaskOptions()}
                      </SelectContent>
                    </Select>
                    {errors.parent_task_id && (
                      <p className="text-xs text-destructive mt-1">{errors.parent_task_id}</p>
                    )}
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Dependencies</label>
                  {dependencies.length === 0 && (
                    <Button type="button" variant="outline" size="sm" onClick={handleAddDependency}>
                      Add Dependency
                    </Button>
                  )}

                  <div className="space-y-2">
                    {dependencies.map((dep) => (
                      <div key={dep.id} className="flex gap-2 items-center">
                        <Select
                          value={dep.predecessor_task_id}
                          onValueChange={(value) => handleDependencyChange(dep.id, 'predecessor_task_id', value)}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select task..." />
                          </SelectTrigger>
                          <SelectContent>
                            {tasksLoading && <SelectItem value="loading">Loading...</SelectItem>}
                            {getTaskOptions()}
                          </SelectContent>
                        </Select>
                        <Select
                          value={dep.dependency_type}
                          onValueChange={(value) => handleDependencyChange(dep.id, 'dependency_type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="finish_to_start">Finish to Start</SelectItem>
                            <SelectItem value="start_to_start">Start to Start</SelectItem>
                            <SelectItem value="finish_to_finish">Finish to Finish</SelectItem>
                            <SelectItem value="start_to_finish">Start to Finish</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button type="button" variant="outline" size="sm" onClick={() => handleRemoveDependency(dep.id)}>
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>

                  {dependencies.length > 0 && (
                    <div className="mt-2">
                      <Button type="button" variant="outline" size="sm" onClick={handleAddDependency}>
                        Add Another Dependency
                      </Button>
                    </div>
                  )}

                  {errors.dependencies && (
                    <p className="text-xs text-destructive mt-1">{errors.dependencies}</p>
                  )}
                </div>
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
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating ? 'Creating...' : isUpdating ? 'Updating...' : (isEdit ? 'Update Task' : 'Create Task')}
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
