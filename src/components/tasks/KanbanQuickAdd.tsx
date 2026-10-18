import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface KanbanQuickAddProps {
  /** Called with the trimmed task title; the parent owns the RTK mutation. */
  onSubmit: (title: string) => Promise<void>;
}

/**
 * Inline quick-add for a kanban column header (stage 25).
 * Closed: the original "+ Add Task" button — text and selector preserved.
 * Open: an inline Input + submit; on success the title is cleared and the
 * form stays open so several tasks can be added in a row.
 */
export function KanbanQuickAdd({ onSubmit }: KanbanQuickAddProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(trimmed);
      setTitle(''); // success — ready for the next task
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        + Add Task
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
      <Input
        data-testid="kanban-quick-add"
        aria-label="New task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={() => {
          if (!title.trim()) setOpen(false);
        }}
        placeholder="Task title"
        className="h-9"
      />
      <Button type="submit" size="sm" disabled={submitting || !title.trim()}>
        Add
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => {
          setOpen(false);
          setTitle('');
        }}
      >
        Cancel
      </Button>
    </form>
  );
}
