import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

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

export function stopMockWorker() {
  if (typeof window !== 'undefined') {
    worker.stop();
  }
}
