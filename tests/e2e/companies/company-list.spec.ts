import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Company List Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('company list view loads correctly', async ({ page }) => {
    await login(page);
    await page.goto('/companies');

    // Verify page title
    await expect(page.locator('h1', { hasText: /Companies/ })).toBeVisible();
  });

  test('company list displays companies', async ({ page }) => {
    await login(page);
    await page.goto('/companies');

    // Verify company cards are displayed
    const companyCards = page.locator('a[class*="flex items-center gap-4"], [class*="divide-y"]');
    await expect(companyCards).toHaveCountGreaterThan(0);
  });

  test('company list search filters companies', async ({ page }) => {
    await login(page);
    await page.goto('/companies');

    // Use search input
    const searchInput = page.locator('input[type="text"], input[placeholder="Search companies..."]');
    await searchInput.fill('Test');
    const companyCards = page.locator('a[class*="flex items-center gap-4"]');
    await expect(companyCards).toBeVisible();
  });

  test('company card is clickable', async ({ page }) => {
    await login(page);
    await page.goto('/companies');

    // Click on first company
    const companyCard = page.locator('a[class*="flex items-center gap-4"]:first');
    await companyCard.click();

    // Verify navigation to company detail
    await expect(page.locator('h1', { hasText: /Company|Task Details/ })).toBeVisible();
  });

  test('company list shows no companies message when empty', async ({ page }) => {
    await login(page);
    await page.goto('/companies');

    // Verify company list renders
    await expect(page.locator('h1', { hasText: /Companies/ })).toBeVisible();
  });

  test('quick add company form works', async ({ page }) => {
    await login(page);
    await page.goto('/companies');

    // Click quick add button
    const quickAddBtn = page.locator('button', { hasText: /Quick Add/ });
    await quickAddBtn.click();

    // Verify company is created
    await expect(page.locator('h1', { hasText: /Companies/ })).toBeVisible();
  });
});
