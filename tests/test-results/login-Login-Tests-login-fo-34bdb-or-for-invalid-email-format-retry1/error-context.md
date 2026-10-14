# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login Tests >> login form validation shows error for invalid email format
- Location: tests/e2e/login.spec.ts:46:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('p.text-xs.text-destructive').filter({ hasText: 'Invalid email format' })
Expected: visible
Timeout: 1000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('p.text-xs.text-destructive').filter({ hasText: 'Invalid email format' }) with timeout 1000ms
  - waiting for locator('p.text-xs.text-destructive').filter({ hasText: 'Invalid email format' })

```

```yaml
- heading "Aqua CRM" [level=1]
- paragraph: Sign in to your account
- text: Email
- textbox "Email":
  - /placeholder: Enter your email
  - text: invalid-email
- text: Password
- textbox "Password":
  - /placeholder: Enter your password
  - text: password123
- link "Forgot password?":
  - /url: /password-reset
- button "Sign in"
- paragraph:
  - text: Don't have an account?
  - link "Register":
    - /url: /register
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login, setupTestEnvironment } from './fixtures/setup';
  3  | 
  4  | test.describe('Login Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('login with valid credentials', async ({ page }) => {
  10 |     await login(page);
  11 | 
  12 |     // Verify navigation to dashboard
  13 |     await expect(page).toHaveURL('/');
  14 |     await expect(page.locator('h1')).toBeVisible();
  15 | 
  16 |     // Verify token was stored in localStorage
  17 |     const token = await page.evaluate(() => localStorage.getItem('token'));
  18 |     expect(token).toBeTruthy();
  19 |   });
  20 | 
  21 |   test('login with invalid credentials shows error', async ({ page }) => {
  22 |     await login(page);
  23 | 
  24 |     // Fill in invalid credentials
  25 |     await page.locator('#email').fill('invalid@example.com');
  26 |     await page.locator('#password').fill('wrongpassword');
  27 | 
  28 |     // Submit login form
  29 |     await page.locator('button[type="submit"]').click();
  30 | 
  31 |     // Verify error message is displayed
  32 |     await expect(page.locator('div.rounded-md.border.border-destructive')).toBeVisible();
  33 |   });
  34 | 
  35 |   test('login form validation shows errors for empty fields', async ({ page }) => {
  36 |     await page.goto('/login');
  37 | 
  38 |     // Click submit without filling any fields
  39 |     await page.locator('button[type="submit"]').click();
  40 | 
  41 |     // Verify validation errors appear
  42 |     await expect(page.locator('p.text-xs.text-destructive', { hasText: 'Email is required' })).toBeVisible();
  43 |     await expect(page.locator('p.text-xs.text-destructive', { hasText: 'Password is required' })).toBeVisible();
  44 |   });
  45 | 
  46 |   test('login form validation shows error for invalid email format', async ({ page }) => {
  47 |     await page.goto('/login');
  48 | 
  49 |     // Fill invalid email
  50 |     await page.locator('#email').fill('invalid-email');
  51 |     await page.locator('#password').fill('password123');
  52 | 
  53 |     // Submit
  54 |     await page.locator('button[type="submit"]').click();
  55 | 
  56 |     // Verify error message
> 57 |     await expect(page.locator('p.text-xs.text-destructive', { hasText: 'Invalid email format' })).toBeVisible();
     |                                                                                                   ^ Error: expect(locator).toBeVisible() failed
  58 |   });
  59 | });
  60 | 
```