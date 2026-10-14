# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.ts >> Registration Tests >> register with valid data
- Location: tests/e2e/register.spec.ts:9:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:3000/login"
Received: "http://localhost:3000/"
Timeout:  1000ms

Call log:
  - Expect "toHaveURL" with timeout 1000ms
    11 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://localhost:3000/"

```

```yaml
- complementary:
  - text: Aqua CRM
  - navigation:
    - link "Dashboard":
      - /url: /
    - link "Contacts":
      - /url: /contacts
    - link "Companies":
      - /url: /companies
    - link "Tasks":
      - /url: /tasks
    - link "Activities":
      - /url: /activities
    - button "Switch to dark mode"
    - button "Log out"
- textbox "Global search":
  - /placeholder: Search contacts, tasks, companies...
- main:
  - heading "Dashboard" [level=1]
  - paragraph: Overview of your CRM activity and performance
  - paragraph: Total Contacts
  - paragraph: "120"
  - paragraph: ↑ 20 vs last month
  - paragraph: Open Tasks
  - paragraph: "12"
  - paragraph: ↓ 0 vs last month
  - paragraph: Activities This Week
  - paragraph: "35"
  - paragraph: Active Deals
  - paragraph: "12"
  - paragraph: ↑ 5 vs last month
  - heading "Task Status Breakdown" [level=3]
  - text: Completed 14 (31.1%) Open 12 (26.7%) Cancelled 10 (22.2%) In Progress 9 (20.0%)
  - heading "Activity Type Breakdown" [level=3]
  - text: Note 7 (20.0%) Deal 7 (20.0%) Meeting 5 (14.3%) Task 5 (14.3%) Call 5 (14.3%)
  - heading "Task Priority Distribution" [level=3]
  - img
  - text: Medium (14) (31.1%) Low (11) (24.4%) Urgent (10) (22.2%) High (10) (22.2%)
  - heading "Pipeline Stages" [level=3]
  - img
  - text: Closed (6) (40.0%) Prospect (3) (20.0%) Qualified (3) (20.0%) Proposal (2) (13.3%) Negotiation (1) (6.7%)
  - paragraph: Recent Activity
  - text: 7/23/2026 Status update call 8/2/2026 Email correspondence meeting 8/18/2026 Client meeting note 8/2/2026 Vendor meeting deal 8/18/2026 Project kickoff call
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login, setupTestEnvironment } from './fixtures/setup';
  3  | 
  4  | test.describe('Registration Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('register with valid data', async ({ page }) => {
  10 |     await page.goto('/register');
  11 | 
  12 |     // Fill registration form
  13 |     await page.locator('#name').fill('Test User');
  14 |     await page.locator('#register-email').fill('newuser@example.com');
  15 |     await page.locator('#password').fill('TestPass123');
  16 |     await page.locator('#confirm-password').fill('TestPass123');
  17 | 
  18 |     // Submit registration form
  19 |     await page.locator('button[type="submit"]').click();
  20 | 
  21 |     // Verify navigation to login page
> 22 |     await expect(page).toHaveURL('/login');
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  23 |   });
  24 | 
  25 |   test('register form validation shows errors for empty fields', async ({ page }) => {
  26 |     await page.goto('/register');
  27 | 
  28 |     // Fill only name
  29 |     await page.locator('#name').fill('Test User');
  30 | 
  31 |     // Submit without filling other required fields
  32 |     await page.locator('button[type="submit"]').click();
  33 | 
  34 |     // Verify validation errors appear
  35 |     await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Email is required' })).toBeVisible();
  36 |     await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Password is required' })).toBeVisible();
  37 |     await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Password must be at least 8 characters' })).toBeVisible();
  38 |   });
  39 | 
  40 |   test('register form validates password length requirement', async ({ page }) => {
  41 |     await page.goto('/register');
  42 | 
  43 |     // Fill form with short password
  44 |     await page.locator('#name').fill('Test User');
  45 |     await page.locator('#register-email').fill('newuser@example.com');
  46 |     await page.locator('#password').fill('1234567');
  47 |     await page.locator('#confirm-password').fill('1234567');
  48 | 
  49 |     // Submit
  50 |     await page.locator('button[type="submit"]').click();
  51 | 
  52 |     // Verify password length error
  53 |     await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Password must be at least 8 characters' })).toBeVisible();
  54 |   });
  55 | 
  56 |   test('register with mismatched passwords shows error', async ({ page }) => {
  57 |     await page.goto('/register');
  58 | 
  59 |     // Fill form with mismatched passwords
  60 |     await page.locator('#name').fill('Test User');
  61 |     await page.locator('#register-email').fill('newuser@example.com');
  62 |     await page.locator('#password').fill('TestPass123');
  63 |     await page.locator('#confirm-password').fill('DifferentPass123');
  64 | 
  65 |     // Submit
  66 |     await page.locator('button[type="submit"]').click();
  67 | 
  68 |     // Verify password mismatch error
  69 |     await expect(page.locator('p:text-xs:text-destructive', { hasText: 'Passwords do not match' })).toBeVisible();
  70 |   });
  71 | });
  72 | 
```