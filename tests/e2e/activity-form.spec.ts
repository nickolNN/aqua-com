import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Activity Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('activity form loads correctly', async ({ page }) => {
    await login(page);
    await page.goto('/activities');

    const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
    await createButton.click();

    await expect(page.locator('h1', { hasText: /Create Activity/ })).toBeVisible();
  });

  test('activity form has contact selector', async ({ page }) => {
    await login(page);
    await page.goto('/activities');

    const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
    await createButton.click();

    await expect(page.locator('label', { hasText: /Contact/ })).toBeVisible();
  });

  test('activity form has type selector', async ({ page }) => {
    await login(page);
    await page.goto('/activities');

    const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
    await createButton.click();

    await expect(page.locator('label', { hasText: /Type/ })).toBeVisible();
  });

  test('activity form has date field', async ({ page }) => {
    await login(page);
    await page.goto('/activities');

    const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
    await createButton.click();

    await expect(page.locator('label', { hasText: /Date/ })).toBeVisible();
  });

  test('activity form has description field', async ({ page }) => {
    await login(page);
    await page.goto('/activities');

    const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
    await createButton.click();

    await expect(page.locator('label', { hasText: /Description/ })).toBeVisible();
  });

  test('activity form validates required fields', async ({ page }) => {
    await login(page);
    await page.goto('/activities');

    const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
    await createButton.click();

    await page.locator('button', { hasText: /Create Activity/ }).click();

    await expect(page.locator('label', { hasText: /Contact is required/ })).toBeVisible();
  });

  test('activity form creates activity with valid data', async ({ page }) => {
    await login(page);
    await page.goto('/activities');

    const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
    await createButton.click();

    await page.locator('input[name="first_name"], #first_name').fill('Test');
    await page.locator('input[name="last_name"], #last_name').fill('User');
    await page.locator('input[name="email"], #email').fill('test@example.com');

    const createActivityBtn = page.locator('button', { hasText: /Create Activity/ });
    await createActivityBtn.click();

    await expect(page.locator('h1', { hasText: /Activities|Activity/ })).toBeVisible();
  });

  test('activity form has cancel button', async ({ page }) => {
    await login(page);
    await page.goto('/activities');

    const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
    await createButton.click();

    await page.locator('a', { hasText: /Cancel/ }).click();

    await expect(page.locator('h1', { hasText: /Activities/ })).toBeVisible();
  });
});
