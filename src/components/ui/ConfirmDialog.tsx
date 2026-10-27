import { Button } from './Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './Dialog';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
}

/**
 * Delete/confirmation dialog built on the shared Dialog primitive, so it
 * renders the same glass panel, blurred backdrop, entry animation, focus
 * trap and Esc-to-close behaviour as every other modal. `max-w-md` keeps
 * the confirm panel narrower than the content dialogs.
 */
export function ConfirmDialog({ isOpen, onClose, onConfirm, title, description, confirmLabel = 'Confirm' }: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent data-testid="confirm-dialog" className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
