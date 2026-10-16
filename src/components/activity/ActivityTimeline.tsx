// =====================================================
// Activity Timeline Component
// =====================================================
import type { ActivitySchema } from '@/mock-data/schemas';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';

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
    return (
      <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" size="sm" />
          <Skeleton className="h-4 w-48" size="sm" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        No activities found. Create one to get started.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id} className="border-l-4 border-primary p-4">
          <div className="font-semibold flex items-center gap-2">
            <span>{ACTIVITY_TYPE_ICONS[activity.type] || '📋'}</span>
            <span>{activity.title}</span>
            <span className="text-sm text-muted-foreground text-xs">({activity.type})</span>
          </div>
          <div className="text-muted-foreground text-sm mt-1">
            {new Date(activity.date).toLocaleDateString()}
          </div>
          {activity.description && (
            <div className="text-foreground mt-2">{activity.description}</div>
          )}
          {activity.duration && (
            <div className="text-muted-foreground text-sm mt-2">Duration: {activity.duration} min</div>
          )}
        </Card>
      ))}
    </div>
  );
}
