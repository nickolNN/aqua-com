import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Company Detail Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('company detail view loads correctly', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Verify company detail is displayed
    await expect(page.locator('h1', { hasText: /Company|Task Details/ })).toBeVisible();
  });

  test('company detail displays company name', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Verify company name is displayed
    await expect(page.locator('h1, [class*="text-lg font-semibold"]')).toBeVisible();
  });

  test('company detail displays company industry', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Verify industry is displayed
    const industry = page.locator('dl', { hasText: /Industry/ });
    await expect(industry).toBeVisible();
  });

  test('company detail displays company address', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Verify address is displayed
    const address = page.locator('dl', { hasText: /Address/ });
    await expect(address).toBeVisible();
  });

  test('company detail displays company website', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Verify website is displayed
    const website = page.locator('dl', { hasText: /Website/ });
    await expect(website).toBeVisible();
  });

  test('edit company button navigates to edit form', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Click edit button (goes to company form via URL pattern)
    const editBtn = page.locator('a', { hasText: /Edit|Edit Company/ }).first();
    await editBtn.click();

    // Verify we're on the edit form
    await expect(page.locator('h1', { hasText: /Edit Company/ })).toBeVisible();
  });

  test('company detail has back link', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Click back link
    const backLink = page.locator('a', { hasText: /Back/ });
    await backLink.click();

    // Verify we're back on company list
    await expect(page.locator('h1', { hasText: /Companies/ })).toBeVisible();
  });
});
