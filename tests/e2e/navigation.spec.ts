import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('header renders correctly', async ({ page }) => {
    await login(page);

    await expect(page.locator('header')).toBeVisible();
  });

  test('header navigation buttons exist', async ({ page }) => {
    await login(page);

    await expect(page.getByRole('button', { name: 'New Task' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  });

  test('header navigation routes correctly', async ({ page }) => {
    await login(page);

    await page.getByRole('button', { name: 'New Task' }).click();

    await expect(page).toHaveURL(/\/tasks\?new/);
  });
});
