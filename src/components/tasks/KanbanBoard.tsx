import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { updateTaskStatus } from '@/stores/tasksSlice';
import type { Task } from '@/types/entities';
import type { AppDispatch, RootState } from '@/store/store';

type KanbanColumn = 'open' | 'in_progress' | 'completed' | 'cancelled';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

const columnLabels: Record<KanbanColumn, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const columnColors: Record<KanbanColumn, string> = {
  open: 'bg-blue-50 dark:bg-blue-900/20',
  in_progress: 'bg-yellow-50 dark:bg-yellow-900/20',
  completed: 'bg-green-50 dark:bg-green-900/20',
  cancelled: 'bg-gray-50 dark:bg-gray-900/20',
};

export function KanbanBoard({ tasks, onTaskClick }: KanbanBoardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const storedTasks = useSelector((state: RootState) => state.tasks);
  const draggedTaskId = useRef<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleDragStart = (taskId: string, _e: React.DragEvent) => {
    draggedTaskId.current = taskId;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (column: KanbanColumn, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const taskId = draggedTaskId.current;
    if (!taskId) return;

    // Find task in current tasks list to get its current status
const task = storedTasks?.tasks?.find((task: Task) => task.id === taskId);
    if (!task) return;

    // Update local state
    dispatch(updateTaskStatus({ taskId, newStatus: column }));

    // Reset drag state
    draggedTaskId.current = null;
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Kanban Board</h2>
        <Button size="sm" variant="outline">
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {(['open', 'in_progress', 'completed', 'cancelled'] as KanbanColumn[]).map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column);

        return (
          <div
            key={column}
            className={`rounded-lg p-3 ${columnColors[column]}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(column, e)}
          >
            <h3 className="font-medium mb-3">{columnLabels[column]}</h3>

            {columnTasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(task.id, e)}
                className="mb-2"
              >
                <Card
                  className="p-3 cursor-grab hover:shadow-md transition-shadow active:cursor-grabbing"
                  onClick={() => onTaskClick(task.id)}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-medium">{task.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-2 truncate">{task.description}</p>
                  )}
                  {task.due_date && (
                    <p className="text-xs text-gray-500 mt-1">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  )}
                </Card>
              </div>
            ))}
          </div>
        );
      })}
      </div>
    </div>
  );
}
