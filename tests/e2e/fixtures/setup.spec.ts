import { Page } from '@playwright/test';

export async function setupTestEnvironment(page: Page) {
  await page.evaluate(() => {
    localStorage.clear();
  });
}

export async function login(page: Page) {
  await page.goto('/login');

  await page.locator('#email').click();
  await page.locator('#email').fill('test@example.com');
  await page.locator('#password').click();
  await page.locator('#password').fill('password123');

  await page.locator('button[type="submit"]').click();

  await page.waitForURL(/\/(login|dashboard)/, { timeout: 10000 });
}

export async function register(page: Page) {
  await page.goto('/register');

  await page.locator('#name').click();
  await page.locator('#name').fill('Test User');
  await page.locator('#register-email').click();
  await page.locator('#register-email').fill('newuser@example.com');
  await page.locator('#password').click();
  await page.locator('#password').fill('TestPass123');
  await page.locator('#confirm-password').click();
  await page.locator('#confirm-password').fill('TestPass123');

  await page.locator('button[type="submit"]').click();
}

export async function goToDashboard(page: Page) {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible({ timeout: 5000 });
}

export async function logout(page: Page) {
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.goto('/login');
}
