import { interceptMockRequest } from '../mock-data/interceptors';
import { getMockContacts, getMockCompanies, getMockTasks, getMockActivities } from '../mock-data';

let mockMode = false;

export function setMockMode(enabled: boolean): void {
  mockMode = enabled;
}

export function isMockMode(): boolean {
  return mockMode;
}

export function initializeMockData(): void {
  if (mockMode) {
    getMockContacts();
    getMockCompanies();
    getMockTasks();
    getMockActivities();
  }
}

export async function mockBaseQuery(
  request: { url: string; method?: string; body?: Record<string, unknown>; params?: Record<string, string> }
): Promise<{ data?: unknown; error?: string }> {
  if (!mockMode) {
    return { error: 'Mock mode is disabled' };
  }

  const { url, method = 'GET', body, params } = request;

  try {
    const result = interceptMockRequest(url as string, { method, body, params });

    if (result === null || result === undefined) {
      return { error: 'No mock data found for request' };
    }

    return { data: result };
  } catch (error) {
    return { error: `Mock error: ${String(error)}` };
  }
}
