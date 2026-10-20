import { test, expect, type Page } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

/**
 * Task creation is a modal on the board (URL-linked state: /tasks?new).
 * The old /tasks/new page route is gone — every test drives the modal
 * from the board via the "New Task" button.
 */

const openCreateModal = async (page: Page) => {
  await page.getByRole('button', { name: 'New Task' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
};

test.describe('Task Form Modal Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('new task button opens the create modal', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    await openCreateModal(page);

    await expect(page).toHaveURL(/\/tasks\?new$/);
    await expect(
      page.getByRole('dialog').getByRole('heading', { name: 'Create Task' }),
    ).toBeVisible();
  });

  test('create modal displays all required fields', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    await openCreateModal(page);

    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('label', { hasText: /Title/ })).toBeVisible();
    await expect(dialog.locator('label', { hasText: /Priority/ })).toBeVisible();
    await expect(dialog.locator('label', { hasText: /Status/ })).toBeVisible();
  });

  test('task title is required', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    await openCreateModal(page);

    await page.getByRole('button', { name: 'Create Task' }).click();

    await expect(
      page.getByRole('dialog').getByText('Title is required'),
    ).toBeVisible();
    // The dialog stays open on validation failure.
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('valid data creates task and closes the modal', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    await openCreateModal(page);

    await page.locator('input[id="title"]').fill('Modal Test Task');

    await page.getByRole('combobox', { name: /priority/i }).click();
    await page.getByRole('option').filter({ hasText: 'Medium' }).click();

    await page.getByRole('combobox', { name: /status/i }).click();
    await page.getByRole('option').filter({ hasText: 'Open' }).click();

    await page.getByRole('button', { name: 'Create Task' }).click();

    // Success closes the modal (URL back to /tasks) and the board shows the card.
    await expect(page).toHaveURL(/\/tasks$/);
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(
      page.locator('[data-testid="kanban-task-card"]', { hasText: 'Modal Test Task' }),
    ).toBeVisible();
  });

  test('create modal shows priority options', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    await openCreateModal(page);

    await page.getByRole('combobox', { name: /priority/i }).click();

    const options = page.getByRole('option');
    await expect(options).toHaveCount(4);
  });

  test('create modal shows status options', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    await openCreateModal(page);

    await page.getByRole('combobox', { name: /status/i }).click();

    const options = page.getByRole('option');
    await expect(options).toHaveCount(4);
  });

  test('task can be submitted with description', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    await openCreateModal(page);

    await page.locator('input[id="title"]').fill('Described Task');
    await page.locator('textarea').fill('This is a test description');

    await page.getByRole('button', { name: 'Create Task' }).click();

    await expect(page).toHaveURL(/\/tasks$/);
    await expect(
      page.locator('[data-testid="kanban-task-card"]', { hasText: 'Described Task' }),
    ).toBeVisible();
  });

  test('cancel button closes the modal', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    await openCreateModal(page);

    await page.getByRole('dialog').getByRole('button', { name: 'Cancel' }).click();

    await expect(page).toHaveURL(/\/tasks$/);
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});
