// =====================================================
// RTK Query Interceptor for Mock Data
// =====================================================
// Intercepts RTK Query requests and returns mock data
// when mock mode is enabled.
// =====================================================

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

// =====================================================
// Mock Mode State
// =====================================================

let mockMode = false;

/**
 * Enable or disable mock mode
 */
export function setMockMode(enabled: boolean): void {
  mockMode = enabled;
}

/**
 * Check if mock mode is currently enabled
 */
export function isMockMode(): boolean {
  return mockMode;
}

/**
 * RTK Query interceptor that intercepts requests and returns mock data
 * This function is used as the baseQuery for RTK Query
 */
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

/**
 * Intercepts mock requests and returns appropriate mock data based on URL
 */
export function interceptMockRequest(
  url: string,
  request: { method?: string; body?: Record<string, unknown>; params?: Record<string, string> }
): unknown {
  const { method, body: _body } = request;

  // Handle contacts endpoints
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

  // Handle companies endpoints
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

  // Handle tasks endpoints — persisted in the localStorage layer (mock_data_tasks)
  // so created/updated/deleted tasks survive page refreshes (kanban DnD).
  const tasksResult = interceptTasksMockRequest(url, request);
  if (tasksResult !== null) {
    return tasksResult;
  }

  // Handle task dependency endpoints
  if (url.startsWith('/tasks/') && url.endsWith('/dependencies') && method === 'POST') {
    return { predecessor_task_id: 'task-1', dependency_type: 'finish_to_start' };
  }
  if (url.match(/^\/tasks\/[^/]+\/dependencies\/[^/]+$/) && method === 'DELETE') {
    return true;
  }

  // Handle activities endpoints
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

  // Handle auth endpoints
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

  // No mock data for this request
  return null;
}

// =====================================================
// Tasks persistence (localStorage: mock_data_tasks)
// =====================================================
// The active RTK layer (mockBaseQuery) is what the browser app talks to
// (the MSW worker is not started in main.tsx). Tasks must survive page
// refreshes so kanban DnD is observable: the store is seeded once with
// generated data, and every read and write afterwards goes through
// getStoredTasks/saveTasks. This is the canonical tasks implementation;
// index.ts delegates its tasks section here (stage 16).

// SAFETY: mock data is an array of task objects
type TaskRecord = Record<string, unknown>;

/**
 * Get the tasks store, seeding it once with generated data when empty
 */
function getTaskStore(): TaskRecord[] {
  const stored = getStoredTasks() as TaskRecord[];
  if (stored.length > 0) {
    return stored;
  }
  // SAFETY: generateTasks(10) always returns full Task objects (position included),
  // so casting to TaskRecord[] keeps the store shape valid for reads/merges.
  const seeded = generateTasks(10) as unknown as TaskRecord[];
  saveTasks(seeded);
  return seeded;
}

/**
 * Kanban position contract: a present `position` must be a finite
 * non-negative integer — it orders cards within a column and is what
 * gets persisted into the mock_data_tasks store on every update.
 */
function isValidPosition(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

/**
 * The tasks list query builder embeds search in the path string:
 * `/tasks` or `/tasks&search=<term>` (no `?`). Returns the decoded search
 * term (null when absent) and a flag for whether the URL is the list endpoint.
 */
function parseTasksListUrl(url: string): { isList: boolean; search: string | null } {
  const match = url.match(/^\/tasks(?:&search=(.+))?$/);
  if (!match) return { isList: false, search: null };
  return { isList: true, search: match[1] ? decodeURIComponent(match[1]) : null };
}

/**
 * Intercepts tasks endpoints and persists them to the localStorage layer
 * (mock_data_tasks). Returns null when the URL is not a tasks endpoint so
 * the caller can continue with its other routes. Unknown ids throw and
 * surface through the mockBaseQuery error wrapper.
 */
export function interceptTasksMockRequest(
  url: string,
  request: { method?: string; body?: Record<string, unknown>; params?: Record<string, string> },
): TaskRecord[] | TaskRecord | boolean | null {
  const { method, body } = request;
  const bodyRecord = body as TaskRecord | undefined;

  // GET /tasks — list from the store (+ search filter from the URL)
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

  // Single-task id (exactly one segment after /tasks — never /status or /dependencies)
  const idMatch = url.match(/^\/tasks\/([^/]+)$/);
  const id = idMatch ? idMatch[1] : null;

  // GET /tasks/:id — the real stored task (unknown id → throw → error wrapper)
  if (id !== null && method === 'GET') {
    const task = getTaskStore().find((t) => t['id'] === id);
    if (!task) {
      throw new Error(`Task ${id} not found`);
    }
    return task;
  }

  // POST /tasks — request body overlay on a generated task; position defaults to max+1
  if (url === '/tasks' && method === 'POST') {
    const tasks = getTaskStore();
    const now = new Date().toISOString();
    const maxPosition = tasks.reduce((max, t) => Math.max(max, Number(t['position']) || 0), 0);
    const position = bodyRecord?.['position'];
    // Start from a fully-shaped generated task, then overlay the client's
    // fields so missing optional fields keep valid defaults.
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

  // PUT /tasks/:id — merge by id (id preserved, updated_at refreshed, position persisted)
  if (id !== null && method === 'PUT') {
    const tasks = getTaskStore();
    const index = tasks.findIndex((t) => t['id'] === id);
    if (index === -1) {
      throw new Error(`Task ${id} not found`);
    }
    // Explicit position update (kanban): a present `position` must validate,
    // otherwise the store would be corrupted with an unorderable card.
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

  // DELETE /tasks/:id — remove from the store
  if (id !== null && method === 'DELETE') {
    const tasks = getTaskStore();
    const remaining = tasks.filter((t) => t['id'] !== id);
    if (remaining.length === tasks.length) {
      throw new Error(`Task ${id} not found`);
    }
    saveTasks(remaining);
    return true;
  }

  // PUT /tasks/:id/status — kanban column move (update status, persist)
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
