# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: reports.spec.ts >> Reports Tests >> reports tab switching works
- Location: tests/e2e/reports.spec.ts:24:3

# Error details

```
TimeoutError: locator.click: Timeout 200ms exceeded.
Call log:
  - waiting for locator('text=Tasks, [role="tab"]')

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
          - heading "Reports" [level=1] [ref=f2e64]
          - paragraph [ref=f2e65]: Generate and export reports for analysis
        - generic [ref=f2e66]:
          - button "Task Report" [ref=f2e67]
          - button "Contact Report" [ref=f2e68]
          - button "Activity Report" [ref=f2e69]
          - button "Pipeline Report" [ref=f2e70]
        - generic [ref=f2e71]:
          - generic [ref=f2e72]:
            - paragraph [ref=f2e73]: Task Report
            - paragraph [ref=f2e74]: Summary statistics and export options
          - generic [ref=f2e76]:
            - generic [ref=f2e77]:
              - heading "Overview" [level=3] [ref=f2e78]
              - paragraph [ref=f2e79]: Task Report contains summary statistics and detailed breakdowns.
            - generic [ref=f2e80]:
              - heading "Export Options" [level=3] [ref=f2e81]
              - generic [ref=f2e82]:
                - combobox [ref=f2e83]:
                  - text: csv
                  - generic [aria-hidden] [ref=f2e84]: ▼
                - button "Export Report" [ref=f2e85]
        - generic [ref=f2e86]:
          - generic [ref=f2e87]:
            - paragraph [ref=f2e88]: Report Data
            - paragraph [ref=f2e89]: Detailed report content
          - generic [ref=f2e92]:
            - generic [ref=f2e93]:
              - paragraph [ref=f2e94]: in_progress
              - paragraph [ref=f2e95]: "17"
            - generic [ref=f2e96]:
              - paragraph [ref=f2e97]: open
              - paragraph [ref=f2e98]: "12"
            - generic [ref=f2e99]:
              - paragraph [ref=f2e100]: cancelled
              - paragraph [ref=f2e101]: "13"
            - generic [ref=f2e102]:
              - paragraph [ref=f2e103]: completed
              - paragraph [ref=f2e104]: "8"
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
  21 |     await expect(tabs.first()).toBeVisible();
  22 |   });
  23 | 
  24 |   test('reports tab switching works', async ({ page }) => {
  25 |     await login(page);
  26 |     await page.goto('/reports');
  27 | 
  28 |     const taskTab = page.locator('text=Tasks, [role="tab"]');
> 29 |     await taskTab.click();
     |                   ^ TimeoutError: locator.click: Timeout 200ms exceeded.
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