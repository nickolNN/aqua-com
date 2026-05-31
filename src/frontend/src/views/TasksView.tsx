import { useState } from 'react';
import { useGetTasksQueryTyped } from '@/api/tasksApi';
import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { TaskDetail } from '@/components/tasks/TaskDetail';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Button } from '@/components/ui/Button';
import type { Task, TaskCreateInput } from '@/types/entities';

type ViewMode = 'list' | 'kanban' | 'form';
type SelectedView = 'list' | 'detail';

export function TasksView() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedView, setSelectedView] = useState<SelectedView>('list');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const { data: tasks, isLoading } = useGetTasksQueryTyped('');

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setSelectedView('detail');
  };

  const handleTaskClose = () => {
    setSelectedView('list');
    setSelectedTaskId(null);
  };

  const handleNewTask = (data: TaskCreateInput) => {
    // In a real app, this would call the API
    console.log('New task:', data);
    setSelectedView('list');
    setViewMode('list');
  };

  const handleCancelNewTask = () => {
    setViewMode('list');
  };

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
        <KanbanBoard tasks={tasks || []} onTaskClick={handleTaskClick} />
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
          <Button onClick={() => setViewMode('form')}>
            New Task
          </Button>
        </div>
      </div>

      {selectedView === 'detail' && selectedTaskId ? (
        <div className="max-w-4xl">
          <Button variant="link" onClick={handleTaskClose} className="mb-4">
            ← Back to list
          </Button>
          {(tasks || []).filter((task: Task) => task.id === selectedTaskId).map((task: Task) => {
            return (
              <div key={task.id}>
                <TaskDetail task={task} onClose={handleTaskClose} />
              </div>
            );
          })}
        </div>
      ) : viewMode === 'form' ? (
        <div className="max-w-2xl">
          <Button variant="link" onClick={handleCancelNewTask} className="mb-4">
            ← Back to list
          </Button>
          <TaskForm onSubmit={handleNewTask} onCancel={handleCancelNewTask} />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(tasks || []).map((task: Task) => (
              <div key={task.id} className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleTaskClick(task.id)}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{task.title}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    task.status === 'completed' ? 'bg-green-500 text-white' :
                    task.status === 'in_progress' ? 'bg-yellow-500 text-white' :
                    task.status === 'cancelled' ? 'bg-gray-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>{task.status}</span>
                </div>
                {task.description && (
                  <p className="text-sm text-gray-600 mt-2 truncate">{task.description}</p>
                )}
                {task.due_date && (
                  <p className="text-xs text-gray-500 mt-1">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}