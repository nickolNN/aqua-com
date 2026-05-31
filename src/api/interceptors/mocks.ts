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

  // Handle tasks endpoints - GET single task by ID
  if (url.startsWith('/tasks/') && url.split('/').length === 3 && method === 'GET') {
    return generateTask();
  }
  // Handle tasks endpoints - list tasks
  if (url === '/tasks' && method === 'GET') {
    return generateTasks(10);
  }
  // Handle tasks endpoints - create task
  if (url === '/tasks' && _body && method === 'POST') {
    const newTask = generateTask();
    return newTask;
  }
  // Handle tasks endpoints - update task
  if (url === '/tasks' && _body && method === 'PUT') {
    const updatedTask = generateTask();
    return updatedTask;
  }
  // Handle tasks endpoints - delete task
  if (url.startsWith('/tasks/') && method === 'DELETE') {
    return true;
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
