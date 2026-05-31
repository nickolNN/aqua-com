import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Registration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('register with valid data', async ({ page }) => {
    await page.goto('/register');

    // Fill registration form
    await page.locator('#name').fill('Test User');
    await page.locator('#register-email').fill('newuser@example.com');
    await page.locator('#password').fill('TestPass123');
    await page.locator('#confirm-password').fill('TestPass123');

    // Submit registration form
    await page.locator('button[type="submit"]').click();

    // Verify navigation to login page
    await expect(page).toHaveURL('/login');
  });

  test('register form validation shows errors for empty fields', async ({ page }) => {
    await page.goto('/register');

    // Fill only name
    await page.locator('#name').fill('Test User');

    // Submit without filling other required fields
    await page.locator('button[type="submit"]').click();

    // Verify validation errors appear
    await expect(page.locator('p.text-xs.text-red-500', { hasText: 'Email is required' })).toBeVisible();
    await expect(page.locator('p.text-xs.text-red-500', { hasText: 'Password is required' })).toBeVisible();
    await expect(page.locator('p.text-xs.text-red-500', { hasText: 'Password must be at least 8 characters' })).toBeVisible();
  });

  test('register form validates password length requirement', async ({ page }) => {
    await page.goto('/register');

    // Fill form with short password
    await page.locator('#name').fill('Test User');
    await page.locator('#register-email').fill('newuser@example.com');
    await page.locator('#password').fill('1234567');
    await page.locator('#confirm-password').fill('1234567');

    // Submit
    await page.locator('button[type="submit"]').click();

    // Verify password length error
    await expect(page.locator('p.text-xs.text-red-500', { hasText: 'Password must be at least 8 characters' })).toBeVisible();
  });

  test('register with mismatched passwords shows error', async ({ page }) => {
    await page.goto('/register');

    // Fill form with mismatched passwords
    await page.locator('#name').fill('Test User');
    await page.locator('#register-email').fill('newuser@example.com');
    await page.locator('#password').fill('TestPass123');
    await page.locator('#confirm-password').fill('DifferentPass123');

    // Submit
    await page.locator('button[type="submit"]').click();

    // Verify password mismatch error
    await expect(page.locator('p.text-xs.text-red-500', { hasText: 'Passwords do not match' })).toBeVisible();
  });
});
