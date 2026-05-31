import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Task } from '@/types/entities';

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
  const columns: KanbanColumn[] = ['open', 'in_progress', 'completed', 'cancelled'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
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
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column);

          return (
            <div key={column} className={`rounded-lg p-3 ${columnColors[column]}`}>
              <h3 className="font-medium mb-3">{columnLabels[column]}</h3>

              {columnTasks.map((task) => (
                <div key={task.id} className="mb-2">
                  <Card className="p-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onTaskClick(task.id)}>
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