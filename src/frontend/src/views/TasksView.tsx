import { useGetTasksQuery } from '@/api/tasksApi';

export function TasksView() {
  const { data: tasks } = useGetTasksQuery('');

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1>Tasks</h1>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
