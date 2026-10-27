import { defineConfig, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  use: {
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    // 200ms was too tight for the dev server under container load: dialog
    // entry animation (150ms) + mount latency regularly exceeded the
    // budget, failing clicks on otherwise actionable elements.
    actionTimeout: 2000,
    // Generous navigation/expect budgets: the dev server's cold first load
    // under parallel workers regularly exceeds 1s.
    navigationTimeout: 10000,
    baseURL: 'http://localhost:5100',
    trace: 'retain-on-failure-and-retries',
    video: 'on',
  },
 expect: {
    timeout: 5000,
  },
  // Two workers: with the default (cores/2 = 3) the shared dev server and
  // memory pressure make cold navigations time out intermittently.
  workers: 2,
  retries: 1,
  reporter: [['list'], ['html', { open: 'always' }]],
  webServer: [
    {
      command: 'pnpm exec vite --host 0.0.0.0 --port 5100',
      port: 5100,
      reuseExistingServer: true,
      timeout: 12000,
    },
  ],
  testIgnore: [],
  outputDir: './tests/test-results',
  snapshotDir: './tests/e2e/snapshots',
});

export default config;
