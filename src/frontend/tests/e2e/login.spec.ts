import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('login with valid credentials', async ({ page }) => {
    await login(page);

    // Verify navigation to dashboard
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toBeVisible();

    // Verify token was stored in localStorage
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
  });

  test('login with invalid credentials shows error', async ({ page }) => {
    await login(page);

    // Fill in invalid credentials
    await page.locator('#email').fill('invalid@example.com');
    await page.locator('#password').fill('wrongpassword');

    // Submit login form
    await page.locator('button[type="submit"]').click();

    // Verify error message is displayed
    await expect(page.locator('.rounded-md.border.bg-red-50')).toBeVisible();
  });

  test('login form validation shows errors for empty fields', async ({ page }) => {
    await page.goto('/login');

    // Click submit without filling any fields
    await page.locator('button[type="submit"]').click();

    // Verify validation errors appear
    await expect(page.locator('p.text-xs.text-red-500', { hasText: 'Email is required' })).toBeVisible();
    await expect(page.locator('p.text-xs.text-red-500', { hasText: 'Password is required' })).toBeVisible();
  });

  test('login form validation shows error for invalid email format', async ({ page }) => {
    await page.goto('/login');

    // Fill invalid email
    await page.locator('#email').fill('invalid-email');
    await page.locator('#password').fill('password123');

    // Submit
    await page.locator('button[type="submit"]').click();

    // Verify error message
    await expect(page.locator('p.text-xs.text-red-500', { hasText: 'Invalid email format' })).toBeVisible();
  });
});
