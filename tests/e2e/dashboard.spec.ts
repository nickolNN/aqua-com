import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('dashboard loads with summary cards', async ({ page }) => {
    await login(page);

    await expect(page.locator('text=Total Contacts')).toBeVisible();
    await expect(page.locator('text=Open Tasks')).toBeVisible();
    await expect(page.locator('text=Activities This Week')).toBeVisible();
    await expect(page.locator('text=Active Deals')).toBeVisible();
  });

  test('dashboard charts render correctly', async ({ page }) => {
    await login(page);

    await expect(page.locator('text=Task Status Breakdown')).toBeVisible();
    await expect(page.locator('text=Activity Type Breakdown')).toBeVisible();
  });

  test('recent activity section displays correctly', async ({ page }) => {
    await login(page);

    await expect(page.locator('text=Recent Activity')).toBeVisible();
  });

  test('dashboard navigates from sidebar', async ({ page }) => {
    await login(page);

    const sidebarLink = page.locator('[role="navigation"] a, [class*="sidebar"] a, nav a').first();
    await sidebarLink.click();

    await expect(page).toHaveURL(/\/\w+/);
  });
});
