import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetTasksQueryTyped } from '@/api/tasksApi';
import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { TaskDetailModal } from '@/components/tasks/TaskDetailModal';
import { TaskFormModal } from '@/components/tasks/TaskFormModal';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

export function TasksView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get('task');
  const editMode = searchParams.get('edit') !== null;
  // URL-linked modal state: ?new → create modal, ?task=<id> → details
  // modal, ?task=<id>&edit → edit modal. `task` wins over `new`.
  const createModalOpen = searchParams.get('new') !== null && !taskId;
  const detailModalOpen = !!taskId && !editMode;
  const editModalOpen = !!taskId && editMode;

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
        <Button onClick={() => navigate('/tasks?new')}>
          New Task
        </Button>
      </div>
      <KanbanBoard
        tasks={tasks || []}
        onTaskClick={(id) => {
          navigate(`/tasks?task=${id}`);
        }}
      />
      {createModalOpen && (
        <TaskFormModal
          onDone={() => navigate('/tasks')}
          onCancel={() => navigate('/tasks')}
        />
      )}
      {detailModalOpen && (
        <TaskDetailModal
          key={taskId}
          taskId={taskId}
          onDeleted={() => navigate('/tasks')}
          onCancel={() => navigate('/tasks')}
          onOpenTask={(id) => navigate(`/tasks?task=${id}`)}
          onEdit={() => navigate(`/tasks?task=${taskId}&edit`)}
        />
      )}
      {editModalOpen && (
        <TaskFormModal
          key={`edit-${taskId}`}
          taskId={taskId}
          onDone={() => navigate(`/tasks?task=${taskId}`)}
          onCancel={() => navigate(`/tasks?task=${taskId}`)}
        />
      )}
    </div>
  );
}
