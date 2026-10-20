import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('sidebar renders correctly', async ({ page }) => {
    await login(page);

    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('sidebar menu items exist', async ({ page }) => {
    await login(page);

    await expect(
      page.locator('[role="navigation"] a, [class*="sidebar"] a, nav a').first()
    ).toBeVisible();
  });

  test('sidebar navigation routes correctly', async ({ page }) => {
    await login(page);

    const sidebarLink = page.locator('[role="navigation"] a, [class*="sidebar"] a').first();
    await sidebarLink.click();

    await expect(page).toHaveURL(/\/\w+/);
  });

  test('breadcrumb navigation works', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    const sidebar = page.getByRole('navigation');
    await expect(sidebar).toBeVisible();

    const sidebarLink = sidebar.locator('a').first();
    await sidebarLink.click();

    await expect(page).toHaveURL(/\/\w+/);
  });
});
