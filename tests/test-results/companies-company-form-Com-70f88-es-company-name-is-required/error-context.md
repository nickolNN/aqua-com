# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-form.spec.ts >> Company Form Tests >> company form validates company name is required
- Location: tests/e2e/companies/company-form.spec.ts:26:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('label').filter({ hasText: /Company name is required/ })
Expected: visible
Timeout: 1000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('label').filter({ hasText: /Company name is required/ }) with timeout 1000ms
  - waiting for locator('label').filter({ hasText: /Company name is required/ })

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
  - heading "Create Company" [level=1]
  - link "Cancel":
    - /url: /companies
  - paragraph: Create Company
  - paragraph: Company details and information
  - text: Company Name *
  - textbox "Company Name *"
  - text: Industry
  - combobox: Select industry...
  - text: Website
  - textbox "Website"
  - text: Address
  - textbox "Address"
  - button "Create Company"
  - link "Cancel":
    - /url: /companies
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login, setupTestEnvironment } from '../fixtures/setup';
  3  | 
  4  | test.describe('Company Form Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('company form loads correctly', async ({ page }) => {
  10 |     await login(page);
  11 |     await page.goto('/companies/new');
  12 | 
  13 |     // Verify form is displayed
  14 |     await expect(page.locator('h1', { hasHas: /Create Company/ })).toBeVisible();
  15 |   });
  16 | 
  17 |   test('company form displays required fields', async ({ page }) => {
  18 |     await login(page);
  19 |     await page.goto('/companies/new');
  20 | 
  21 |     // Verify form fields are present
  22 |     await expect(page.locator('label', { hasText: /Company Name/ })).toBeVisible();
  23 |     await expect(page.locator('label', { hasText: /Industry/ })).toBeVisible();
  24 |   });
  25 | 
  26 |   test('company form validates company name is required', async ({ page }) => {
  27 |     await login(page);
  28 |     await page.goto('/companies/new');
  29 | 
  30 |     // Submit form without company name
  31 |     await page.locator('button', { hasText: /Create Company/ }).click();
  32 | 
  33 |     // Verify validation error appears
> 34 |     await expect(page.locator('label', { hasText: /Company name is required/ })).toBeVisible();
     |                                                                                  ^ Error: expect(locator).toBeVisible() failed
  35 |   });
  36 | 
  37 |   test('company form creates company with valid data', async ({ page }) => {
  38 |     await login(page);
  39 |     await page.goto('/companies/new');
  40 | 
  41 |     // Fill company form
  42 |     await page.locator('input[name="name"], #name').fill('Test Company');
  43 |     await page.locator('select[name="industry"], select[id="industry"]').selectOption('Technology');
  44 |     await page.locator('input[name="website"], #website').fill('test.com');
  45 |     await page.locator('input[name="address"], #address').fill('123 Main St');
  46 | 
  47 |     // Submit form
  48 |     await page.locator('button', { hasText: /Create Company/ }).click();
  49 | 
  50 |     // Verify company is created
  51 |     await expect(page.locator('h1', { hasText: /Companies|Company/ })).toBeVisible();
  52 |   });
  53 | 
  54 |   test('company form has cancel button', async ({ page }) => {
  55 |     await login(page);
  56 |     await page.goto('/companies/new');
  57 | 
  58 |     // Click cancel
  59 |     await page.locator('a', { hasText: /Cancel/ }).click();
  60 | 
  61 |     // Verify we're back on company list
  62 |     await expect(page.locator('h1', { hasText: /Companies/ })).toBeVisible();
  63 |   });
  64 | });
  65 | 
```