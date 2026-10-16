import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetTasksQueryTyped } from '@/api/tasksApi';
import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';

type ViewMode = 'list' | 'kanban';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    status: string;
    priority?: string;
    description?: string;
    due_date?: string;
  };
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <Link to={`/tasks/${task.id}`} className="block">
      <Card className="p-4 transition-shadow hover:shadow-md">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">{task.title}</span>
          <Badge variant="status" value={task.status}>
            {task.status}
          </Badge>
        </div>
        {task.description && (
          <p className="mt-2 text-sm text-muted-foreground truncate">{task.description}</p>
        )}
        {(task.priority || task.due_date) && (
          <div className="mt-2 flex items-center gap-2">
            {task.priority && (
              <Badge variant="priority" value={task.priority}>
                {task.priority}
              </Badge>
            )}
            {task.due_date && (
              <span className="text-xs text-muted-foreground">
                Due: {new Date(task.due_date).toLocaleDateString()}
              </span>
            )}
          </div>
        )}
      </Card>
    </Link>
  );
}

export function TasksView() {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: tasks, isLoading, error } = useGetTasksQueryTyped(searchTerm);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <Skeleton className="h-8 w-32 mb-4" size="sm" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">
          Error: {typeof error === 'string' ? error : 'Failed to load tasks'}
        </div>
      </div>
    );
  }

  if (viewMode === 'kanban') {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <Button variant="outline" onClick={() => setViewMode('list')}>
            Back to List
          </Button>
        </div>
        <KanbanBoard tasks={tasks || []} onTaskClick={(taskId) => window.location.href = `/tasks/${taskId}`} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setViewMode('kanban')}>
            Kanban Board
          </Button>
          <Button as="a" href="/tasks/new">
            New Task
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tasks list */}
      <div className="space-y-4">
        {(tasks || []).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(tasks || []).map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-muted-foreground">
            No tasks found. Create one to get started.
          </Card>
        )}
      </div>
    </div>
  );
}
