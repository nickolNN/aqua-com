import type { Task } from '@/types/entities';

function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }
  );
}

function generateDate(daysAgo: number, rangeDays: number = 30): string {
  const now = new Date();
  const baseDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  const randomOffset = Math.floor(Math.random() * rangeDays * 24 * 60 * 60 * 1000);
  const date = new Date(baseDate.getTime() + randomOffset);
  return date.toISOString();
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

const taskTitles = [
  'Review project proposal',
  'Prepare presentation',
  'Update documentation',
  'Schedule meeting',
  'Fix critical bug',
  'Deploy to production',
  'Write unit tests',
  'Code review',
  'Design review',
  'Analyze requirements',
  'Create wireframes',
  'Run performance tests',
  'Optimize database queries',
  'Refactor API endpoints',
  'Update dependencies',
  'Setup CI/CD pipeline',
  'Implement user auth',
  'Build dashboard',
  'Write integration tests',
  'Configure monitoring',
  'Prepare release notes',
  'Create migration script',
  'Optimize frontend build',
  'Set up staging environment',
  'Review security logs',
];

export function generateTask(position?: number): Task {
  const title = randomChoice(taskTitles);

  const statuses: Array<'open' | 'in_progress' | 'completed' | 'cancelled'> = ['open', 'in_progress', 'completed', 'cancelled'];
  const priorities: Array<'low' | 'medium' | 'high' | 'urgent'> = ['low', 'medium', 'high', 'urgent'];

  const status = randomChoice(statuses);
  const priority = randomChoice(priorities);

  return {
    id: generateUuid(),
    title,
    description: `Description for task: ${title}`,
    status,
    priority,
    // Always set: the e2e suite opens the first seeded card and asserts its due date.
    due_date: generateDate(1, 30),
    assigned_to: Math.random() > 0.3 ? generateUuid() : undefined,
    parent_task_id: Math.random() > 0.7 ? generateUuid() : undefined,
    subtask_count: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0,
    dependencies: Math.random() > 0.6 ? [{
      predecessor_task_id: generateUuid(),
      successor_task_id: generateUuid(),
      dependency_type: randomChoice(['finish_to_start', 'start_to_start', 'finish_to_finish', 'start_to_finish']),
    }] : [],
    position: position ?? randomInt(0, 100),
    created_by: generateUuid(),
    created_at: generateDate(Math.floor(Math.random() * 90)),
    updated_at: generateDate(Math.floor(Math.random() * 30)),
  };
}

export function generateTasks(count: number = 10): Task[] {
  return Array.from({ length: count }, (_, i) => generateTask(i));
}
