import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetTasksQueryTyped } from '@/api/tasksApi';
import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { Button } from '@/components/ui/Button';

type ViewMode = 'list' | 'kanban';

function TaskCard({ task }: { task: { id: string; title: string; status: string; description?: string; due_date?: string } }) {
  return (
    <Link
      to={`/tasks/${task.id}`}
      className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{task.title}</span>
        <span
          className={`text-xs px-2 py-1 rounded ${
            task.status === 'completed'
              ? 'bg-green-500 text-white'
              : task.status === 'in_progress'
                ? 'bg-yellow-500 text-white'
                : task.status === 'cancelled'
                  ? 'bg-gray-500 text-white'
                  : 'bg-blue-500 text-white'
          }`}
        >
          {task.status}
        </span>
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 mt-2 truncate">{task.description}</p>
      )}
      {task.due_date && (
        <p className="text-xs text-gray-500 mt-1">Due: {new Date(task.due_date).toLocaleDateString()}</p>
      )}
    </Link>
  );
}

export function TasksView() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { data: tasks, isLoading } = useGetTasksQueryTyped('');

  if (isLoading) {
    return <div>Loading tasks...</div>;
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
