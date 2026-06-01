import { useParams, Link } from 'react-router-dom';
import { useGetTaskQueryTyped } from '@/api/tasksApi';
import { Badge } from '@/components/ui/Badge';
import type { TaskDependency } from '@/types/entities';

export function TaskDetailView() {
  const { id } = useParams<{ id: string }>();

  const { data: task, isLoading } = useGetTaskQueryTyped(id || '');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'in_progress':
        return 'bg-yellow-500 text-white';
      case 'cancelled':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading task details...</div>;
  }

  if (!task) {
    return (
      <div className="p-6">
        <div className="text-red-500">Failed to load task</div>
        <Link to="/tasks" className="text-blue-600">Back to tasks</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center">
        <Link to="/tasks" className="text-blue-600 hover:text-blue-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="ml-3 text-2xl font-bold">Task Details</h1>
        <div className="flex-1" />
        <Link
          to={`/tasks/${id}/`}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Edit Task
        </Link>
      </div>

      <div className="bg-white border rounded-md p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">{task.title}</h2>

          <div className="flex gap-2 mb-4">
            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>

          {task.description && (
            <div className="text-sm text-gray-700 mb-4">
              {task.description}
            </div>
          )}

          <dl className="grid grid-cols-2 gap-4">
            {task.due_date && (
              <div>
                <dt className="text-sm text-gray-500">Due Date</dt>
                <dd className="text-base">
                  {new Date(task.due_date).toLocaleDateString()}
                </dd>
              </div>
            )}
            {task.assigned_to && (
              <div>
                <dt className="text-sm text-gray-500">Assigned To</dt>
                <dd className="text-base">{task.assigned_to}</dd>
              </div>
            )}
            {task.created_by && (
              <div>
                <dt className="text-sm text-gray-500">Created By</dt>
                <dd className="text-base">{task.created_by}</dd>
              </div>
            )}
            {task.dependencies?.length > 0 && (
              <div className="col-span-2">
                <dt className="text-sm text-gray-500">Dependencies</dt>
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
        </div>
      </div>
    </div>
  );
}
