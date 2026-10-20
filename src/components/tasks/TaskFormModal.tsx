import { useState, useEffect, type FormEvent } from 'react';
import { useGetTasksQuery } from '@/api/tasksApi';
import { useCreateTaskMutation, useUpdateTaskMutation } from '@/api/tasksApi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/Select';
import type { TaskCreateInput } from '@/types/entities';

interface TaskFormModalProps {
  /** When present the modal edits this task; absent → create mode. */
  taskId?: string;
  /** Called after a successful create/update (dialog closes, caller navigates). */
  onDone: () => void;
  /** Called on Cancel / Esc / backdrop close. */
  onCancel: () => void;
}

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

/**
 * Task creation/edit form rendered inside the shared Dialog primitive.
 * Extracted from the old full-page TaskForm view: same fields, validation
 * and mutations, but no router imports and no full-page success screen —
 * success just calls onDone().
 */
export function TaskFormModal({ taskId, onDone, onCancel }: TaskFormModalProps) {
  const isEdit = !!taskId;
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
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
    if (isEdit && taskId) {
      const task = tasks?.find((t: { id: string }) => t.id === taskId);
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
        // Prefill the dependency editor with the task's existing dependencies
        // so saving an untouched form preserves them (the editor state is the
        // source of truth for the submitted payload).
        setDependencies(
          (task.dependencies || []).map((dep, index) => ({
            predecessor_task_id: dep.predecessor_task_id,
            dependency_type: dep.dependency_type,
            // Row index keeps ids unique when two identical dependencies
            // (same predecessor + same type) exist — a shared id would make
            // removing one row remove both.
            id: `${dep.predecessor_task_id}-${dep.dependency_type}-${index}`,
          })),
        );
      }
    }
  }, [tasks, isEdit, taskId]);

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
    setErrorMessage(null);
    if (!validate()) return;

    // The dependency editor's local state is the source of truth for the
    // submitted dependencies (formData's copy is only the prefill).
    const payload: TaskCreateInput = {
      ...formData,
      dependencies: dependencies
        .filter((d) => d.predecessor_task_id.trim())
        .map((d) => ({
          predecessor_task_id: d.predecessor_task_id,
          dependency_type: d.dependency_type,
        })),
    };

    if (isEdit) {
      setIsUpdating(true);
      try {
        const result = await updateTask({ id: taskId as string, data: payload });
        if (result.data) {
          onDone();
        }
      } catch {
        setErrorMessage('Failed to update task');
      } finally {
        setIsUpdating(false);
      }
    } else {
      setIsCreating(true);
      try {
        const result = await createTask(payload);
        if (result.data) {
          onDone();
        }
      } catch {
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

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onCancel(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Task' : 'Create Task'}</DialogTitle>
          <DialogDescription>Fill in the task details</DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <div className="text-destructive mb-4">{errorMessage}</div>
        )}

        {/* noValidate: the form's own validation messages are the source of truth
            (the browser's native required/email checks would swallow invalid submits). */}
        <form noValidate onSubmit={handleSubmit}>
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
                <SelectTrigger aria-label="Priority">
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
                <SelectTrigger aria-label="Status">
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
                <p className="block text-sm font-medium mb-2">Dependencies</p>
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
          <DialogFooter>
            <div className="flex gap-4">
              <Button type="submit" disabled={isCreating || isUpdating}>
                {isCreating ? 'Creating...' : isUpdating ? 'Updating...' : (isEdit ? 'Update Task' : 'Create Task')}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
