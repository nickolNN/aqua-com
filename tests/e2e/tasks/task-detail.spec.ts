import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Task Detail Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('task detail view loads correctly', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');
    await page.locator('a[class*="border rounded-lg p-4"]').first().click();

    // Verify task detail is displayed
    await expect(page.locator('h1', { hasText: /Task Details/ })).toBeVisible();
  });

  test('task detail displays task title', async ({ page }) => {
    await login(page);
    await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();

    // Verify task title is displayed
    await expect(page.locator('h1, [class*="text-lg font-semibold"]')).toBeVisible();
  });

  test('task detail displays task status and priority', async ({ page }) => {
    await login(page);
    await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();

    // Verify status and priority badges are displayed
    const badges = page.locator('button[variant*="badge"], [class*="rounded"]');
    await expect(badges).toBeVisible();
  });

  test('task detail displays task description', async ({ page }) => {
    await login(page);
    await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();

    // Verify description is displayed
    const description = page.locator('dl, [class*="text-sm text-muted-foreground"]');
    await expect(description).toBeVisible();
  });

  test('task detail displays due date', async ({ page }) => {
    await login(page);
    await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();

    // Verify due date is displayed
    await expect(page.locator('dl dt', { hasText: /Due Date/ })).toBeVisible();
  });

  test('edit button navigates to edit form', async ({ page }) => {
    await login(page);
    await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();

    // Click edit button
    const editBtn = page.locator('button', { hasText: /Edit Task/ }).first();
    await editBtn.click();

    // Verify we're on the edit form
    await expect(page.locator('h1', { hasText: /Edit Task/ })).toBeVisible();
  });

  test('delete dialog appears when delete button clicked', async ({ page }) => {
    await login(page);
    await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();

    // Click delete button
    const deleteBtn = page.locator('button', { hasText: /Delete/ });
    await deleteBtn.click();

    // Verify confirm dialog appears
    await expect(page.locator('div[class*="fixed inset-0"], [role="dialog"]')).toBeVisible();
  });

  test('delete confirm button works', async ({ page }) => {
    await login(page);
    await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();

    // Click delete button
    const deleteBtn = page.locator('button', { hasText: /Delete/ });
    await deleteBtn.click();

    // Click confirm button
    const confirmBtn = page.locator('button', { hasText: /Delete/, visible: true });
    await confirmBtn.click();

    // Verify success message or redirect
    await expect(page.locator('h1', { hasText: /Task Details/ })).toBeVisible();
  });

  test('back link navigates to task list', async ({ page }) => {
    await login(page);
    await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();

    // Click back link
    const backLink = page.locator('a', { hasText: /Back|Back to tasks/ });
    await backLink.click();

    // Verify we're back on tasks list
    await expect(page.locator('h1', { hasText: /Tasks/ })).toBeVisible();
  });
});
