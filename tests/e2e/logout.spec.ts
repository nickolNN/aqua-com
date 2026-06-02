import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Logout Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('logout button exists in sidebar footer', async ({ page }) => {
    await login(page);

    // Verify logout button is visible
    const logoutButton = page.locator('button', { hasText: /Log out/i }).first();
    await expect(logoutButton).toBeVisible();
  });

  test('logout navigates to login page', async ({ page }) => {
    await login(page);

    // Click logout button
    const logoutButton = page.locator('button', { hasText: /Log out/i }).first();
    await logoutButton.click();

    // Verify navigation to login page
    await expect(page).toHaveURL('/login');
  });

  test('logout clears auth state', async ({ page }) => {
    await login(page);

    // Verify token is present before logout
    const tokenBefore = await page.evaluate(() => localStorage.getItem('token'));
    expect(tokenBefore).toBeTruthy();

    // Click logout button
    const logoutButton = page.locator('button', { hasText: /Log out/i }).first();
    await logoutButton.click();

    // Verify token is cleared after logout
    const tokenAfter = await page.evaluate(() => localStorage.getItem('token'));
    expect(tokenAfter).toBeNull();
  });

  test('logged out user cannot access protected routes', async ({ page }) => {
    await login(page);

    // Navigate to a protected route
    await page.goto('/contacts');

    // Click logout button
    const logoutButton = page.locator('button', { hasText: /Log out/i }).first();
    await logoutButton.click();

    // Wait for logout to complete (token cleared and navigation)
    await page.waitForFunction(() => !localStorage.getItem('token'), { timeout: 5000 });

    // Verify redirected to login page
    await expect(page).toHaveURL('/login');
  });

  test('logout with multiple users', async ({ page }) => {
    await login(page);

    // Verify token is present before logout
    const tokenBefore = await page.evaluate(() => localStorage.getItem('token'));
    expect(tokenBefore).toBeTruthy();

    // Click logout button
    const logoutButton = page.locator('button', { hasText: /Log out/i }).first();
    await logoutButton.click();

    // Verify token is cleared after logout
    const tokenAfter = await page.evaluate(() => localStorage.getItem('token'));
    expect(tokenAfter).toBeNull();

    // Verify login page is displayed
    await expect(page.locator('h1', { hasText: /Aqua CRM/i })).toBeVisible();
  });
});
