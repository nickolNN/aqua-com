// =====================================================
// RTK Query Interceptor for Mock Data
// =====================================================
// Intercepts RTK Query requests and returns mock data instead of real API calls.
// =====================================================

import { generateContacts, generateCompanies, generateActivities, generateContact, generateCompany, generateActivity } from '../generators';
import * as persistence from '../persistence/index';

/**
 * Handle a GET request for mock data
 * Supports search, filtering, and pagination
 */
export function handleGetMockRequest(url: string, params?: URLSearchParams): Record<string, unknown>[] {
  const pathSegments = url.split('/').filter(Boolean);
  const entity = pathSegments.find((seg) => ['contacts', 'companies', 'tasks', 'activities'].includes(seg));

  if (!entity) return [];

  let data: Record<string, unknown>[] = [];
  if (entity === 'contacts') data = getMockContacts();
  else if (entity === 'companies') data = getMockCompanies();
  else if (entity === 'tasks') data = getMockTasks();
  else if (entity === 'activities') data = getMockActivities();

  // Handle search/filter
  const searchTerm = params?.get('search') || params?.get('q');
  if (searchTerm) {
    return searchEntities(entity, searchTerm, data);
  }

  // Handle pagination
  const page = params?.get('page');
  const limit = params?.get('limit');
  if (page || limit) {
    const p = parseInt(page || '1', 10);
    const l = parseInt(limit || '10', 10);
    const start = (p - 1) * l;
    return data.slice(start, start + l);
  }

  return data;
}

/**
 * Handle creating a mock entity
 */
export function handleCreateMockRequest(url: string, body: Record<string, unknown>): Record<string, unknown> | null {
  const pathSegments = url.split('/').filter(Boolean);
  const entity = pathSegments.find((seg) => ['contacts', 'companies', 'tasks', 'activities'].includes(seg));

  if (!entity) return null;

  const result = persistence.addEntityToStore(entity as 'tasks', body);
  return result;
}

/**
 * Handle updating a mock entity
 */
export function handleUpdateMockRequest(url: string, body: Record<string, unknown>): Record<string, unknown> | null {
  const pathSegments = url.split('/').filter(Boolean);
  const id = pathSegments.pop();

  if (!id || !body) return null;

  const entity = pathSegments.find((seg) => ['contacts', 'companies', 'tasks', 'activities'].includes(seg));
  if (!entity) return null;

  return persistence.updateEntityInStore(entity as 'tasks', id, body);
}

/**
 * Handle deleting a mock entity
 */
export function handleDeleteMockRequest(url: string): boolean {
  const pathSegments = url.split('/').filter(Boolean);
  const id = pathSegments.pop();

  if (!id) return false;

  const entity = pathSegments.find((seg) => ['contacts', 'companies', 'tasks', 'activities'].includes(seg));
  if (!entity) return false;

  return persistence.deleteEntityFromStore(entity as 'tasks', id);
}

/**
 * Intercepts RTK Query requests by checking if the URL matches a mock entity
 * Returns mock data or undefined if not a mock request
 */
export function interceptMockRequest(
  url: string,
  options: { method?: string; params?: Record<string, string>; body?: Record<string, unknown> } = {}
): Record<string, unknown>[] | Record<string, unknown> | boolean | null {
  const { method = 'GET', body } = options;
  const params = options.params ? new URLSearchParams(options.params) : undefined;

  // Handle GET requests
  if (method === 'GET') {
    return handleGetMockRequest(url, params);
  }

  // Handle POST requests (create)
  if (method === 'POST') {
    return handleCreateMockRequest(url, body as Record<string, unknown>);
  }

  // Handle PUT requests (update)
  if (method === 'PUT') {
    return handleUpdateMockRequest(url, body as Record<string, unknown>);
  }

  // Handle DELETE requests
  if (method === 'DELETE') {
    return handleDeleteMockRequest(url);
  }

  return null;
}

// =====================================================
// Helper functions to get mock data
// =====================================================

/**
 * Get mock contacts
 */
export function getMockContacts(): Record<string, unknown>[] {
  return generateContacts(10) as unknown as Record<string, unknown>[];
}

/**
 * Get mock companies
 */
export function getMockCompanies(): Record<string, unknown>[] {
  return generateCompanies(10) as unknown as Record<string, unknown>[];
}

/**
 * Get mock tasks with localStorage persistence
 */
export function getMockTasks(): Record<string, unknown>[] {
  const storedData = persistence.getMockDataWithPersistence('tasks');
  return (storedData || []) as unknown as Record<string, unknown>[];
}

/**
 * Get mock activities
 */
export function getMockActivities(): Record<string, unknown>[] {
  return generateActivities(10) as unknown as Record<string, unknown>[];
}

/**
   * Search/filter entities by term
   */
function searchEntities(_entity: string, term: string, data: Record<string, unknown>[]): Record<string, unknown>[] {
  return data.filter((item) => {
    const itemStr = JSON.stringify(item).toLowerCase();
    return itemStr.includes(term.toLowerCase());
  });
}

/**
   * Update entity in store with localStorage persistence
   */
export function updateEntityInStore(entity: string, _id: string, body: Record<string, unknown>): Record<string, unknown> {
  return persistence.updateEntityInStore(entity as 'tasks', _id, body) || {};
}

/**
 * Add entity to store with localStorage persistence and cache invalidation
 */
export function addEntityToStore(entity: string, _body: Record<string, unknown>): Record<string, unknown> {
  const keys: Record<string, () => Record<string, unknown>> = {
    contacts: () => generateContact() as unknown as Record<string, unknown>,
    companies: () => generateCompany() as unknown as Record<string, unknown>,
    tasks: () => generateActivity() as unknown as Record<string, unknown>,
    activities: () => generateActivity() as unknown as Record<string, unknown>,
  };

  const generator = keys[entity];
  if (generator) {
    return generator();
  }

  return {};
}

/**
 * Delete entity from store
 */
export function deleteEntityFromStore(_entity: string, _id: string): boolean {
  return true;
}
