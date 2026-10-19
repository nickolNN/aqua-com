import { generateContacts, generateCompanies, generateActivities, generateContact, generateCompany, generateActivity } from '../generators';
import * as persistence from '../persistence/index';

export function handleGetMockRequest(url: string, params?: URLSearchParams): Record<string, unknown>[] {
  const pathSegments = url.split('/').filter(Boolean);
  const entity = pathSegments.find((seg) => ['contacts', 'companies', 'tasks', 'activities'].includes(seg));

  if (!entity) return [];

  let data: Record<string, unknown>[] = [];
  if (entity === 'contacts') data = getMockContacts();
  else if (entity === 'companies') data = getMockCompanies();
  else if (entity === 'tasks') data = getMockTasks();
  else if (entity === 'activities') data = getMockActivities();

  const searchTerm = params?.get('search') || params?.get('q');
  if (searchTerm) {
    return searchEntities(entity, searchTerm, data);
  }

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

export function handleCreateMockRequest(url: string, body: Record<string, unknown>): Record<string, unknown> | null {
  const pathSegments = url.split('/').filter(Boolean);
  const entity = pathSegments.find((seg) => ['contacts', 'companies', 'tasks', 'activities'].includes(seg));

  if (!entity) return null;

  const result = persistence.addEntityToStore(entity as 'tasks', body);
  return result;
}

export function handleUpdateMockRequest(url: string, body: Record<string, unknown>): Record<string, unknown> | null {
  const pathSegments = url.split('/').filter(Boolean);
  const id = pathSegments.pop();

  if (!id || !body) return null;

  const entity = pathSegments.find((seg) => ['contacts', 'companies', 'tasks', 'activities'].includes(seg));
  if (!entity) return null;

  return persistence.updateEntityInStore(entity as 'tasks', id, body);
}

export function handleDeleteMockRequest(url: string): boolean {
  const pathSegments = url.split('/').filter(Boolean);
  const id = pathSegments.pop();

  if (!id) return false;

  const entity = pathSegments.find((seg) => ['contacts', 'companies', 'tasks', 'activities'].includes(seg));
  if (!entity) return false;

  return persistence.deleteEntityFromStore(entity as 'tasks', id);
}

export function interceptMockRequest(
  url: string,
  options: { method?: string; params?: Record<string, string>; body?: Record<string, unknown> } = {}
): Record<string, unknown>[] | Record<string, unknown> | boolean | null {
  const { method = 'GET', body } = options;
  const params = options.params ? new URLSearchParams(options.params) : undefined;

  if (method === 'GET') {
    return handleGetMockRequest(url, params);
  }

  if (method === 'POST') {
    return handleCreateMockRequest(url, body as Record<string, unknown>);
  }

  if (method === 'PUT') {
    return handleUpdateMockRequest(url, body as Record<string, unknown>);
  }

  if (method === 'DELETE') {
    return handleDeleteMockRequest(url);
  }

  return null;
}

export function getMockContacts(): Record<string, unknown>[] {
  return generateContacts(10) as unknown as Record<string, unknown>[];
}

export function getMockCompanies(): Record<string, unknown>[] {
  return generateCompanies(10) as unknown as Record<string, unknown>[];
}

export function getMockTasks(): Record<string, unknown>[] {
  const storedData = persistence.getMockDataWithPersistence('tasks');
  return (storedData || []) as unknown as Record<string, unknown>[];
}

export function getMockActivities(): Record<string, unknown>[] {
  return generateActivities(10) as unknown as Record<string, unknown>[];
}

function searchEntities(_entity: string, term: string, data: Record<string, unknown>[]): Record<string, unknown>[] {
  return data.filter((item) => {
    const itemStr = JSON.stringify(item).toLowerCase();
    return itemStr.includes(term.toLowerCase());
  });
}

export function updateEntityInStore(entity: string, _id: string, body: Record<string, unknown>): Record<string, unknown> {
  return persistence.updateEntityInStore(entity as 'tasks', _id, body) || {};
}

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

export function deleteEntityFromStore(_entity: string, _id: string): boolean {
  return true;
}
