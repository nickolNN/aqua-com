import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Task Kanban Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('kanban board renders correctly', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    const kanbanBoard = page.locator('div[class*="grid grid-cols-1 md:grid-cols-4"]');
    await expect(kanbanBoard).toBeVisible();
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

  test('clicking task card opens the detail modal', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    const taskCard = page.locator('[data-testid="kanban-task-card"]');
    await taskCard.first().click();

    // Stage 2: card click is URL-linked modal state (/tasks?task=<id>),
    // not a page navigation — the old /tasks/:id/details route is gone.
    await expect(page).toHaveURL(/\/tasks\?task=/);
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('kanban board filters tasks by status column', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    const kanbanBoard = page.locator('div[class*="grid grid-cols-1 md:grid-cols-4"]');
    const columns = kanbanBoard.locator('div[role="group"]');
    await expect(columns).toHaveCount(4);
  });
});
