import { Badge } from '@/components/ui/Badge';
import type { Task, TaskSubtask, TaskDependency } from '@/types/entities';

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">×</button>
      </div>

      <div className="flex gap-2">
        <Badge variant="status" value={task.status}>{task.status}</Badge>
        <Badge variant="priority" value={task.priority}>{task.priority}</Badge>
      </div>

      {task.description && (
        <div className="text-sm text-muted-foreground">
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

      {task.parent_task_id && (
        <div>
          <h4 className="font-medium mb-2">Parent Task</h4>
          <p className="text-sm text-muted-foreground">{task.parent_task_id}</p>
        </div>
      )}

      {task.subtasks && task.subtasks.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Subtasks</h4>
          <ul className="space-y-2">
            {task.subtasks.map((subtask: TaskSubtask) => (
              <li key={subtask.id} className="text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Badge variant="status" value={subtask.status}>
                    {subtask.status}
                  </Badge>
                  <span>{subtask.title}</span>
                  {subtask.priority && (
                    <Badge variant="priority" value={subtask.priority}>
                      {subtask.priority}
                    </Badge>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {task.dependencies?.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Dependencies</h4>
          <ul className="space-y-1">
            {task.dependencies.map((dep: TaskDependency) => (
              <li key={`${dep.predecessor_task_id}-${dep.dependency_type}`} className="text-sm text-muted-foreground">
                {dep.dependency_type} - {dep.predecessor_task_id}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
