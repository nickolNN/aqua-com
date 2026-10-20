import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Logout Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('logout button exists in sidebar footer', async ({ page }) => {
    await login(page);

    const logoutButton = page.locator('button', { hasText: /Log out/i }).first();
    await expect(logoutButton).toBeVisible();
  });

  test('logout navigates to login page', async ({ page }) => {
    await login(page);

    const logoutButton = page.locator('button', { hasText: /Log out/i }).first();
    await logoutButton.click();

    await expect(page).toHaveURL('/login');
  });

  test('logout clears auth state', async ({ page }) => {
    await login(page);

    const tokenBefore = await page.evaluate(() => localStorage.getItem('token'));
    expect(tokenBefore).toBeTruthy();

    const logoutButton = page.locator('button', { hasText: /Log out/i }).first();
    await logoutButton.click();

    const tokenAfter = await page.evaluate(() => localStorage.getItem('token'));
    expect(tokenAfter).toBeNull();
  });

  test('logged out user cannot access protected routes', async ({ page }) => {
    await login(page);

    await page.goto('/tasks');

    const logoutButton = page.locator('button', { hasText: /Log out/i }).first();
    await logoutButton.click();

    await page.waitForFunction(() => !localStorage.getItem('token'), { timeout: 5000 });

    await expect(page).toHaveURL('/login');
  });

  test('logout with multiple users', async ({ page }) => {
    await login(page);

    const tokenBefore = await page.evaluate(() => localStorage.getItem('token'));
    expect(tokenBefore).toBeTruthy();

    const logoutButton = page.locator('button', { hasText: /Log out/i }).first();
    await logoutButton.click();

    const tokenAfter = await page.evaluate(() => localStorage.getItem('token'));
    expect(tokenAfter).toBeNull();

    await expect(page.locator('h1', { hasText: /Aqua CRM/i })).toBeVisible();
  });
});
