import {
  generateContact,
  generateContacts,
  generateCompany,
  generateCompanies,
  generateTask,
  generateTasks,
  generateActivity,
  generateActivities,
} from '../../mock-data/generators';
import { getStoredTasks, saveTasks } from '../../mock-data/persistence';

let mockMode = false;

export function setMockMode(enabled: boolean): void {
  mockMode = enabled;
}

export function isMockMode(): boolean {
  return mockMode;
}

export async function mockBaseQuery(
  request: { url: string; method?: string; body?: Record<string, unknown>; params?: Record<string, string> }
): Promise<{ data?: unknown; error?: unknown } | { data: unknown; error?: unknown }> {
  if (!mockMode) {
    return { error: 'Mock mode is disabled' };
  }

  const { url, method = 'GET', body: _body, params: _params } = request;

  try {
    const result = interceptMockRequest(url, { method, body: _body, params: _params });

    if (result === null || result === undefined) {
      return { error: 'No mock data found for request' };
    }

    return { data: result };
  } catch (error) {
    return { error: `Mock error: ${String(error)}` };
  }
}

export function interceptMockRequest(
  url: string,
  request: { method?: string; body?: Record<string, unknown>; params?: Record<string, string> }
): unknown {
  const { method, body: _body } = request;

  if (url === '/contacts' && method === 'GET') {
    return generateContacts(10);
  }
  if (url === '/contacts' && _body && method === 'POST') {
    const newContact = generateContact();
    return newContact;
  }
  if (url === '/contacts' && _body && method === 'PUT') {
    const updatedContact = generateContact();
    return updatedContact;
  }
  if (url.startsWith('/contacts/') && method === 'DELETE') {
    return true;
  }

  if (url === '/companies' && method === 'GET') {
    return generateCompanies(10);
  }
  if (url === '/companies' && _body && method === 'POST') {
    const newCompany = generateCompany();
    return newCompany;
  }
  if (url === '/companies' && _body && method === 'PUT') {
    const updatedCompany = generateCompany();
    return updatedCompany;
  }
  if (url.startsWith('/companies/') && method === 'DELETE') {
    return true;
  }

  const tasksResult = interceptTasksMockRequest(url, request);
  if (tasksResult !== null) {
    return tasksResult;
  }

  if (url.startsWith('/tasks/') && url.endsWith('/dependencies') && method === 'POST') {
    return { predecessor_task_id: 'task-1', dependency_type: 'finish_to_start' };
  }
  if (url.match(/^\/tasks\/[^/]+\/dependencies\/[^/]+$/) && method === 'DELETE') {
    return true;
  }

  if (url === '/activities' && method === 'GET') {
    return generateActivities(10);
  }
  if (url === '/activities' && _body && method === 'POST') {
    const newActivity = generateActivity();
    return newActivity;
  }
  if (url === '/activities' && _body && method === 'PUT') {
    const updatedActivity = generateActivity();
    return updatedActivity;
  }
  if (url.startsWith('/activities/') && method === 'DELETE') {
    return true;
  }

  if (url === '/auth/login' && method === 'POST') {
    return {
      token: 'mock-jwt-token',
      user: { id: 'mock-user-id', email: 'user@example.com', role: 'admin' },
    };
  }
  if (url === '/auth/register' && method === 'POST') {
    return {
      token: 'mock-jwt-token',
      user: { id: 'mock-user-id', email: 'user@example.com', role: 'user' },
    };
  }

  return null;
}

// Tasks: canonical localStorage implementation (mock_data_tasks);
// index.ts delegates its tasks section here. Survives reload.
type TaskRecord = Record<string, unknown>;

function getTaskStore(): TaskRecord[] {
  const stored = getStoredTasks() as TaskRecord[];
  if (stored.length > 0) {
    return stored;
  }
  const seeded = generateTasks(10) as unknown as TaskRecord[];
  saveTasks(seeded);
  return seeded;
}

function isValidPosition(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

function parseTasksListUrl(url: string): { isList: boolean; search: string | null } {
  const match = url.match(/^\/tasks(?:&search=(.+))?$/);
  if (!match) return { isList: false, search: null };
  return { isList: true, search: match[1] ? decodeURIComponent(match[1]) : null };
}

export function interceptTasksMockRequest(
  url: string,
  request: { method?: string; body?: Record<string, unknown>; params?: Record<string, string> },
): TaskRecord[] | TaskRecord | boolean | null {
  const { method, body } = request;
  const bodyRecord = body as TaskRecord | undefined;

  if (method === 'GET') {
    const { isList, search } = parseTasksListUrl(url);
    if (isList) {
      const tasks = getTaskStore();
      if (!search) return tasks;
      const term = search.toLowerCase();
      return tasks.filter(
        (task) =>
          (task['title'] as string | undefined)?.toLowerCase().includes(term) ||
          ((task['description'] as string | undefined) || '').toLowerCase().includes(term),
      );
    }
  }

  const idMatch = url.match(/^\/tasks\/([^/]+)$/);
  const id = idMatch ? idMatch[1] : null;

  if (id !== null && method === 'GET') {
    const task = getTaskStore().find((t) => t['id'] === id);
    if (!task) {
      throw new Error(`Task ${id} not found`);
    }
    return task;
  }

  if (url === '/tasks' && method === 'POST') {
    const tasks = getTaskStore();
    const now = new Date().toISOString();
    const maxPosition = tasks.reduce((max, t) => Math.max(max, Number(t['position']) || 0), 0);
    const position = bodyRecord?.['position'];
    const newTask: TaskRecord = {
      ...generateTask(),
      ...(bodyRecord ?? {}),
      position: isValidPosition(position) ? position : maxPosition + 1,
      created_at: now,
      updated_at: now,
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
  }

  if (id !== null && method === 'PUT') {
    const tasks = getTaskStore();
    const index = tasks.findIndex((t) => t['id'] === id);
    if (index === -1) {
      throw new Error(`Task ${id} not found`);
    }
    if (bodyRecord && 'position' in bodyRecord && !isValidPosition(bodyRecord['position'])) {
      throw new Error('position must be a non-negative integer');
    }
    const updated: TaskRecord = {
      ...tasks[index],
      ...(bodyRecord ?? {}),
      id,
      updated_at: new Date().toISOString(),
    };
    tasks[index] = updated;
    saveTasks(tasks);
    return updated;
  }

  if (id !== null && method === 'DELETE') {
    const tasks = getTaskStore();
    const remaining = tasks.filter((t) => t['id'] !== id);
    if (remaining.length === tasks.length) {
      throw new Error(`Task ${id} not found`);
    }
    saveTasks(remaining);
    return true;
  }

  const statusMatch = url.match(/^\/tasks\/([^/]+)\/status$/);
  if (statusMatch && method === 'PUT') {
    const tasks = getTaskStore();
    const index = tasks.findIndex((t) => t['id'] === statusMatch[1]);
    if (index === -1) {
      throw new Error(`Task ${statusMatch[1]} not found`);
    }
    const updated: TaskRecord = {
      ...tasks[index],
      ...(bodyRecord ?? {}),
      id: statusMatch[1],
      updated_at: new Date().toISOString(),
    };
    tasks[index] = updated;
    saveTasks(tasks);
    return updated;
  }

  return null;
}
