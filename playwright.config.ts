import { defineConfig, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  use: {
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 200,
    navigationTimeout: 1000,
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure-and-retries',
    video: 'on',
  },
 expect: {
    timeout: 1000,
  },
  retries: 1,
  reporter: [['list'], ['html', { open: 'always' }]],
  webServer: [
    {
      command: 'pnpm dev',
      port: 3000,
      reuseExistingServer: true,
      timeout: 12000,
    },
  ],
  testIgnore: [],
  outputDir: './tests/test-results',
  snapshotDir: './tests/e2e/snapshots',
});

export default config;
