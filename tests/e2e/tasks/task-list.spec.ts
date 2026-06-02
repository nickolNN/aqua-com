import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Task List Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('task list view loads correctly', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Verify page title
    await expect(page.locator('h1', { hasText: /Tasks|Kanban Board/ })).toBeVisible();
  });

  test('task list displays tasks from API', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Verify tasks are displayed (tasks list view shows individual task cards)
    const taskCards = page.locator('a[role="link"], [class*="border rounded-lg p-4"]');
    await expect(taskCards).toHaveCountGreaterThan(0);
  });

  test('task list search filters tasks', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Use the search input
    const searchInput = page.locator('input[type="text"], input[placeholder="Search tasks..."]');
    await searchInput.fill('Review project proposal');
    const taskCards = page.locator('a[role="link"], [class*="border rounded-lg p-4"]');
    await expect(taskCards).toBeVisible();
  });

  test('kanban toggle displays kanban board', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Click the Kanban Board button to switch to kanban view
    const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
    await kanbanBtn.click();

    // Verify kanban board is displayed
    await expect(page.locator('h1', { hasText: /Kanban Board/ })).toBeVisible();
  });

  test('kanban board displays task columns', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Ensure we're in kanban view
    const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
    if (await kanbanBtn.isVisible()) {
      await kanbanBtn.click();
    }

    // Kanban columns are rendered as columns for open, in_progress, completed, cancelled
    const kanbanColumns = page.locator('div[class*="grid grid-cols-1 md:grid-cols-4"]');
    await expect(kanbanColumns).toBeVisible();
  });

  test('kanban board columns have correct labels', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Click to switch to kanban view
    const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
    await kanbanBtn.click();

    // Verify kanban columns are rendered with their labels
    const kanbanBoard = page.locator('div[class*="grid grid-cols-1 md:grid-cols-4"]');
    const columns = kanbanBoard.locator('h3');
    await expect(columns).toHaveCountGreaterThan(0);
  });

  test('task card is clickable and navigates to detail', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Wait for task cards to load
    const taskCard = page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]:first');
    await taskCard.click();

    // Verify navigation to task detail page
    await expect(page.locator('h1', { hasText: /Task Details|Task/ })).toBeVisible();
  });
});
