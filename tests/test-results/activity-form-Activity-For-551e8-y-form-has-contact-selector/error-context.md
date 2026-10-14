# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: activity-form.spec.ts >> Activity Form Tests >> activity form has contact selector
- Location: tests/e2e/activity-form.spec.ts:19:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('label').filter({ hasText: /Contact/ })
Expected: visible
Timeout: 1000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('label').filter({ hasText: /Contact/ }) with timeout 1000ms
  - waiting for locator('label').filter({ hasText: /Contact/ })

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
  - heading "Activity Timeline" [level=1]
  - button "New Activity"
  - combobox:
    - option "All Types" [selected]
    - option "call"
    - option "meeting"
    - option "email"
    - option "note"
    - option "task"
    - option "deal"
    - option "other"
  - combobox:
    - option "Sort by Date" [selected]
    - option "Sort by Type"
    - option "Sort by Title"
  - text: No activities found. Create one to get started.
  - heading "Create Activity" [level=2]
  - combobox:
    - option "Select type" [selected]
    - option "call"
    - option "meeting"
    - option "email"
    - option "note"
    - option "task"
    - option "deal"
    - option "other"
  - textbox "Title"
  - textbox "Description"
  - textbox
  - spinbutton "Duration (minutes)"
  - button "Create"
  - button "Cancel"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { login, setupTestEnvironment } from './fixtures/setup';
  3   | 
  4   | test.describe('Activity Form Tests', () => {
  5   |   test.beforeEach(async ({ page }) => {
  6   |     await setupTestEnvironment(page);
  7   |   });
  8   | 
  9   |   test('activity form loads correctly', async ({ page }) => {
  10  |     await login(page);
  11  |     await page.goto('/activities');
  12  | 
  13  |     const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
  14  |     await createButton.click();
  15  | 
  16  |     await expect(page.locator('h1', { hasText: /Create Activity/ })).toBeVisible();
  17  |   });
  18  | 
  19  |   test('activity form has contact selector', async ({ page }) => {
  20  |     await login(page);
  21  |     await page.goto('/activities');
  22  | 
  23  |     const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
  24  |     await createButton.click();
  25  | 
> 26  |     await expect(page.locator('label', { hasText: /Contact/ })).toBeVisible();
      |                                                                 ^ Error: expect(locator).toBeVisible() failed
  27  |   });
  28  | 
  29  |   test('activity form has type selector', async ({ page }) => {
  30  |     await login(page);
  31  |     await page.goto('/activities');
  32  | 
  33  |     const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
  34  |     await createButton.click();
  35  | 
  36  |     await expect(page.locator('label', { hasText: /Type/ })).toBeVisible();
  37  |   });
  38  | 
  39  |   test('activity form has date field', async ({ page }) => {
  40  |     await login(page);
  41  |     await page.goto('/activities');
  42  | 
  43  |     const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
  44  |     await createButton.click();
  45  | 
  46  |     await expect(page.locator('label', { hasText: /Date/ })).toBeVisible();
  47  |   });
  48  | 
  49  |   test('activity form has description field', async ({ page }) => {
  50  |     await login(page);
  51  |     await page.goto('/activities');
  52  | 
  53  |     const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
  54  |     await createButton.click();
  55  | 
  56  |     await expect(page.locator('label', { hasText: /Description/ })).toBeVisible();
  57  |   });
  58  | 
  59  |   test('activity form validates required fields', async ({ page }) => {
  60  |     await login(page);
  61  |     await page.goto('/activities');
  62  | 
  63  |     const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
  64  |     await createButton.click();
  65  | 
  66  |     await page.locator('button', { hasText: /Create Activity/ }).click();
  67  | 
  68  |     await expect(page.locator('label', { hasText: /Contact is required/ })).toBeVisible();
  69  |   });
  70  | 
  71  |   test('activity form creates activity with valid data', async ({ page }) => {
  72  |     await login(page);
  73  |     await page.goto('/activities');
  74  | 
  75  |     const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
  76  |     await createButton.click();
  77  | 
  78  |     await page.locator('input[name="first_name"], #first_name').fill('Test');
  79  |     await page.locator('input[name="last_name"], #last_name').fill('User');
  80  |     await page.locator('input[name="email"], #email').fill('test@example.com');
  81  | 
  82  |     const createActivityBtn = page.locator('button', { hasText: /Create Activity/ });
  83  |     await createActivityBtn.click();
  84  | 
  85  |     await expect(page.locator('h1', { hasText: /Activities|Activity/ })).toBeVisible();
  86  |   });
  87  | 
  88  |   test('activity form has cancel button', async ({ page }) => {
  89  |     await login(page);
  90  |     await page.goto('/activities');
  91  | 
  92  |     const createButton = page.locator('button:has-text("Create"), button:has-text("New Activity")');
  93  |     await createButton.click();
  94  | 
  95  |     await page.locator('a', { hasText: /Cancel/ }).click();
  96  | 
  97  |     await expect(page.locator('h1', { hasText: /Activities/ })).toBeVisible();
  98  |   });
  99  | });
  100 | 
```