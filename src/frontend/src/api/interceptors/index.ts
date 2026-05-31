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

type RequestArgs = {
  url: string;
  method?: string;
  body?: Record<string, unknown> | object;
  params?: Record<string, string>;
};

type QueryResultUnion = { error: unknown } | { data: unknown };

// Mock mode state
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
 * Accepts both string URLs and RequestArgs objects from RTK Query endpoints
 */
export async function mockBaseQuery(
  request: string | RequestArgs,
): Promise<QueryResultUnion> {
  if (!mockMode) {
    return { error: 'Mock mode is disabled' };
  }

  const url = typeof request === 'string' ? request : request.url;
  const method = typeof request === 'string' ? 'GET' : (request.method || 'GET');
  const body = typeof request === 'string' ? undefined : (request.body as Record<string, unknown> | undefined);
  const params = typeof request === 'string' ? undefined : request.params;

  try {
    const result = interceptMockRequest(url, { method, body, params });

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

  // Handle tasks endpoints
  if (url === '/tasks' && method === 'GET') {
    return generateTasks(10);
  }
  if (url === '/tasks' && _body && method === 'POST') {
    const newTask = generateTask();
    return newTask;
  }
  if (url === '/tasks' && _body && method === 'PUT') {
    const updatedTask = generateTask();
    return updatedTask;
  }
  if (url.startsWith('/tasks/') && method === 'DELETE') {
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
