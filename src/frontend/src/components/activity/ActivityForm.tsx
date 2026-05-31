// =====================================================
// Activity Form Component
// =====================================================
import { useForm } from 'react-hook-form';
import { useCreateActivityMutation } from '@/api/activitiesApi';
import { ACTIVITY_TYPES, type ActivityType } from '@/api/activitiesApi';

interface ActivityFormData {
  type: ActivityType;
  title: string;
  description?: string;
  contact_id?: string;
  company_id?: string;
  date: string;
  duration?: number;
}

interface ActivityFormProps {
  onClose: () => void;
}

export default function ActivityForm({ onClose }: ActivityFormProps) {
  const { register, handleSubmit, reset } = useForm<ActivityFormData>();
  const [createActivity] = useCreateActivityMutation();

  const onSubmit = async (data: ActivityFormData) => {
    try {
      await createActivity(data).unwrap();
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to create activity:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Create Activity</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <select {...register('type', { required: 'Activity type is required' })}>
              <option value="">Select type</option>
              {ACTIVITY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <input {...register('title', { required: 'Title is required' })} placeholder="Title" />
          <textarea {...register('description')} placeholder="Description" />
          <input {...register('date', { required: 'Date is required' })} type="date" />
          <input {...register('duration')} type="number" placeholder="Duration (minutes)" />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Create
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
