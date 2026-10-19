import { test, expect } from '@playwright/test';
import { setupTestEnvironment } from './fixtures/setup';

test.describe('Registration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('register with valid data', async ({ page }) => {
    await page.goto('/register');

    await page.locator('#name').fill('Test User');
    await page.locator('#register-email').fill('newuser@example.com');
    await page.locator('#password').fill('TestPass123');
    await page.locator('#confirm-password').fill('TestPass123');

    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL('/login');
  });

  test('register form validation shows errors for empty fields', async ({ page }) => {
    await page.goto('/register');

    await page.locator('#name').fill('Test User');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Email is required' })).toBeVisible();
    await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Password is required' })).toBeVisible();
    await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Password must be at least 8 characters' })).toBeVisible();
  });

  test('register form validates password length requirement', async ({ page }) => {
    await page.goto('/register');

    await page.locator('#name').fill('Test User');
    await page.locator('#register-email').fill('newuser@example.com');
    await page.locator('#password').fill('1234567');
    await page.locator('#confirm-password').fill('1234567');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Password must be at least 8 characters' })).toBeVisible();
  });

  test('register with mismatched passwords shows error', async ({ page }) => {
    await page.goto('/register');

    await page.locator('#name').fill('Test User');
    await page.locator('#register-email').fill('newuser@example.com');
    await page.locator('#password').fill('TestPass123');
    await page.locator('#confirm-password').fill('DifferentPass123');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Passwords do not match' })).toBeVisible();
  });
});
