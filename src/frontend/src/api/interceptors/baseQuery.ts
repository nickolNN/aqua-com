// =====================================================
// RTK Query Interceptor for Mock Data
// =====================================================
// Intercepts RTK Query requests and returns mock data
// when mock mode is enabled.
// =====================================================

import { interceptMockRequest } from './mocks';

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
