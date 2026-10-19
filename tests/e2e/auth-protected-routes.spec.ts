import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Protected Route Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('unauthenticated user redirects to login when accessing dashboard', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.goto('/');

    await expect(page).toHaveURL('/login');
  });

  test('unauthenticated user redirects to login when accessing contacts', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.goto('/contacts');

    await expect(page).toHaveURL('/login');
  });

  test('unauthenticated user redirects to login when accessing companies', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.goto('/companies');

    await expect(page).toHaveURL('/login');
  });

  test('unauthenticated user redirects to login when accessing tasks', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.goto('/tasks');

    await expect(page).toHaveURL('/login');
  });

  test('unauthenticated user redirects to login when accessing activities', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.goto('/activities');

    await expect(page).toHaveURL('/login');
  });

  test('authenticated user can access contacts', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');
    await expect(page.locator('h1', { hasText: /Contacts|Contact List/i })).toBeVisible({ timeout: 5000 });
  });

  test('authenticated user can access companies', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await expect(page.locator('h1', { hasText: /Companies|Company List/i })).toBeVisible({ timeout: 5000 });
  });

  test('authenticated user can access tasks', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');
    await expect(page.locator('h1', { hasText: /Tasks|Task List/i })).toBeVisible({ timeout: 5000 });
  });

  test('authenticated user can access activities', async ({ page }) => {
    await login(page);
    await page.goto('/activities');
    await expect(page.locator('h1', { hasText: /Activities|Activity List/i })).toBeVisible({ timeout: 5000 });
  });
});
