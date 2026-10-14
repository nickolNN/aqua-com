# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: password-reset.spec.ts >> Password Reset Tests >> password reset shows success state
- Location: tests/e2e/password-reset.spec.ts:40:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h2').filter({ hasText: 'Check your email' })
Expected: visible
Timeout: 1000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('h2').filter({ hasText: 'Check your email' }) with timeout 1000ms
  - waiting for locator('h2').filter({ hasText: 'Check your email' })

```

```yaml
- heading "Aqua CRM" [level=1]
- paragraph: Sign in to your account
- text: Failed to send reset email. Please try again. Email
- textbox "Email":
  - /placeholder: Enter your email
  - text: test@example.com
- button "Send reset link"
- paragraph:
  - link "Back to login":
    - /url: /login
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { setupTestEnvironment } from './fixtures/setup';
  3  | 
  4  | test.describe('Password Reset Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('password reset page displays correctly', async ({ page }) => {
  10 |     await page.goto('/password-reset');
  11 | 
  12 |     // Verify page content
  13 |     await expect(page.locator('form')).toBeVisible();
  14 |     await expect(page.locator('#email')).toBeVisible();
  15 |   });
  16 | 
  17 |   test('password reset form validation shows errors for empty email', async ({ page }) => {
  18 |     await page.goto('/password-reset');
  19 | 
  20 |     // Click submit without filling any fields
  21 |     await page.locator('button[type="submit"]').click();
  22 | 
  23 |     // Verify validation errors appear
  24 |     await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Email is required' })).toBeVisible();
  25 |   });
  26 | 
  27 |   test('password reset form validates email format', async ({ page }) => {
  28 |     await page.goto('/password-reset');
  29 | 
  30 |     // Fill invalid email
  31 |     await page.locator('#email').fill('invalid-email');
  32 | 
  33 |     // Submit
  34 |     await page.locator('button[type="submit"]').click();
  35 | 
  36 |     // Verify error message
  37 |     await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Invalid email format' })).toBeVisible();
  38 |   });
  39 | 
  40 |   test('password reset shows success state', async ({ page }) => {
  41 |     await page.goto('/password-reset');
  42 | 
  43 |     // Fill valid email
  44 |     await page.locator('#email').fill('test@example.com');
  45 | 
  46 |     // Submit
  47 |     await page.locator('button[type="submit"]').click();
  48 | 
  49 |     // Verify success state with message
> 50 |     await expect(page.locator('h2', { hasText: 'Check your email' })).toBeVisible();
     |                                                                       ^ Error: expect(locator).toBeVisible() failed
  51 |   });
  52 | });
  53 | 
```