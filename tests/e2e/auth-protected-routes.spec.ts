import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Protected Route Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('unauthenticated user redirects to login when accessing the kanban board', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.goto('/');

    await expect(page).toHaveURL('/login');
  });

  test('unauthenticated user redirects to login when accessing tasks', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.goto('/tasks');

    await expect(page).toHaveURL('/login');
  });

  test('authenticated user can access tasks', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');
    await expect(page.locator('h1', { hasText: /Kanban Board/i })).toBeVisible({ timeout: 5000 });
  });
});
