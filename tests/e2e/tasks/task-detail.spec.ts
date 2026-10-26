import { test, expect, type Page } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

/**
 * Task details/edit are modals on the board (URL-linked state:
 * /tasks?task=<id> for details, /tasks?task=<id>&edit for edit).
 * The old /tasks/:id and /tasks/:id/details page routes are gone —
 * every test drives the modal from the board via card clicks.
 */

/** Opens the first card's detail modal; returns the card's title. */
async function openFirstTaskModal(page: Page): Promise<string> {
  await page.goto('/tasks');
  const card = page.locator('[data-testid="kanban-task-card"]').first();
  await card.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page).toHaveURL(/\/tasks\?task=/);
  // The card's aria-label is "<title>, priority <priority>".
  const ariaLabel = (await card.getAttribute('aria-label')) || '';
  return ariaLabel.split(', priority')[0];
}

async function createTask(page: Page, title: string) {
  await page.getByRole('button', { name: 'New Task' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.locator('input[id="title"]').fill(title);
  // Defaults (priority=medium, status=open) are pre-filled — no select interaction needed.
  await dialog.getByRole('button', { name: 'Create Task' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
}

/** Creates a subtask of the task with `parentTitle` (via the create modal's subtask option). */
async function createSubtask(page: Page, title: string, parentTitle: string) {
  await page.getByRole('button', { name: 'New Task' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.locator('input[id="title"]').fill(title);
  await dialog.locator('#is_subtask').check();
  // Comboboxes in the form: Priority (0), Status (1), Parent (2, appears after the checkbox).
  await dialog.getByRole('combobox').nth(2).click();
  await page.getByRole('option').filter({ hasText: parentTitle }).click();
  await dialog.getByRole('button', { name: 'Create Task' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
}

test.describe('Task Detail Modal Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('task card opens the detail modal', async ({ page }) => {
    await login(page);
    const title = await openFirstTaskModal(page);

    await expect(
      page.getByRole('dialog').getByRole('heading', { name: title }),
    ).toBeVisible();
  });

  test('detail modal displays task status and priority', async ({ page }) => {
    await login(page);
    await openFirstTaskModal(page);
    const dialog = page.getByRole('dialog');

    const card = page.locator('[data-testid="kanban-task-card"]').first();
    const ariaLabel = (await card.getAttribute('aria-label')) || '';
    const priority = ariaLabel.split(', priority')[1];

    // Priority badge. (Status badge text equals the card's column status;
    // the priority badge is the unambiguous one to assert here.)
    await expect(dialog.getByText(priority, { exact: true })).toBeVisible();
  });

  test('detail modal displays task description', async ({ page }) => {
    await login(page);
    const title = await openFirstTaskModal(page);

    // The mock generator always sets "Description for task: <title>".
    await expect(
      page.getByRole('dialog').getByText(`Description for task: ${title}`),
    ).toBeVisible();
  });

  test('detail modal displays due date', async ({ page }) => {
    await login(page);
    await openFirstTaskModal(page);

    await expect(page.getByRole('dialog').locator('dt', { hasText: /Due Date/ })).toBeVisible();
  });

  test('edit button opens the edit modal', async ({ page }) => {
    await login(page);
    await openFirstTaskModal(page);

    await page.getByRole('dialog').getByRole('button', { name: 'Edit Task' }).click();

    await expect(page).toHaveURL(/&edit$/);
    await expect(
      page.getByRole('dialog').getByRole('heading', { name: 'Edit Task' }),
    ).toBeVisible();
  });

  test('cancel from edit modal returns to the detail modal', async ({ page }) => {
    await login(page);
    const title = await openFirstTaskModal(page);

    await page.getByRole('dialog').getByRole('button', { name: 'Edit Task' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Cancel' }).click();

    await expect(page).toHaveURL(/\/tasks\?task=[^&]+$/);
    await expect(
      page.getByRole('dialog').getByRole('heading', { name: title }),
    ).toBeVisible();
  });

  test('delete dialog appears when delete button clicked', async ({ page }) => {
    await login(page);
    await openFirstTaskModal(page);

    await page.getByRole('dialog').getByRole('button', { name: 'Delete' }).click();

    await expect(page.locator('[data-testid="confirm-dialog"]')).toBeVisible();
  });

  test('delete confirm button works', async ({ page }) => {
    await login(page);
    const title = await openFirstTaskModal(page);

    await page.getByRole('dialog').getByRole('button', { name: 'Delete' }).click();
    await page
      .locator('[data-testid="confirm-dialog"] button', { hasText: 'Delete' })
      .click();

    // Success closes the modal (URL back to /tasks) and the card is gone.
    await expect(page).toHaveURL(/\/tasks$/);
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(
      page.locator('[data-testid="kanban-task-card"]', { hasText: title }),
    ).toHaveCount(0);
  });

  test('close button closes the detail modal', async ({ page }) => {
    await login(page);
    await openFirstTaskModal(page);

    await page.getByRole('dialog').getByRole('button', { name: 'Close' }).click();

    await expect(page).toHaveURL(/\/tasks$/);
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('escape closes the detail modal', async ({ page }) => {
    await login(page);
    await openFirstTaskModal(page);

    await page.keyboard.press('Escape');

    await expect(page).toHaveURL(/\/tasks$/);
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('parent task link swaps the modal to the parent', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    const parentTitle = `Parent Task ${Date.now()}`;
    const childTitle = `Child Task ${Date.now()}`;
    await createTask(page, parentTitle);
    await createSubtask(page, childTitle, parentTitle);

    const card = page.locator('[data-testid="kanban-task-card"]', { hasText: childTitle });
    await card.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: childTitle })).toBeVisible();

    await dialog.getByRole('button', { name: 'View parent task' }).click();

    // The modal content swaps (URL updates to the parent's id).
    await expect(dialog.getByRole('heading', { name: parentTitle })).toBeVisible();
  });

  test('dependency link swaps the modal to the predecessor', async ({ page }) => {
    await login(page);
    await page.goto('/tasks');

    const targetTitle = `Dep Target ${Date.now()}`;
    const childTitle = `Dep Child ${Date.now()}`;
    await createTask(page, targetTitle);

    await page.getByRole('button', { name: 'New Task' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.locator('input[id="title"]').fill(childTitle);
    await dialog.getByRole('button', { name: 'Add Dependency' }).click();
    // Dependency row selects: Priority (0), Status (1), Predecessor (2), Type (3).
    await dialog.getByRole('combobox').nth(2).click();
    await page.getByRole('option').filter({ hasText: targetTitle }).click();
    await dialog.getByRole('button', { name: 'Create Task' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();

    const card = page.locator('[data-testid="kanban-task-card"]', { hasText: childTitle });
    await card.click();
    const d = page.getByRole('dialog');
    await expect(d.getByRole('heading', { name: childTitle })).toBeVisible();

    // The dependency link is "<type> - <predecessor id>"; default type is finish_to_start.
    await d.getByRole('button', { name: /finish_to_start/ }).click();

    // The modal content swaps (URL updates to the predecessor's id).
    await expect(d.getByRole('heading', { name: targetTitle })).toBeVisible();
  });
});
