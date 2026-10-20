import { test, expect } from '@playwright/test';

test.describe('Dark Mode', () => {
  test('dark mode toggle works', async ({ page }) => {
    await page.goto('/');

    const initialTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(initialTheme).toBe(false);

    // Theme-independent selector.
    await page.locator('[data-testid="theme-toggle"]').click();

    const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(darkTheme).toBe(true);

    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe('dark');
  });

  test('dark mode persists on reload', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-testid="theme-toggle"]').click();

    await page.reload();

    // .dark is only applied after the store rehydrates and ThemeContext's
    // effect runs; an immediate evaluate after reload loses that race.
    await expect
      .poll(() => page.evaluate(() => document.documentElement.classList.contains('dark')))
      .toBe(true);
  });

  test('dark mode works on login page', async ({ page }) => {
    await page.goto('/login');

    await page.locator('[data-testid="theme-toggle"]').click();

    const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(darkTheme).toBe(true);
  });

  test('dark mode works on tasks page', async ({ page }) => {
    await page.goto('/tasks');

    await page.locator('[data-testid="theme-toggle"]').click();

    const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(darkTheme).toBe(true);
  });
});
