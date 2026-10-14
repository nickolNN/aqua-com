# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-form.spec.ts >> Contact Form Tests >> company ID field is optional
- Location: tests/e2e/contacts/contact-form.spec.ts:83:3

# Error details

```
Error: locator.click: Error: strict mode violation: locator('button') resolved to 3 elements:
    1) <button type="button" class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">…</button> aka getByRole('button', { name: 'Switch to dark mode' })
    2) <button type="button" class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">…</button> aka getByRole('button', { name: 'Log out' })
    3) <button type="submit" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Create Contact</button> aka getByRole('button', { name: 'Create Contact' })

Call log:
  - waiting for locator('button')

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
          - heading "Create Contact" [level=1] [ref=f2e64]
          - link "Cancel" [ref=f2e65] [cursor=pointer]:
            - /url: /contacts
        - generic [ref=f2e66]:
          - generic [ref=f2e67]:
            - paragraph [ref=f2e68]: Create Contact
            - paragraph [ref=f2e69]: Contact details and information
          - generic [ref=f2e72]:
            - generic [ref=f2e73]:
              - generic [ref=f2e74]: First Name
              - textbox "First Name" [ref=f2e75]: Test
            - generic [ref=f2e76]:
              - generic [ref=f2e77]: Last Name
              - textbox "Last Name" [ref=f2e78]: User
            - generic [ref=f2e79]:
              - generic [ref=f2e80]: Email
              - textbox "Email" [active] [ref=f2e81]: test@example.com
            - generic [ref=f2e82]:
              - generic [ref=f2e83]: Phone
              - textbox "Phone" [ref=f2e84]
            - generic [ref=f2e85]:
              - generic [ref=f2e86]: Company ID
              - textbox "Company ID" [ref=f2e87]
          - generic [ref=f2e89]:
            - button "Create Contact" [ref=f2e90]
            - link "Cancel" [ref=f2e91] [cursor=pointer]:
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
  52 |     await expect(page.locator('label', { hasText: /Invalid email format/ })).toBeVisible();
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
> 93 |     await page.locator('button', { hasHasText: /Create Contact/ }).click();
     |                                                                    ^ Error: locator.click: Error: strict mode violation: locator('button') resolved to 3 elements:
  94 | 
  95 |     // Verify contact is created without company_id
  96 |     await expect(page.locator('h1', { hasText: /Contacts|Contact/ })).toBeVisible();
  97 |   });
  98 | });
  99 | 
```