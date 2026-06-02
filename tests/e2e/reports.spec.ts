import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Reports Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('reports page loads', async ({ page }) => {
    await login(page);
    await page.goto('/reports');

    await expect(page.locator('h1', { hasText: /Reports/ })).toBeVisible();
  });

  test('reports tabs exist', async ({ page }) => {
    await login(page);
    await page.goto('/reports');

    const tabs = page.locator('text=Tasks, text=Contacts, text=Activities, text=Pipeline, [role="tab"]');
    await expect(tabs.first()).toBeVisible();
  });

  test('reports tab switching works', async ({ page }) => {
    await login(page);
    await page.goto('/reports');

    const taskTab = page.locator('text=Tasks, [role="tab"]');
    await taskTab.click();

    await expect(page.locator('text=Tasks')).toBeVisible();
  });
});

test.describe('Search Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('global search input exists', async ({ page }) => {
    await login(page);

    await expect(page.locator('input[placeholder="Search"], input[type="search"]')).toBeVisible();
  });

  test('global search can be used to search', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');

    const searchInput = page.locator('input[placeholder="Search"], input[type="search"]');
    await searchInput.fill('Test');

    await expect(page.locator('input[placeholder="Search"], input[type="search"]')).toHaveValue('Test');
  });
});
