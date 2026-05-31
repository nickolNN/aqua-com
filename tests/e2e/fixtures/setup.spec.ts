import { Page } from '@playwright/test';

/**
 * Fixture: Setup test environment
 * Resets localStorage and navigates to the app
 */
export async function setupTestEnvironment(page: Page) {
  // Clear localStorage for isolation between tests
  await page.evaluate(() => {
    localStorage.clear();
  });
}

/**
 * Fixture: Login with valid credentials
 * @returns {Promise<void>}
 */
export async function login(page: Page) {
  // Navigate to login page
  await page.goto('/login');

  // Fill in valid credentials
  await page.locator('#email').click();
  await page.locator('#email').fill('test@example.com');
  await page.locator('#password').click();
  await page.locator('#password').fill('password123');

  // Submit login form
  await page.locator('button[type="submit"]').click();

  // Wait for navigation to complete
  await page.waitForURL(/\/(login|dashboard)/, { timeout: 10000 });
}

/**
 * Fixture: Register with valid data
 * @returns {Promise<void>}
 */
export async function register(page: Page) {
  // Navigate to register page
  await page.goto('/register');

  // Fill registration form
  await page.locator('#name').click();
  await page.locator('#name').fill('Test User');
  await page.locator('#register-email').click();
  await page.locator('#register-email').fill('newuser@example.com');
  await page.locator('#password').click();
  await page.locator('#password').fill('TestPass123');
  await page.locator('#confirm-password').click();
  await page.locator('#confirm-password').fill('TestPass123');

  // Submit registration form
  await page.locator('button[type="submit"]').click();
}

/**
 * Fixture: Navigate to dashboard after login
 * @returns {Promise<void>}
 */
export async function goToDashboard(page: Page) {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible({ timeout: 5000 });
}

/**
 * Fixture: Logout by clearing localStorage and navigating to login
 * @returns {Promise<void>}
 */
export async function logout(page: Page) {
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.goto('/login');
}
