import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Task Kanban Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('kanban board renders correctly', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    await expect(page.locator('h1', { hasText: /Kanban Board/ })).toBeVisible();
  });

  test('kanban board shows columns', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    const kanbanBoard = page.locator('div[class*="grid grid-cols-1 md:grid-cols-4"]');
    await expect(kanbanBoard).toBeVisible();
  });

  test('kanban board shows task cards in columns', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    const taskCards = page.locator('[data-testid="kanban-task-card"]');
    await expect(taskCards.first()).toBeVisible();
  });

  test('kanban column has add task button', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    const addTaskBtn = page.locator('button', { hasText: /Add Task/ });
    await expect(addTaskBtn.first()).toBeVisible();
  });

  test('clicking task card navigates to detail', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    const taskCard = page.locator('[data-testid="kanban-task-card"]');
    await taskCard.first().click();

    await expect(page.locator('h1', { hasText: /Task Details/ })).toBeVisible();
  });

  test('kanban board filters tasks by status column', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    const kanbanBoard = page.locator('div[class*="grid grid-cols-1 md:grid-cols-4"]');
    const columns = kanbanBoard.locator('div[role="group"]');
    await expect(columns).toHaveCount(4);
  });
});
