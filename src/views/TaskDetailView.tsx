import { useParams, Link } from 'react-router-dom';
import { useGetTaskQueryTyped } from '@/api/tasksApi';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import type { TaskDependency } from '@/types/entities';

export function TaskDetailView() {
  const { id } = useParams<{ id: string }>();

  const { data: task, isLoading } = useGetTaskQueryTyped(id || '');

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-40 w-full mb-2" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="text-destructive">Failed to load task</div>
        <Link to="/tasks" className="text-primary">Back to tasks</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center">
        <Link to="/tasks" className="text-primary hover:text-primary/80 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="ml-3 text-2xl font-bold">Task Details</h1>
        <div className="flex-1" />
        <Link
          to={`/tasks/${id}/`}
        >
          <Button>Edit Task</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription className="flex gap-2">
            <Badge variant="status" value={task.status}>{task.status}</Badge>
            <Badge variant="priority" value={task.priority}>
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
            {task.dependencies?.length > 0 && (
              <div className="col-span-2">
                <dt className="text-sm text-muted-foreground">Dependencies</dt>
                <dd className="text-base">
                  <ul className="space-y-1">
                    {task.dependencies.map((dep: TaskDependency) => (
                      <li key={`${dep.predecessor_task_id}-${dep.dependency_type}`}>
                        {dep.dependency_type} - {dep.predecessor_task_id}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
