# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-form.spec.ts >> Company Form Tests >> company form has cancel button
- Location: tests/e2e/companies/company-form.spec.ts:54:3

# Error details

```
Error: locator.click: Error: strict mode violation: locator('a').filter({ hasText: /Cancel/ }) resolved to 2 elements:
    1) <a href="/companies" data-discover="true" class="text-primary hover:text-primary/80 transition-colors">Cancel</a> aka getByRole('link', { name: 'Cancel' }).first()
    2) <a href="/companies" data-discover="true" class="text-primary hover:text-primary/80 transition-colors">Cancel</a> aka getByRole('link', { name: 'Cancel' }).nth(1)

Call log:
  - waiting for locator('a').filter({ hasText: /Cancel/ })

```

# Page snapshot

```yaml
- generic [ref=f2e3]:
  - complementary [ref=f2e4]:
    - generic [ref=f2e5]:
      - generic [ref=f2e6]: Aqua CRM
      - navigation [ref=f2e9]:
        - link "Dashboard" [ref=f2e10] [cursor=pointer]:
          - /url: /
        - link "Contacts" [ref=f2e18] [cursor=pointer]:
          - /url: /contacts
        - link "Companies" [ref=f2e24] [cursor=pointer]:
          - /url: /companies
        - link "Tasks" [ref=f2e31] [cursor=pointer]:
          - /url: /tasks
        - link "Activities" [ref=f2e37] [cursor=pointer]:
          - /url: /activities
        - button "Switch to dark mode" [ref=f2e42]
        - button "Log out" [ref=f2e51]
  - generic [ref=f2e57]:
    - textbox "Global search" [ref=f2e60]:
      - /placeholder: Search contacts, tasks, companies...
    - main [ref=f2e61]:
      - generic [ref=f2e62]:
        - generic [ref=f2e63]:
          - heading "Create Company" [level=1] [ref=f2e64]
          - link "Cancel" [ref=f2e65] [cursor=pointer]:
            - /url: /companies
        - generic [ref=f2e66]:
          - generic [ref=f2e67]:
            - paragraph [ref=f2e68]: Create Company
            - paragraph [ref=f2e69]: Company details and information
          - generic [ref=f2e72]:
            - generic [ref=f2e73]:
              - generic [ref=f2e74]: Company Name *
              - textbox "Company Name *" [ref=f2e75]
            - generic [ref=f2e76]:
              - generic [ref=f2e77]: Industry
              - combobox [ref=f2e78]:
                - generic: Select industry...
                - generic [aria-hidden] [ref=f2e79]: ▼
              - combobox [aria-hidden] [ref=f2e80]
            - generic [ref=f2e81]:
              - generic [ref=f2e82]: Website
              - textbox "Website" [ref=f2e83]
            - generic [ref=f2e84]:
              - generic [ref=f2e85]: Address
              - textbox "Address" [ref=f2e86]
          - generic [ref=f2e88]:
            - button "Create Company" [ref=f2e89]
            - link "Cancel" [ref=f2e90] [cursor=pointer]:
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
  34 |     await expect(page.locator('label', { hasText: /Company name is required/ })).toBeVisible();
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
> 59 |     await page.locator('a', { hasText: /Cancel/ }).click();
     |                                                    ^ Error: locator.click: Error: strict mode violation: locator('a').filter({ hasText: /Cancel/ }) resolved to 2 elements:
  60 | 
  61 |     // Verify we're back on company list
  62 |     await expect(page.locator('h1', { hasText: /Companies/ })).toBeVisible();
  63 |   });
  64 | });
  65 | 
```