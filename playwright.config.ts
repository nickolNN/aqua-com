import { defineConfig, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  use: {
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 10000,
    navigationTimeout: 15000,
    baseURL: 'http://localhost:3000',
    trace: 'retain',
    video: 'on',
  },
  expect: {
    timeout: 10000,
  },
  retries: 3,
  reporter: [['list'], ['html', { open: 'always' }]],
  webServer: [
    {
      command: 'pnpm dev',
      port: 3000,
      reuseExisting: true,
      reuseExistingServerPort: true,
      timeout: 120000,
    },
  ],
  testIgnore: [],
  outputDir: './tests/test-results',
  snapshotDir: './tests/e2e/snapshots',
});

export default config;
