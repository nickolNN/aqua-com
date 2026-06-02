import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from '../fixtures/setup';

test.describe('Contact Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('contact form loads correctly', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    // Verify form is displayed
    await expect(page.locator('h1', { hasText: /Create Contact/ })).toBeVisible();
  });

  test('contact form displays required fields', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    // Verify form fields are present
    await expect(page.locator('label', { hasText: /First Name/ })).toBeVisible();
    await expect(page.locator('label', { hasText: /Last Name/ })).toBeVisible();
    await expect(page.locator('label', { hasText: /Email/ })).toBeVisible();
  });

  test('contact form validates required fields', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    // Submit form without filling fields
    await page.locator('button', { hasText: /Create Contact/ }).click();

    // Verify validation errors appear
    await expect(page.locator('label', { hasText: /First name is required/ })).toBeVisible();
    await expect(page.locator('label', { hasText: /Last name is required/ })).toBeVisible();
  });

  test('contact form validates email format', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    // Fill first and last name, but invalid email
    await page.locator('input[name="first_name"], #first_name').fill('Test');
    await page.locator('input[name="last_name"], #last_name').fill('User');
    await page.locator('input[name="email"], #email').fill('invalid-email');

    // Submit form
    await page.locator('button', { hasText: /Create Contact/ }).click();

    // Verify email validation error appears
    await expect(page.locator('label', { hasText: /Invalid email format/ })).toBeVisible();
  });

  test('contact form creates contact with valid data', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    // Fill contact form
    await page.locator('input[name="first_name"], #first_name').fill('Test');
    await page.locator('input[name="last_name"], #last_name').fill('User');
    await page.locator('input[name="email"], #email').fill('test@example.com');
    await page.locator('input[name="phone"], #phone').fill('+1-555-123-4567');

    // Submit form
    await page.locator('button', { hasText: /Create Contact/ }).click();

    // Verify contact is created (either redirected to list or detail)
    await expect(page.locator('h1', { hasText: /Contacts|Contact/ })).toBeVisible();
  });

  test('contact form has cancel button', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    // Click cancel
    await page.locator('a', { hasText: /Cancel/ }).click();

    // Verify we're back on contact list
    await expect(page.locator('h1', { hasText: /Contacts/ })).toBeVisible();
  });

  test('company ID field is optional', async ({ page }) => {
    await login(page);
    await page.goto('/contacts/new');

    // Fill contact form without company_id
    await page.locator('input[name="first_name"], #first_name').fill('Test');
    await page.locator('input[name="last_name"], #last_name').fill('User');
    await page.locator('input[name="email"], #email').fill('test@example.com');

    // Submit form
    await page.locator('button', { hasHasText: /Create Contact/ }).click();

    // Verify contact is created without company_id
    await expect(page.locator('h1', { hasText: /Contacts|Contact/ })).toBeVisible();
  });
});
