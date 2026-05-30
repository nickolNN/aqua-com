import { useGetActivitiesQuery } from '@/api/activitiesApi';

export function ActivitiesView() {
  const { data: activities } = useGetActivitiesQuery('');

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1>Activities</h1>
      <ul>
        {activities?.map((activity) => (
          <li key={activity.id}>{activity.title}</li>
        ))}
      </ul>
    </div>
  );
}
