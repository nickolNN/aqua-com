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

let mockMode = false;

export function setMockMode(enabled: boolean): void {
  mockMode = enabled;
}

export function isMockMode(): boolean {
  return mockMode;
}

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

export function interceptMockRequest(
  url: string,
  request: { method?: string; body?: Record<string, unknown>; params?: Record<string, string> }
): unknown {
  const { method, body: _body } = request;

  if (url === '/contacts' && method === 'GET') {
    const searchTerm = request.params?.['search'] || request.params?.['q'];
    const allContacts = generateContacts(10);
    if (searchTerm) {
      return filterContactsBySearch(allContacts, searchTerm);
    }
    return allContacts;
  }

  if (url.startsWith('/contacts/') && url.split('/').length === 3 && method === 'GET') {
    return generateContact();
  }

  if (url === '/contacts' && method === 'POST') {
    return { success: true, data: _body };
  }

  if (url.startsWith('/contacts/') && url.split('/').length === 3 && method === 'PUT') {
    return { success: true, data: _body };
  }

  if (url.startsWith('/contacts/') && url.split('/').length === 3 && method === 'DELETE') {
    return { success: true };
  }

  if (url === '/companies' && method === 'GET') {
    const searchTerm = request.params?.['search'] || request.params?.['q'];
    const allCompanies = generateCompanies(10);
    if (searchTerm) {
      return filterCompaniesBySearch(allCompanies, searchTerm);
    }
    return allCompanies;
  }

  if (url.startsWith('/companies/') && url.split('/').length === 3 && method === 'GET') {
    return generateCompany();
  }

  if (url === '/companies' && method === 'POST') {
    return { success: true, data: _body };
  }

  if (url.startsWith('/companies/') && url.split('/').length === 3 && method === 'PUT') {
    return { success: true, data: _body };
  }

  if (url.startsWith('/companies/') && url.split('/').length === 3 && method === 'DELETE') {
    return { success: true };
  }

  // Tasks are persisted through the localStorage layer (./mocks.ts).
  const tasksResult = interceptTasksMockRequest(url, { method, body: _body, params: request.params });
  if (tasksResult !== null) {
    return tasksResult;
  }

  if (url === '/activities' && method === 'GET') {
    return generateActivities(10);
  }

  if (url.startsWith('/activities/') && url.split('/').length === 3 && method === 'GET') {
    return generateActivity();
  }

  if (url === '/activities' && method === 'POST') {
    return generateActivity();
  }

  if (url.startsWith('/activities/') && url.split('/').length === 3 && method === 'PUT') {
    return { success: true, data: _body };
  }

  if (url.startsWith('/activities/') && url.split('/').length === 3 && method === 'DELETE') {
    return { success: true };
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

function filterContactsBySearch(contacts: unknown[], term: string): unknown[] {
  return contacts.filter((item) => {
    const itemStr = JSON.stringify(item).toLowerCase();
    return itemStr.includes(term.toLowerCase());
  });
}

function filterCompaniesBySearch(companies: unknown[], term: string): unknown[] {
  return companies.filter((item) => {
    const itemStr = JSON.stringify(item).toLowerCase();
    return itemStr.includes(term.toLowerCase());
  });
}
