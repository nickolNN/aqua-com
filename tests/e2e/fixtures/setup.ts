import { Page } from '@playwright/test';

export async function setupTestEnvironment(page: Page) {
  // Navigate to the app's base URL first (so localStorage is accessible).
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.evaluate(async () => {
    try {
      const mod = await import('/src/api');
      mod.setMockMode(true);
    } catch {
      // Fallback: try to set mock mode on window
      if (typeof window.__setMockMode === 'function') {
        window.__setMockMode(true);
      }
    }
  });
}

export async function login(page: Page) {
  await page.goto('/login');

  await page.locator('#email').click();
  await page.locator('#email').fill('test@example.com');
  await page.locator('#password').click();
  await page.locator('#password').fill('password123');

  await page.locator('button[type="submit"]').click();

  await page.waitForFunction(() => localStorage.getItem('token'), { timeout: 10000 });
    await page.waitForURL((url) => !url.toString().endsWith('login'), { timeout: 5000 });
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
  await page.goto('/login');
  await page.evaluate(() => {
    localStorage.clear();
  });
}
