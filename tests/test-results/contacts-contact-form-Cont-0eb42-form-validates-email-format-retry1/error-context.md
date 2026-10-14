# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-form.spec.ts >> Contact Form Tests >> contact form validates email format
- Location: tests/e2e/contacts/contact-form.spec.ts:39:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('label').filter({ hasText: /Invalid email format/ })
Expected: visible
Timeout: 1000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('label').filter({ hasText: /Invalid email format/ }) with timeout 1000ms
  - waiting for locator('label').filter({ hasText: /Invalid email format/ })

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
  - heading "Create Contact" [level=1]
  - link "Cancel":
    - /url: /contacts
  - paragraph: Create Contact
  - paragraph: Contact details and information
  - text: First Name
  - textbox "First Name": Test
  - text: Last Name
  - textbox "Last Name": User
  - text: Email
  - textbox "Email": invalid-email
  - text: Phone
  - textbox "Phone"
  - text: Company ID
  - textbox "Company ID"
  - button "Create Contact"
  - link "Cancel":
    - /url: /contacts
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login, setupTestEnvironment } from '../fixtures/setup';
  3  | 
  4  | test.describe('Contact Form Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('contact form loads correctly', async ({ page }) => {
  10 |     await login(page);
  11 |     await page.goto('/contacts/new');
  12 | 
  13 |     // Verify form is displayed
  14 |     await expect(page.locator('h1', { hasText: /Create Contact/ })).toBeVisible();
  15 |   });
  16 | 
  17 |   test('contact form displays required fields', async ({ page }) => {
  18 |     await login(page);
  19 |     await page.goto('/contacts/new');
  20 | 
  21 |     // Verify form fields are present
  22 |     await expect(page.locator('label', { hasText: /First Name/ })).toBeVisible();
  23 |     await expect(page.locator('label', { hasText: /Last Name/ })).toBeVisible();
  24 |     await expect(page.locator('label', { hasText: /Email/ })).toBeVisible();
  25 |   });
  26 | 
  27 |   test('contact form validates required fields', async ({ page }) => {
  28 |     await login(page);
  29 |     await page.goto('/contacts/new');
  30 | 
  31 |     // Submit form without filling fields
  32 |     await page.locator('button', { hasText: /Create Contact/ }).click();
  33 | 
  34 |     // Verify validation errors appear
  35 |     await expect(page.locator('label', { hasText: /First name is required/ })).toBeVisible();
  36 |     await expect(page.locator('label', { hasText: /Last name is required/ })).toBeVisible();
  37 |   });
  38 | 
  39 |   test('contact form validates email format', async ({ page }) => {
  40 |     await login(page);
  41 |     await page.goto('/contacts/new');
  42 | 
  43 |     // Fill first and last name, but invalid email
  44 |     await page.locator('input[name="first_name"], #first_name').fill('Test');
  45 |     await page.locator('input[name="last_name"], #last_name').fill('User');
  46 |     await page.locator('input[name="email"], #email').fill('invalid-email');
  47 | 
  48 |     // Submit form
  49 |     await page.locator('button', { hasText: /Create Contact/ }).click();
  50 | 
  51 |     // Verify email validation error appears
> 52 |     await expect(page.locator('label', { hasText: /Invalid email format/ })).toBeVisible();
     |                                                                              ^ Error: expect(locator).toBeVisible() failed
  53 |   });
  54 | 
  55 |   test('contact form creates contact with valid data', async ({ page }) => {
  56 |     await login(page);
  57 |     await page.goto('/contacts/new');
  58 | 
  59 |     // Fill contact form
  60 |     await page.locator('input[name="first_name"], #first_name').fill('Test');
  61 |     await page.locator('input[name="last_name"], #last_name').fill('User');
  62 |     await page.locator('input[name="email"], #email').fill('test@example.com');
  63 |     await page.locator('input[name="phone"], #phone').fill('+1-555-123-4567');
  64 | 
  65 |     // Submit form
  66 |     await page.locator('button', { hasText: /Create Contact/ }).click();
  67 | 
  68 |     // Verify contact is created (either redirected to list or detail)
  69 |     await expect(page.locator('h1', { hasText: /Contacts|Contact/ })).toBeVisible();
  70 |   });
  71 | 
  72 |   test('contact form has cancel button', async ({ page }) => {
  73 |     await login(page);
  74 |     await page.goto('/contacts/new');
  75 | 
  76 |     // Click cancel
  77 |     await page.locator('a', { hasText: /Cancel/ }).click();
  78 | 
  79 |     // Verify we're back on contact list
  80 |     await expect(page.locator('h1', { hasText: /Contacts/ })).toBeVisible();
  81 |   });
  82 | 
  83 |   test('company ID field is optional', async ({ page }) => {
  84 |     await login(page);
  85 |     await page.goto('/contacts/new');
  86 | 
  87 |     // Fill contact form without company_id
  88 |     await page.locator('input[name="first_name"], #first_name').fill('Test');
  89 |     await page.locator('input[name="last_name"], #last_name').fill('User');
  90 |     await page.locator('input[name="email"], #email').fill('test@example.com');
  91 | 
  92 |     // Submit form
  93 |     await page.locator('button', { hasHasText: /Create Contact/ }).click();
  94 | 
  95 |     // Verify contact is created without company_id
  96 |     await expect(page.locator('h1', { hasText: /Contacts|Contact/ })).toBeVisible();
  97 |   });
  98 | });
  99 | 
```