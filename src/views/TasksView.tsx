import { useGetTasksQueryTyped } from '@/api/tasksApi';
import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

export function TasksView() {
  const { data: tasks, isLoading, error } = useGetTasksQueryTyped('');

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

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <Button as="a" href="/tasks/new">
          New Task
        </Button>
      </div>
      <KanbanBoard
        tasks={tasks || []}
        onTaskClick={(taskId) => {
          window.location.href = `/tasks/${taskId}/details`;
        }}
      />
    </div>
  );
}
