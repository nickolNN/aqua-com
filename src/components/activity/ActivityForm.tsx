import { useState, type FormEvent } from 'react';
import { ACTIVITY_TYPES, type ActivityType } from '@/api/activitiesApi';
import { useCreateActivityMutation } from '@/api/activitiesApi';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal, ModalContent, ModalTitle } from '@/components/ui/Modal';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/Select';

interface ActivityFormProps {
  onClose: () => void;
}

interface FormErrors {
  type?: string;
  title?: string;
  date?: string;
}

export default function ActivityForm({ onClose }: ActivityFormProps) {
  const [createActivity] = useCreateActivityMutation();
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!type || type === 'none') {
      newErrors.type = 'Activity type is required';
    }
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!date) {
      newErrors.date = 'Date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createActivity({
        type: type as ActivityType,
        title,
        description,
        date,
        duration: duration ? Number(duration) : undefined,
      }).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to create activity:', error);
    }
  };

  return (
    <Modal open onOpenChange={(open) => { if (!open) onClose(); }}>
      <ModalContent>
        <ModalTitle>Create Activity</ModalTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="activity-type" className="block text-sm font-medium mb-1">
              Type *
            </label>
            <Select value={type}
              onValueChange={(value) => {
                setType(value);
                if (errors.type) setErrors((prev) => ({ ...prev, type: undefined }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Select type</SelectItem>
                {ACTIVITY_TYPES.map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-xs text-destructive mt-1">{errors.type}</p>
            )}
          </div>

          <div>
            <label htmlFor="activity-title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <Input
              id="activity-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              placeholder="Title"
              required
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-xs text-destructive mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="activity-description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="activity-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>

          <div>
            <label htmlFor="activity-date" className="block text-sm font-medium mb-1">
              Date *
            </label>
            <Input
              id="activity-date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
              }}
              required
              className={errors.date ? 'border-destructive' : ''}
            />
            {errors.date && (
              <p className="text-xs text-destructive mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <label htmlFor="activity-duration" className="block text-sm font-medium mb-1">
              Duration (minutes)
            </label>
            <Input
              id="activity-duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Duration (minutes)"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">Create</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
}
