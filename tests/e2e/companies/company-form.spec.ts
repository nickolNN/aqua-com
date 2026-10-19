import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Company Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('company form loads correctly', async ({ page }) => {
    await login(page);
    await page.goto('/companies/new');

    await expect(page.locator('h1', { hasHas: /Create Company/ })).toBeVisible();
  });

  test('company form displays required fields', async ({ page }) => {
    await login(page);
    await page.goto('/companies/new');

    await expect(page.locator('label', { hasText: /Company Name/ })).toBeVisible();
    await expect(page.locator('label', { hasText: /Industry/ })).toBeVisible();
  });

  test('company form validates company name is required', async ({ page }) => {
    await login(page);
    await page.goto('/companies/new');

    await page.locator('button', { hasText: /Create Company/ }).click();

    await expect(page.locator('label', { hasText: /Company name is required/ })).toBeVisible();
  });

  test('company form creates company with valid data', async ({ page }) => {
    await login(page);
    await page.goto('/companies/new');

    await page.locator('input[name="name"], #name').fill('Test Company');
    await page.locator('select[name="industry"], select[id="industry"]').selectOption('Technology');
    await page.locator('input[name="website"], #website').fill('test.com');
    await page.locator('input[name="address"], #address').fill('123 Main St');

    await page.locator('button', { hasText: /Create Company/ }).click();

    await expect(page.locator('h1', { hasText: /Companies|Company/ })).toBeVisible();
  });

  test('company form has cancel button', async ({ page }) => {
    await login(page);
    await page.goto('/companies/new');

    await page.locator('a', { hasText: /Cancel/ }).click();

    await expect(page.locator('h1', { hasText: /Companies/ })).toBeVisible();
  });
});
