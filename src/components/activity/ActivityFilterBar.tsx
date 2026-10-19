import { ACTIVITY_TYPES, type ActivityType } from '@/api/activitiesApi';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/Select';

type SortKey = 'date' | 'type' | 'title';

interface ActivityFilterBarProps {
  type: ActivityType | undefined;
  sort: SortKey;
  onTypeChange: (type: ActivityType | undefined) => void;
  onSortChange: (sort: SortKey) => void;
}

export default function ActivityFilterBar({
  type,
  sort,
  onTypeChange,
  onSortChange,
}: ActivityFilterBarProps) {
  return (
    <div className="mb-4 flex gap-4">
      <Select
        value={type ?? 'all'}
        onValueChange={(value) =>
          onTypeChange(value === 'all' ? undefined : (value as ActivityType))
        }
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {ACTIVITY_TYPES.map((item) => (
            <SelectItem key={item} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sort}
        onValueChange={(value) => onSortChange(value as SortKey)}
      >
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="type">Type</SelectItem>
          <SelectItem value="title">Title</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
