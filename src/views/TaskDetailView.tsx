import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetTaskQuery, useDeleteTaskMutation } from '@/api/tasksApi';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

interface TaskDependency {
  predecessor_task_id: string;
  successor_task_id: string;
  dependency_type: string;
}

export function TaskDetailView() {
  const { id } = useParams<{ id: string }>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: task, isLoading, error: taskError } = useGetTaskQuery(id || '');

  const [deleteTask] = useDeleteTaskMutation();

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteTask(id).unwrap();
        setSuccess('Task deleted successfully');
        setShowDeleteConfirm(false);
      } catch (err) {
        setError('Failed to delete task');
      }
      window.location.href = '/tasks';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-40 w-full mb-2" />
      </div>
    );
  }

  if (!task || taskError) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="text-destructive">Failed to load task</div>
        <Link to="/tasks" className="text-primary">Back to tasks</Link>
      </div>
    );
  }

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
      {error && (
        <div className="text-destructive mb-4">{error}</div>
      )}
      <div className="mb-6 flex items-center">
        <Link to="/tasks" className="text-primary hover:text-primary/80 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="ml-3 text-2xl font-bold">Task Details</h1>
        <div className="flex-1" />
        <Link to={`/tasks/${id}`}><Button>Edit Task</Button></Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription className="flex gap-2">
            <Badge value={task.status}>{task.status}</Badge>
            <Badge value={task.priority}>
              {task.priority}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {task.description && (
            <div className="text-sm text-muted-foreground mb-4">
              {task.description}
            </div>
          )}

          <dl className="grid grid-cols-2 gap-4">
            {task.due_date && (
              <div>
                <dt className="text-sm text-muted-foreground">Due Date</dt>
                <dd className="text-base">
                  {new Date(task.due_date).toLocaleDateString()}
                </dd>
              </div>
            )}
            {task.assigned_to && (
              <div>
                <dt className="text-sm text-muted-foreground">Assigned To</dt>
                <dd className="text-base">{task.assigned_to}</dd>
              </div>
            )}
            {task.created_by && (
              <div>
                <dt className="text-sm text-muted-foreground">Created By</dt>
                <dd className="text-base">{task.created_by}</dd>
              </div>
            )}
            {task.parent_task_id && (
              <div>
                <dt className="text-sm text-muted-foreground">Parent Task</dt>
                <dd className="text-base">
                  <Link to={`/tasks/${task.parent_task_id}`} className="text-primary hover:text-primary/80">
                    View parent task
                  </Link>
                </dd>
              </div>
            )}
            {task.subtasks && task.subtasks.length > 0 && (
              <div className="col-span-2">
                <dt className="text-sm text-muted-foreground">Subtasks</dt>
                <dd className="text-base">
                  <ul className="space-y-1">
                    {task.subtasks.map((subtask) => (
                      <li key={subtask.id} className="text-sm text-muted-foreground">
                        <span className={`mr-2`}>
                          <Badge value={subtask.status}>{subtask.status}</Badge>
                        </span>
                        <span className="text-muted-foreground">{subtask.title}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            {task.dependencies?.length > 0 && (
              <div className="col-span-2">
                <dt className="text-sm text-muted-foreground">Dependencies</dt>
                <dd className="text-base">
                  <ul className="space-y-1">
                    {task.dependencies.map((dep: TaskDependency) => (
                      <li key={`${dep.predecessor_task_id}-${dep.dependency_type}`} className="text-sm text-muted-foreground">
                        <Link to={`/tasks/${dep.predecessor_task_id}`} className="text-primary hover:text-primary/80">
                          {dep.dependency_type} - {dep.predecessor_task_id}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Created: {new Date(task.created_at).toLocaleString()}
            </div>
            <div className="flex gap-2">
              <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmLabel="Delete"
      />
    </div>
  );
}
