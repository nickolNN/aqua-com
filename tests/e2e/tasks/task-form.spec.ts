import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Task Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('task form loads correctly', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    await expect(page.locator('h1', { hasText: /Create Task/ })).toBeVisible();
  });

  test('task form displays all required fields', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    await expect(page.locator('label', { hasText: /Title/ })).toBeVisible();
    await expect(page.locator('label', { hasText: /Priority/ })).toBeVisible();
    await expect(page.locator('label', { hasText: /Status/ })).toBeVisible();
  });

  test('task title is required', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    await page.getByRole('combobox', { name: /priority/i }).click();
    await page.locator('div[role="option"]').first().click();

    await page.locator('button', { hasText: /Create Task/ }).click();

    await expect(page.locator('p', { hasText: /Title is required/ })).toBeVisible();
  });

  test('task form with valid data creates task', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    await page.locator('input[id="title"]').fill('Test Task');

    await page.getByRole('combobox', { name: /priority/i }).click();
    await page.locator('div[role="option"]', { hasText: 'Medium' }).click();

    await page.getByRole('combobox', { name: /status/i }).click();
    await page.locator('div[role="option"]', { hasText: 'Open' }).click();

    await page.locator('button', { hasText: /Create Task/ }).click();

    await expect(page.locator('h1', { hasText: /Kanban Board/ })).toBeVisible();
  });

  test('task form shows priority options', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    await page.getByRole('combobox', { name: /priority/i }).click();

    const options = page.locator('div[role="option"]');
    await expect(options).toHaveCount(4);
  });

  test('task form shows status options', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    await page.getByRole('combobox', { name: /status/i }).click();

    const options = page.locator('div[role="option"]');
    await expect(options).toHaveCount(4);
  });

  test('task form can be submitted with description', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    await page.locator('input[id="title"]').fill('Test Task');

    await page.locator('textarea').fill('This is a test description');

    await page.locator('button', { hasText: /Create Task/ }).click();

    await expect(page.locator('h1', { hasText: /Kanban Board/ })).toBeVisible();
  });

  test('task form has cancel button', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    // Two Cancel links (header + footer) — take the first.
    await page.locator('a', { hasText: /Cancel/ }).first().click();

    await expect(page.locator('h1', { hasText: /Kanban Board/ })).toBeVisible();
  });
});
