# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: activity-form.spec.ts >> Activity Form Tests >> activity form creates activity with valid data
- Location: tests/e2e/activity-form.spec.ts:71:3

# Error details

```
TimeoutError: locator.fill: Timeout 200ms exceeded.
Call log:
  - waiting for locator('input[name="first_name"], #first_name')

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
          - heading "Activity Timeline" [level=1] [ref=f2e64]
          - button "New Activity" [active] [ref=f2e65]
        - generic [ref=f2e66]:
          - combobox [ref=f2e68]:
            - option "All Types" [selected]
            - option "call"
            - option "meeting"
            - option "email"
            - option "note"
            - option "task"
            - option "deal"
            - option "other"
          - combobox [ref=f2e70]:
            - option "Sort by Date" [selected]
            - option "Sort by Type"
            - option "Sort by Title"
        - generic [ref=f2e71]: No activities found. Create one to get started.
        - generic [ref=f2e73]:
          - heading "Create Activity" [level=2] [ref=f2e74]
          - generic [ref=f2e75]:
            - combobox [ref=f2e77]:
              - option "Select type" [selected]
              - option "call"
              - option "meeting"
              - option "email"
              - option "note"
              - option "task"
              - option "deal"
              - option "other"
            - textbox "Title" [ref=f2e78]
            - textbox "Description" [ref=f2e79]
            - textbox [ref=f2e80]
            - spinbutton "Duration (minutes)" [ref=f2e81]
            - generic [ref=f2e82]:
              - button "Create" [ref=f2e83]
              - button "Cancel" [ref=f2e84]
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
  26  |     await expect(page.locator('label', { hasText: /Contact/ })).toBeVisible();
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
> 78  |     await page.locator('input[name="first_name"], #first_name').fill('Test');
      |                                                                 ^ TimeoutError: locator.fill: Timeout 200ms exceeded.
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