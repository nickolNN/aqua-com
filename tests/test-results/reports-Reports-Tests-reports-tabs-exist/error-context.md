# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: reports.spec.ts >> Reports Tests >> reports tabs exist
- Location: tests/e2e/reports.spec.ts:16:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Tasks, text=Contacts, text=Activities, text=Pipeline, [role="tab"]').first()
Expected: visible
Timeout: 1000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('text=Tasks, text=Contacts, text=Activities, text=Pipeline, [role="tab"]').first() with timeout 1000ms
  - waiting for locator('text=Tasks, text=Contacts, text=Activities, text=Pipeline, [role="tab"]').first()

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
  - heading "Reports" [level=1]
  - paragraph: Generate and export reports for analysis
  - button "Task Report"
  - button "Contact Report"
  - button "Activity Report"
  - button "Pipeline Report"
  - paragraph: Task Report
  - paragraph: Summary statistics and export options
  - heading "Overview" [level=3]
  - paragraph: Task Report contains summary statistics and detailed breakdowns.
  - heading "Export Options" [level=3]
  - combobox: csv
  - button "Export Report"
  - paragraph: Report Data
  - paragraph: Detailed report content
  - paragraph: cancelled
  - paragraph: "6"
  - paragraph: in_progress
  - paragraph: "12"
  - paragraph: completed
  - paragraph: "15"
  - paragraph: open
  - paragraph: "17"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login, setupTestEnvironment } from './fixtures/setup';
  3  | 
  4  | test.describe('Reports Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('reports page loads', async ({ page }) => {
  10 |     await login(page);
  11 |     await page.goto('/reports');
  12 | 
  13 |     await expect(page.locator('h1', { hasText: /Reports/ })).toBeVisible();
  14 |   });
  15 | 
  16 |   test('reports tabs exist', async ({ page }) => {
  17 |     await login(page);
  18 |     await page.goto('/reports');
  19 | 
  20 |     const tabs = page.locator('text=Tasks, text=Contacts, text=Activities, text=Pipeline, [role="tab"]');
> 21 |     await expect(tabs.first()).toBeVisible();
     |                                ^ Error: expect(locator).toBeVisible() failed
  22 |   });
  23 | 
  24 |   test('reports tab switching works', async ({ page }) => {
  25 |     await login(page);
  26 |     await page.goto('/reports');
  27 | 
  28 |     const taskTab = page.locator('text=Tasks, [role="tab"]');
  29 |     await taskTab.click();
  30 | 
  31 |     await expect(page.locator('text=Tasks')).toBeVisible();
  32 |   });
  33 | });
  34 | 
  35 | test.describe('Search Tests', () => {
  36 |   test.beforeEach(async ({ page }) => {
  37 |     await setupTestEnvironment(page);
  38 |   });
  39 | 
  40 |   test('global search input exists', async ({ page }) => {
  41 |     await login(page);
  42 | 
  43 |     await expect(page.locator('input[placeholder="Search"], input[type="search"]')).toBeVisible();
  44 |   });
  45 | 
  46 |   test('global search can be used to search', async ({ page }) => {
  47 |     await login(page);
  48 |     await page.goto('/contacts');
  49 | 
  50 |     const searchInput = page.locator('input[placeholder="Search"], input[type="search"]');
  51 |     await searchInput.fill('Test');
  52 | 
  53 |     await expect(page.locator('input[placeholder="Search"], input[type="search"]')).toHaveValue('Test');
  54 |   });
  55 | });
  56 | 
```