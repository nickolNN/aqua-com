// =====================================================
// Activity Filter Bar Component
// =====================================================
import { ACTIVITY_TYPES, type ActivityType } from '@/api/activitiesApi';

interface ActivityFilterBarProps {
  onTypeChange?: (type: ActivityType) => void;
  onSortChange?: (sort: 'date' | 'type' | 'title') => void;
}

export default function ActivityFilterBar({
  onTypeChange,
  onSortChange,
}: ActivityFilterBarProps) {
  return (
    <div className="flex gap-4 mb-4">
      <div>
        <select onChange={(e) => onTypeChange?.(e.target.value as ActivityType)} className="px-2 py-1 border rounded">
          <option value="">All Types</option>
          {ACTIVITY_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <select onChange={(e) => onSortChange?.(e.target.value as 'date' | 'type' | 'title')}>
          <option value="date">Sort by Date</option>
          <option value="type">Sort by Type</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>
    </div>
  );
}
