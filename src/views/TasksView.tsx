import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetTasksQueryTyped } from '@/api/tasksApi';
import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';

type ViewMode = 'list' | 'kanban';

function TaskCard({ task }: { task: { id: string; title: string; status: string; description?: string; due_date?: string } }) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'secondary';
      case 'in_progress':
        return 'default';
      case 'cancelled':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Link
      to={`/tasks/${task.id}`}
      className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{task.title}</span>
        <Badge variant={getStatusVariant(task.status)}>
          {task.status}
        </Badge>
      </div>
      {task.description && (
        <p className="text-sm text-muted-foreground mt-2 truncate">{task.description}</p>
      )}
      {task.due_date && (
        <p className="text-xs text-muted-foreground mt-1">Due: {new Date(task.due_date).toLocaleDateString()}</p>
      )}
    </Link>
  );
}

export function TasksView() {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const { data: tasks, isLoading } = useGetTasksQueryTyped('');

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <Skeleton className="h-8 w-32 mb-4" size="sm" />
        <Skeleton className="h-64 w-full" />
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setViewMode('kanban')}>
            Kanban Board
          </Button>
          <Button onClick={() => (window.location.href = '/tasks/new')}>
            New Task
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(tasks || []).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
