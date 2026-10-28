import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('login with valid credentials', async ({ page }) => {
    await login(page);

    await expect(page).toHaveURL('/');
    // The dashboard no longer has a page heading — the one-line header
    // (New Task + theme toggle + Log out) is the logged-in layout's marker.
    await expect(
      page.getByRole('button', { name: 'New Task' }),
    ).toBeVisible();

    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
  });

  test('login succeeds with arbitrary frontend-validated credentials', async ({ page }) => {
    await page.goto('/login');

    await page.locator('#email').fill('anyone@example.com');
    await page.locator('#password').fill('anything123');

    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('button', { name: 'New Task' })).toBeVisible();

    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
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
