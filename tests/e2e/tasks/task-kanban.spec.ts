import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Task Kanban Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('kanban board renders correctly', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Click kanban view button
    const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
    await kanbanBtn.click();

    // Verify kanban board is displayed
    await expect(page.locator('h1', { hasText: /Kanban Board/ })).toBeVisible();
  });

  test('kanban board shows columns', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Click kanban view button
    const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
    await kanbanBtn.click();

    // Verify kanban columns are rendered
    const kanbanBoard = page.locator('div[class*="grid grid-cols-1 md:grid-cols-4"]');
    await expect(kanbanBoard).toBeVisible();
  });

  test('kanban board shows task cards in columns', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Click kanban view button
    const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
    await kanbanBtn.click();

    // Verify task cards are displayed in columns
    const taskCards = page.locator('div[class*="rounded-lg p-3"]:first');
    await expect(taskCards).toBeVisible();
  });

  test('kanban column has add task button', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Click kanban view button
    const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
    await kanbanBtn.click();

    // Verify "+ Add Task" button exists in columns
    const addTaskBtn = page.locator('button', { hasText: /Add Task/ });
    await expect(addTaskBtn).toBeVisible();
  });

  test('clicking task card navigates to detail', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Click kanban view button
    const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
    await kanbanBtn.click();

    // Click on task card
    const taskCard = page.locator('div[class*="rounded-lg p-3"]:first');
    await taskCard.click();

    // Verify navigation to task detail
    await expect(page.locator('h1', { hasText: /Task Details/ })).toBeVisible();
  });

  test('kanban board filters tasks by status column', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Click kanban view button
    const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
    await kanbanBtn.click();

    // Verify tasks are organized in columns by status
    const kanbanBoard = page.locator('div[class*="grid grid-cols-1 md:grid-cols-4"]');
    const columns = kanbanBoard.locator('div[class*="rounded-lg p-3"]');
    await expect(columns).toHaveCountGreaterThan(0);
  });

  test('back to list button works', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    // Click kanban view button
    const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
    await kanbanBtn.click();

    // Click back button
    const backBtn = page.locator('button', { hasText: /Back to List/ });
    await backBtn.click();

    // Verify list view is displayed
    await expect(page.locator('h1', { hasText: /Tasks/ })).toBeVisible();
  });
});
