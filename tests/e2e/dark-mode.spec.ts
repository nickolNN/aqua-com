import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test('dark mode toggle works', async ({ page }) => {
    await page.goto('/');
    
    const initialTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(initialTheme).toBe(false);
    
    // Resilient selector (partial match).
    await page.locator('button[aria-label*="dark mode"]').click();
    
    const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(darkTheme).toBe(true);
    
    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe('dark');
  });

  test('dark mode persists on reload', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('button[aria-label*="dark mode"]').click();
    
    await page.reload();
    
    const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(darkTheme).toBe(true);
  });

  test('dark mode works on login page', async ({ page }) => {
    await page.goto('/login');
    
    await page.locator('button[aria-label*="dark mode"]').click();
    
    const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(darkTheme).toBe(true);
  });

  test('dark mode works on contacts page', async ({ page }) => {
    await page.goto('/contacts');
    
    await page.locator('button[aria-label*="dark mode"]').click();
    
    const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(darkTheme).toBe(true);
  });

  test('dark mode works on companies page', async ({ page }) => {
    await page.goto('/companies');
    
    await page.locator('button[aria-label*="dark mode"]').click();
    
    const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(darkTheme).toBe(true);
  });
});

test.describe('All Views', () => {
  test('login view loads correctly', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h1')).toContainText('Login');
  });

  test('register view loads correctly', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('h1')).toContainText('Register');
  });

  test('dashboard view loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('companies view loads correctly', async ({ page }) => {
    await page.goto('/companies');
    await expect(page.locator('h1')).toContainText('Companies');
  });

  test('contacts view loads correctly', async ({ page }) => {
    await page.goto('/contacts');
    await expect(page.locator('h1')).toContainText('Contacts');
  });

  test('tasks view loads correctly', async ({ page }) => {
    await page.goto('/tasks');
    await expect(page.locator('h1')).toContainText('Tasks');
  });

  test('activities view loads correctly', async ({ page }) => {
    await page.goto('/activities');
    await expect(page.locator('h1')).toContainText('Activities');
  });

  test('reports view loads correctly', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.locator('h1')).toContainText('Reports');
  });

  test('search view loads correctly', async ({ page }) => {
    await page.goto('/search');
    await expect(page.locator('h1')).toContainText('Search');
  });
});
