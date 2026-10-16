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
  generateActivity,
  generateActivities,
} from '../../mock-data/generators';
import { interceptTasksMockRequest } from './mocks';

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

  // =====================================================
  // Contact endpoints
  // =====================================================

  // GET /contacts - list all contacts (with optional search query param)
  if (url === '/contacts' && method === 'GET') {
    const searchTerm = request.params?.['search'] || request.params?.['q'];
    const allContacts = generateContacts(10);
    if (searchTerm) {
      return filterContactsBySearch(allContacts, searchTerm);
    }
    return allContacts;
  }

  // GET /contacts/:id - get single contact detail
  if (url.startsWith('/contacts/') && url.split('/').length === 3 && method === 'GET') {
    return generateContact();
  }

  // POST /contacts - create a single contact
  if (url === '/contacts' && method === 'POST') {
    return { success: true, data: _body };
  }

  // PUT /contacts/:id - update a single contact
  if (url.startsWith('/contacts/') && url.split('/').length === 3 && method === 'PUT') {
    return { success: true, data: _body };
  }

  // DELETE /contacts/:id - delete a single contact
  if (url.startsWith('/contacts/') && url.split('/').length === 3 && method === 'DELETE') {
    return { success: true };
  }

  // =====================================================
  // Company endpoints
  // =====================================================

  // GET /companies - list all companies (with optional search query param)
  if (url === '/companies' && method === 'GET') {
    const searchTerm = request.params?.['search'] || request.params?.['q'];
    const allCompanies = generateCompanies(10);
    if (searchTerm) {
      return filterCompaniesBySearch(allCompanies, searchTerm);
    }
    return allCompanies;
  }

  // GET /companies/:id - get single company detail
  if (url.startsWith('/companies/') && url.split('/').length === 3 && method === 'GET') {
    return generateCompany();
  }

  // POST /companies - create a single company
  if (url === '/companies' && method === 'POST') {
    return { success: true, data: _body };
  }

  // PUT /companies/:id - update a single company
  if (url.startsWith('/companies/') && url.split('/').length === 3 && method === 'PUT') {
    return { success: true, data: _body };
  }

  // DELETE /companies/:id - delete a single company
  if (url.startsWith('/companies/') && url.split('/').length === 3 && method === 'DELETE') {
    return { success: true };
  }

  // =====================================================
  // Task endpoints — persisted in the localStorage layer (mock_data_tasks)
  // so created/updated/deleted tasks survive page refreshes (kanban DnD).
  // Canonical implementation in ./mocks (stage 16).
  // =====================================================
  const tasksResult = interceptTasksMockRequest(url, { method, body: _body, params: request.params });
  if (tasksResult !== null) {
    return tasksResult;
  }

  // =====================================================
  // Activity endpoints
  // =====================================================

  // GET /activities - list all activities (with optional search query param)
  if (url === '/activities' && method === 'GET') {
    return generateActivities(10);
  }

  // GET /activities/:id - get single activity detail
  if (url.startsWith('/activities/') && url.split('/').length === 3 && method === 'GET') {
    return generateActivity();
  }

  // POST /activities - create a single activity
  if (url === '/activities' && method === 'POST') {
    return generateActivity();
  }

  // PUT /activities/:id - update a single activity
  if (url.startsWith('/activities/') && url.split('/').length === 3 && method === 'PUT') {
    return { success: true, data: _body };
  }

  // DELETE /activities/:id - delete a single activity
  if (url.startsWith('/activities/') && url.split('/').length === 3 && method === 'DELETE') {
    return { success: true };
  }

  // =====================================================
  // Auth endpoints
  // =====================================================

 // POST /auth/login
  if (url === '/auth/login' && method === 'POST') {
    return {
      token: 'mock-jwt-token',
      user: { id: 'mock-user-id', email: 'user@example.com', role: 'admin' },
    };
  }

  // POST /auth/register
  if (url === '/auth/register' && method === 'POST') {
    return {
      token: 'mock-jwt-token',
      user: { id: 'mock-user-id', email: 'user@example.com', role: 'user' },
    };
  }

  // No mock data for this request
  return null;
}

/**
 * Filter contacts by search term
 */
function filterContactsBySearch(contacts: unknown[], term: string): unknown[] {
  return contacts.filter((item) => {
    const itemStr = JSON.stringify(item).toLowerCase();
    return itemStr.includes(term.toLowerCase());
  });
}

/**
 * Filter companies by search term
 */
function filterCompaniesBySearch(companies: unknown[], term: string): unknown[] {
  return companies.filter((item) => {
    const itemStr = JSON.stringify(item).toLowerCase();
    return itemStr.includes(term.toLowerCase());
  });
}
