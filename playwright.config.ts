import { defineConfig, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = defineConfig({
  testDir: './src/frontend/tests/e2e',
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
      command: 'cd src/frontend && npm run dev',
      port: 3000,
      reuseExistingServer: true,
      timeout: 120000,
      reuseExistingServerPort: true,
      environment: { NODE_ENV: 'test' },
    },
  ],
  testIgnore: [],
  outputDir: './src/frontend/tests/test-results',
  snapshotDir: './src/frontend/tests/e2e/snapshots',
});

export default config;
