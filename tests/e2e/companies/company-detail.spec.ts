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

    await expect(page.locator('h1', { hasText: /Company|Task Details/ })).toBeVisible();
  });

  test('company detail displays company name', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    await expect(page.locator('h1, [class*="text-lg font-semibold"]')).toBeVisible();
  });

  test('company detail displays company industry', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    const industry = page.locator('dl', { hasText: /Industry/ });
    await expect(industry).toBeVisible();
  });

  test('company detail displays company address', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    const address = page.locator('dl', { hasText: /Address/ });
    await expect(address).toBeVisible();
  });

  test('company detail displays company website', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    const website = page.locator('dl', { hasText: /Website/ });
    await expect(website).toBeVisible();
  });

  test('edit company button navigates to edit form', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    const editBtn = page.locator('a', { hasText: /Edit|Edit Company/ }).first();
    await editBtn.click();

    await expect(page.locator('h1', { hasText: /Edit Company/ })).toBeVisible();
  });

  test('company detail has back link', async ({ page }) => {
    await login(page);
    await page.goto('/companies');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    const backLink = page.locator('a', { hasText: /Back/ });
    await backLink.click();

    await expect(page.locator('h1', { hasText: /Companies/ })).toBeVisible();
  });
});
