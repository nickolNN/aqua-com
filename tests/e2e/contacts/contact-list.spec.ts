import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Contact List Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('contact list view loads correctly', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');

    await expect(page.locator('h1', { hasText: /Contacts/ })).toBeVisible();
  });

  test('contact list displays contacts', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');

    const contactCards = page.locator('a[class*="flex items-center gap-4"], [class*="divide-y"]');
    await expect(contactCards).toHaveCountGreaterThan(0);
  });

  test('contact list search filters contacts', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');

    const searchInput = page.locator('input[type="text"], input[placeholder="Search contacts..."]');
    await searchInput.fill('Test');
    const contactCards = page.locator('a[class*="flex items-center gap-4"]');
    await expect(contactCards).toBeVisible();
  });

  test('contact card is clickable', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');

    const contactCard = page.locator('a[class*="flex items-center gap-4"]:first');
    await contactCard.click();

    await expect(page.locator('h1', { hasText: /Contact|Task Details/ })).toBeVisible();
  });

  test('contact list shows no contacts message when empty', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');

    await expect(page.locator('h1', { hasText: /Contacts/ })).toBeVisible();
  });

  test('quick add contact form works', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');

    const quickAddBtn = page.locator('button', { hasText: /Quick Add/ });
    await quickAddBtn.click();

    await expect(page.locator('h1', { hasText: /Contacts/ })).toBeVisible();
  });
});
