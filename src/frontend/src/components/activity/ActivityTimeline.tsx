// =====================================================
// Activity Timeline Component
// =====================================================
import type { ActivitySchema } from '@/mock-data/schemas';

interface ActivityTimelineProps {
  activities: ActivitySchema[];
  loading: boolean;
}

/** Activity type to icon mapping */
const ACTIVITY_TYPE_ICONS: Record<string, string> = {
  call: '📞',
  meeting: '📅',
  email: '📧',
  note: '📝',
  task: '✅',
  deal: '💼',
  other: '📋',
};

export default function ActivityTimeline({ activities, loading }: ActivityTimelineProps) {
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No activities found. Create one to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="border-l-4 border-blue-500 pl-4 py-2">
          <div className="font-semibold flex items-center gap-2">
            <span>{ACTIVITY_TYPE_ICONS[activity.type] || '📋'}</span>
            <span>{activity.title}</span>
            <span className="text-sm text-gray-500 text-xs">({activity.type})</span>
          </div>
          <div className="text-gray-600 text-sm">
            {new Date(activity.date).toLocaleDateString()}
          </div>
          {activity.description && (
            <div className="text-gray-700">{activity.description}</div>
          )}
          {activity.duration && (
            <div className="text-gray-500 text-sm">Duration: {activity.duration} min</div>
          )}
        </div>
      ))}
    </div>
  );
}
