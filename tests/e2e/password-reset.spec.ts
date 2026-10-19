import { test, expect } from '@playwright/test';
import { setupTestEnvironment } from './fixtures/setup';

test.describe('Password Reset Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('password reset page displays correctly', async ({ page }) => {
    await page.goto('/password-reset');

    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
  });

  test('password reset form validation shows errors for empty email', async ({ page }) => {
    await page.goto('/password-reset');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Email is required' })).toBeVisible();
  });

  test('password reset form validates email format', async ({ page }) => {
    await page.goto('/password-reset');

    await page.locator('#email').fill('invalid-email');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Invalid email format' })).toBeVisible();
  });

  test('password reset shows success state', async ({ page }) => {
    await page.goto('/password-reset');

    await page.locator('#email').fill('test@example.com');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('h2', { hasText: 'Check your email' })).toBeVisible();
  });
});
