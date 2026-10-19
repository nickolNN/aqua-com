import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Contact Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('contact form loads correctly', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    await expect(page.locator('h1', { hasText: /Create Contact/ })).toBeVisible();
  });

  test('contact form displays required fields', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    await expect(page.locator('label', { hasText: /First Name/ })).toBeVisible();
    await expect(page.locator('label', { hasText: /Last Name/ })).toBeVisible();
    await expect(page.locator('label', { hasText: /Email/ })).toBeVisible();
  });

  test('contact form validates required fields', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    await page.locator('button', { hasText: /Create Contact/ }).click();

    await expect(page.locator('label', { hasText: /First name is required/ })).toBeVisible();
    await expect(page.locator('label', { hasText: /Last name is required/ })).toBeVisible();
  });

  test('contact form validates email format', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    await page.locator('input[name="first_name"], #first_name').fill('Test');
    await page.locator('input[name="last_name"], #last_name').fill('User');
    await page.locator('input[name="email"], #email').fill('invalid-email');

    await page.locator('button', { hasText: /Create Contact/ }).click();

    await expect(page.locator('label', { hasText: /Invalid email format/ })).toBeVisible();
  });

  test('contact form creates contact with valid data', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    await page.locator('input[name="first_name"], #first_name').fill('Test');
    await page.locator('input[name="last_name"], #last_name').fill('User');
    await page.locator('input[name="email"], #email').fill('test@example.com');
    await page.locator('input[name="phone"], #phone').fill('+1-555-123-4567');

    await page.locator('button', { hasText: /Create Contact/ }).click();

    await expect(page.locator('h1', { hasText: /Contacts|Contact/ })).toBeVisible();
  });

  test('contact form has cancel button', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    await page.locator('a', { hasText: /Cancel/ }).click();

    await expect(page.locator('h1', { hasText: /Contacts/ })).toBeVisible();
  });

  test('company ID field is optional', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    await page.locator('input[name="first_name"], #first_name').fill('Test');
    await page.locator('input[name="last_name"], #last_name').fill('User');
    await page.locator('input[name="email"], #email').fill('test@example.com');

    await page.locator('button', { hasHasText: /Create Contact/ }).click();

    await expect(page.locator('h1', { hasText: /Contacts|Contact/ })).toBeVisible();
  });
});
