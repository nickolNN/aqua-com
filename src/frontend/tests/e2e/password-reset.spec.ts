import { test, expect } from '@playwright/test';
import { setupTestEnvironment } from './fixtures/setup';

test.describe('Password Reset Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('password reset page displays correctly', async ({ page }) => {
    await page.goto('/password-reset');

    // Verify page content
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
  });

  test('password reset form validation shows errors for empty email', async ({ page }) => {
    await page.goto('/password-reset');

    // Click submit without filling any fields
    await page.locator('button[type="submit"]').click();

    // Verify validation errors appear
    await expect(page.locator('p.text-xs.text-red-500', { hasText: 'Email is required' })).toBeVisible();
  });

  test('password reset form validates email format', async ({ page }) => {
    await page.goto('/password-reset');

    // Fill invalid email
    await page.locator('#email').fill('invalid-email');

    // Submit
    await page.locator('button[type="submit"]').click();

    // Verify error message
    await expect(page.locator('p.text-xs.text-red-500', { hasText: 'Invalid email format' })).toBeVisible();
  });

  test('password reset shows success state', async ({ page }) => {
    await page.goto('/password-reset');

    // Fill valid email
    await page.locator('#email').fill('test@example.com');

    // Submit
    await page.locator('button[type="submit"]').click();

    // Verify success state with message
    await expect(page.locator('h2', { hasText: 'Check your email' })).toBeVisible();
  });
});
