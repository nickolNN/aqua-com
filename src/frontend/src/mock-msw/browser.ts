import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// This creates an MSW worker that intercepts network requests in the browser
export const worker = setupWorker(...handlers);

/**
 * Starts the MSW worker in development mode
 */
export async function startMockWorker() {
  if (typeof window !== 'undefined') {
    await worker.start({
      quiet: true,
      // Don't log info about MSW in production
      serviceWorker: {
        url: '/mock-sw.js',
      },
    });
  }
}

/**
 * Stops the MSW worker (useful for testing)
 */
export function stopMockWorker() {
  if (typeof window !== 'undefined') {
    worker.stop();
  }
}
