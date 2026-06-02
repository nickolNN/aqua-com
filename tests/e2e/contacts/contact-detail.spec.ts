import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Contact Detail Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('contact detail view loads correctly', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Verify contact detail is displayed
    await expect(page.locator('h1', { hasText: /Contact|Task Details/ })).toBeVisible();
  });

  test('contact detail displays contact information', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Verify contact information is displayed
    await expect(page.locator('dl')).toBeVisible();
  });

  test('contact detail displays email', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Verify email is displayed
    const email = page.locator('dl dt', { hasText: /Email/ });
    await expect(email).toBeVisible();
  });

  test('contact detail displays phone', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Verify phone is displayed
    const phone = page.locator('dl dt', { hasText: /Phone/ });
    await expect(phone).toBeVisible();
  });

  test('edit contact button navigates to edit form', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Click edit button (goes to contact form via URL pattern)
    const editBtn = page.locator('a', { hasText: /Edit|Edit Contact/ }).first();
    await editBtn.click();

    // Verify we're on the edit form
    await expect(page.locator('h1', { hasText: /Edit Contact/ })).toBeVisible();
  });

  test('contact detail has back link', async ({ page }) => {
    await login(page);
    await page.goto('/contacts');
    await page.locator('a[class*="flex items-center gap-4"]:first').click();

    // Click back link
    const backLink = page.locator('a', { hasText: /Back/ });
    await backLink.click();

    // Verify we're back on contact list
    await expect(page.locator('h1', { hasText: /Contacts/ })).toBeVisible();
  });
});
