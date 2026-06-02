import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Task Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('task form loads correctly', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    // Verify form is displayed
    await expect(page.locator('h1', { hasText: /Create Task/ })).toBeVisible();
  });

  test('task form displays all required fields', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    // Verify form fields are present
    await expect(page.locator('label', { hasText: /Title/ })).toBeVisible();
    await expect(page.locator('label', { hasText: /Priority/ })).toBeVisible();
    await expect(page.locator('label', { hasText: /Status/ })).toBeVisible();
  });

  test('task title is required', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    // Fill form without title
    await page.locator('label', { hasText: /Priority/ }).locator('..').locator('select').click();
    await page.locator('div[role="option"]:first').click();

    // Submit form
    await page.locator('button', { hasText: /Create Task/ }).click();

    // Verify validation error appears
    await expect(page.locator('label', { hasText: /Title is required/ })).toBeVisible();
  });

  test('task form with valid data creates task', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    // Fill task title
    await page.locator('input[id="title"]').fill('Test Task');

    // Select priority
    await page.locator('label', { hasText: /Priority/ }).locator('..').locator('select').click();
    await page.locator('div[role="option"]', { hasText: /Medium/ }).click();

    // Select status
    await page.locator('label', { hasText: /Status/ }).locator('..').locator('select').click();
    await page.locator('div[role="option"]', { hasText: /Open/ }).click();

    // Click submit
    await page.locator('button', { hasText: /Create Task/ }).click();

    // Verify task is created (either redirected to list or detail)
    await expect(page.locator('h1', { hasText: /Task/ })).toBeVisible();
  });

  test('task form shows priority options', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    // Click priority selector
    await page.locator('label', { hasText: /Priority/ }).locator('..').locator('select').click();

    // Verify options are displayed
    const options = page.locator('div[role="option"]');
    await expect(options).toHaveCount(4); // low, medium, high, urgent
  });

  test('task form shows status options', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    // Click status selector
    await page.locator('label', { hasText: /Status/ }).locator('..').locator('select').click();

    // Verify options are displayed
    const options = page.locator('div[role="option"]');
    await expect(options).toHaveCount(4); // open, in_progress, completed, cancelled
  });

  test('task form can be submitted with description', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    // Fill task title
    await page.locator('input[id="title"]').fill('Test Task');

    // Fill description
    await page.locator('textarea').fill('This is a test description');

    // Submit
    await page.locator('button', { hasText: /Create Task/ }).click();

    // Verify success
    await expect(page.locator('h1', { hasText: /Task/ })).toBeVisible();
  });

  test('task form has cancel button', async ({ page }) => {
    await login(page);
    await page.goto('/tasks/new');

    // Click cancel
    await page.locator('a', { hasText: /Cancel/ }).click();

    // Verify we're back on task list
    await expect(page.locator('h1', { hasText: /Tasks/ })).toBeVisible();
  });
});
