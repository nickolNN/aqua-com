import { interceptMockRequest } from '../mock-data/interceptors';
import { getMockContacts, getMockCompanies, getMockTasks, getMockActivities } from '../mock-data';

/**
 * RTK Query Interceptor Configuration
 *
 * This interceptor intercepts RTK Query requests and returns mock data when mock mode is enabled.
 * It works by checking if a request URL matches a mock entity and returning the appropriate mock data.
 */

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
 * Initialize mock data for all entities when mock mode is enabled
 * Call this function when enabling mock mode to ensure mock data is available
 */
export function initializeMockData(): void {
  if (mockMode) {
    getMockContacts();
    getMockCompanies();
    getMockTasks();
    getMockActivities();
  }
}

/**
 * RTK Query interceptor that intercepts requests and returns mock data
 * This function is used as the baseQuery for RTK Query
 */
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
