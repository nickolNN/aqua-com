import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('login with valid credentials', async ({ page }) => {
    await login(page);

    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toBeVisible();

    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
  });

  test('login with invalid credentials shows error', async ({ page }) => {
    await page.goto('/login');

    await page.locator('#email').fill('invalid@example.com');
    await page.locator('#password').fill('wrongpassword');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('div.rounded-md.border.border-destructive')).toBeVisible();
    await expect(page.locator('div.rounded-md.border.border-destructive')).toContainText('Invalid email or password');
  });

  test('login form validation shows errors for empty fields', async ({ page }) => {
    await page.goto('/login');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('p.text-xs.text-destructive', { hasText: 'Email is required' })).toBeVisible();
    await expect(page.locator('p.text-xs.text-destructive', { hasText: 'Password is required' })).toBeVisible();
  });

  test('login form validation shows error for invalid email format', async ({ page }) => {
    await page.goto('/login');

    await page.locator('#email').fill('invalid-email');
    await page.locator('#password').fill('password123');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('p.text-xs.text-destructive', { hasText: 'Invalid email format' })).toBeVisible();
  });
});
