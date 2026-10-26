import { useState } from 'react';
import { useGetTaskQuery, useDeleteTaskMutation } from '@/api/tasksApi';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import type { TaskDependency } from '@/types/entities';

interface TaskDetailModalProps {
  /** The task to display. */
  taskId: string;
  /** Called after a successful delete (dialog closes, caller navigates to the board). */
  onDeleted: () => void;
  /** Called on close (X / Esc / backdrop / Cancel). */
  onCancel: () => void;
  /** Opens another task's details — parent/dependency modal-swap links. */
  onOpenTask: (taskId: string) => void;
  /** Opens the edit modal for this task. */
  onEdit: () => void;
}

/**
 * Task details rendered inside the shared Dialog primitive (URL-linked:
 * /tasks?task=<id>). Extracted from the old full-page TaskDetailView:
 * same fields, plus parent/dependency links that swap the modal's content
 * instead of navigating to a page. Loading and error states live inside
 * the dialog; delete is a nested ConfirmDialog.
 */
export function TaskDetailModal({ taskId, onDeleted, onCancel, onOpenTask, onEdit }: TaskDetailModalProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: task, isLoading, error } = useGetTaskQuery(taskId);
  const [deleteTask] = useDeleteTaskMutation();

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteTask(taskId).unwrap();
      onDeleted();
    } catch {
      setDeleteError('Failed to delete task');
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onCancel(); }}>
      <DialogContent>
        {isLoading ? (
          <>
            <DialogHeader>
              <DialogTitle>Loading task…</DialogTitle>
              <DialogDescription>Fetching task details</DialogDescription>
            </DialogHeader>
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-40 w-full" />
          </>
        ) : !task || error ? (
          <>
            <DialogHeader>
              <DialogTitle>Task not found</DialogTitle>
              <DialogDescription>Failed to load task</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={onCancel}>
                Close
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{task.title}</DialogTitle>
              <DialogDescription>
                Created {new Date(task.created_at).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-2 mb-4">
              <Badge value={task.status}>{task.status}</Badge>
              <Badge value={task.priority}>
                {task.priority}
              </Badge>
            </div>

            {task.description && (
              <div className="text-sm text-muted-foreground mb-4">
                {task.description}
              </div>
            )}

            <dl className="grid grid-cols-2 gap-4">
              {task.due_date && (
                <div>
                  <dt className="text-sm text-muted-foreground">Due Date</dt>
                  <dd className="text-base">
                    {new Date(task.due_date).toLocaleDateString()}
                  </dd>
                </div>
              )}
              {task.assigned_to && (
                <div>
                  <dt className="text-sm text-muted-foreground">Assigned To</dt>
                  <dd className="text-base">{task.assigned_to}</dd>
                </div>
              )}
              {task.created_by && (
                <div>
                  <dt className="text-sm text-muted-foreground">Created By</dt>
                  <dd className="text-base">{task.created_by}</dd>
                </div>
              )}
              {task.parent_task_id && (
                <div>
                  <dt className="text-sm text-muted-foreground">Parent Task</dt>
                  <dd className="text-base">
                    <button
                      type="button"
                      onClick={() => onOpenTask(task.parent_task_id!)}
                      className="text-primary hover:text-primary/80 bg-transparent"
                    >
                      View parent task
                    </button>
                  </dd>
                </div>
              )}
              {task.subtasks && task.subtasks.length > 0 && (
                <div className="col-span-2">
                  <dt className="text-sm text-muted-foreground">Subtasks</dt>
                  <dd className="text-base">
                    <ul className="space-y-1">
                      {task.subtasks.map((subtask) => (
                        <li key={subtask.id} className="text-sm text-muted-foreground">
                          <span className="mr-2">
                            <Badge value={subtask.status}>{subtask.status}</Badge>
                          </span>
                          <span className="text-muted-foreground">{subtask.title}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {task.dependencies?.length > 0 && (
                <div className="col-span-2">
                  <dt className="text-sm text-muted-foreground">Dependencies</dt>
                  <dd className="text-base">
                    <ul className="space-y-1">
                      {task.dependencies.map((dep: TaskDependency, index) => (
                        <li key={`${dep.predecessor_task_id}-${dep.dependency_type}-${index}`} className="text-sm text-muted-foreground">
                          <button
                            type="button"
                            onClick={() => onOpenTask(dep.predecessor_task_id)}
                            className="text-primary hover:text-primary/80 bg-transparent"
                          >
                            {dep.dependency_type} - {dep.predecessor_task_id}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>

            {deleteError && (
              <div className="text-destructive mb-4">{deleteError}</div>
            )}

            <DialogFooter>
              <Button variant="destructive" disabled={isDeleting} onClick={() => setShowDeleteConfirm(true)}>
                Delete
              </Button>
              <Button onClick={onEdit}>
                Edit Task
              </Button>
            </DialogFooter>
          </>
        )}

        <ConfirmDialog
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
          title="Delete Task"
          description="Are you sure you want to delete this task? This action cannot be undone."
          confirmLabel="Delete"
        />
      </DialogContent>
    </Dialog>
  );
}
