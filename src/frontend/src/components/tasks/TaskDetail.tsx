import { Badge } from '@/components/ui/Badge';
import type { Task } from '@/types/entities';

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white';
      case 'in_progress': return 'bg-yellow-500 text-white';
      case 'cancelled': return 'bg-gray-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
      </div>

      <div className="flex gap-2">
        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
      </div>

      {task.description && (
        <div className="text-sm text-gray-700">
          {task.description}
        </div>
      )}

      <div className="space-y-2 text-sm">
        {task.due_date && (
          <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
        )}
        {task.assigned_to && (
          <p>Assigned to: {task.assigned_to}</p>
        )}
        {task.created_by && (
          <p>Created by: {task.created_by}</p>
        )}
      </div>

      {task.dependencies?.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Dependencies</h4>
          <ul className="space-y-1">
            {task.dependencies.map((dep, i) => (
              <li key={i} className="text-sm text-gray-600">
                {dep.dependency_type} - {dep.predecessor_task_id}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}