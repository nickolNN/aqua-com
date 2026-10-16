// =====================================================
// Activity Timeline View
// =====================================================
import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetActivitiesQuery } from '@/api/activitiesApi';
import type { ActivityType } from '@/api/activitiesApi';
import ActivityTimeline from '@/components/activity/ActivityTimeline';
import ActivityFilterBar from '@/components/activity/ActivityFilterBar';
import ActivityForm from '@/components/activity/ActivityForm';
import { Button } from '@/components/ui/Button';

export function ActivitiesView() {
  const { contactId } = useParams();
  void contactId;
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'type' | 'title'>('date');
  const [filterType, setFilterType] = useState<ActivityType | undefined>(undefined);

  const { data: activitiesData, isLoading, error } = useGetActivitiesQuery({
    page: 1,
    limit: 50,
    search: '',
  });

  const filteredActivities = useMemo(() => {
    const activities = activitiesData?.activities || [];
    if (!activities.length) return [];
    let filtered = [...activities];
    if (filterType) {
      filtered = filtered.filter((a) => a.type === filterType);
    }
    return filtered;
  }, [activitiesData, filterType]);

  const sortedActivities = useMemo(() => {
    const sorted = [...filteredActivities];
    if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'type') {
      sorted.sort((a, b) => a.type.localeCompare(b.type));
    } else if (sortBy === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  }, [filteredActivities, sortBy]);

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">
          Error: {typeof error === 'string' ? error : 'Failed to load activities'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Activity Timeline</h1>
        <Button size="sm" onClick={() => setShowForm(true)}>
          New Activity
        </Button>
      </div>

      <ActivityFilterBar
        type={filterType}
        sort={sortBy}
        onTypeChange={(type) => setFilterType(type)}
        onSortChange={(sort) => setSortBy(sort)}
      />

      <ActivityTimeline
        activities={sortedActivities}
        loading={isLoading}
      />

      {showForm && (
        <ActivityForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
