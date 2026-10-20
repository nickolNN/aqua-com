import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

async function openFirstTaskCard(page: Parameters<typeof login>[0]) {
  await page.goto('/tasks');
  await page.locator('[data-testid="kanban-task-card"]').first().click();
  await expect(page.locator('h1', { hasText: /Task Details/ })).toBeVisible();
}

test.describe('Task Detail Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('task detail view loads correctly', async ({ page }) => {
    await login(page);
    await openFirstTaskCard(page);

    await expect(page.locator('h1', { hasText: /Task Details/ })).toBeVisible();
  });

  test('task detail displays task title', async ({ page }) => {
    await login(page);
    await openFirstTaskCard(page);

    await expect(page.locator('p[class*="text-lg font-semibold"]')).toBeVisible();
  });

  test('task detail displays task status and priority', async ({ page }) => {
    await login(page);
    await openFirstTaskCard(page);

    const badges = page.locator('span[class*="rounded-md px-2.5"]');
    await expect(badges.first()).toBeVisible();
  });

  test('task detail displays task description', async ({ page }) => {
    await login(page);
    await openFirstTaskCard(page);

    const description = page.locator('div[class*="text-sm text-muted-foreground mb-4"]');
    await expect(description).toBeVisible();
  });

  test('task detail displays due date', async ({ page }) => {
    await login(page);
    await openFirstTaskCard(page);

    await expect(page.locator('dl dt', { hasText: /Due Date/ })).toBeVisible();
  });

  test('edit button navigates to edit form', async ({ page }) => {
    await login(page);
    await openFirstTaskCard(page);

    const editBtn = page.locator('button', { hasText: /Edit Task/ }).first();
    await editBtn.click();

    await expect(page.locator('h1', { hasText: /Edit Task/ })).toBeVisible();
  });

  test('delete dialog appears when delete button clicked', async ({ page }) => {
    await login(page);
    await openFirstTaskCard(page);

    const deleteBtn = page.locator('button', { hasText: /Delete/ });
    await deleteBtn.click();

    await expect(page.locator('div[class*="fixed inset-0"], [role="dialog"]')).toBeVisible();
  });

  test('delete confirm button works', async ({ page }) => {
    await login(page);
    await openFirstTaskCard(page);

    const deleteBtn = page.locator('button', { hasText: /Delete/ });
    await deleteBtn.click();

    const confirmBtn = page.locator('button', { hasText: /Delete/, visible: true }).last();
    await confirmBtn.click();

    await expect(page.locator('h1', { hasText: /Kanban Board/ })).toBeVisible();
  });

  test('back link navigates to task list', async ({ page }) => {
    await login(page);
    await openFirstTaskCard(page);

    const backLink = page.locator('a[aria-label="Back to tasks"]');
    await backLink.click();

    await expect(page.locator('h1', { hasText: /Kanban Board/ })).toBeVisible();
  });
});
