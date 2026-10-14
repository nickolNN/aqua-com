# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: reports.spec.ts >> Search Tests >> global search input exists
- Location: tests/e2e/reports.spec.ts:40:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('input[placeholder="Search"], input[type="search"]')
Expected: visible
Timeout: 1000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('input[placeholder="Search"], input[type="search"]') with timeout 1000ms
  - waiting for locator('input[placeholder="Search"], input[type="search"]')

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
  - text: Completed 15 (33.3%) Open 12 (26.7%) In Progress 10 (22.2%) Cancelled 8 (17.8%)
  - heading "Activity Type Breakdown" [level=3]
  - text: Call 7 (20.0%) Deal 6 (17.1%) Other 6 (17.1%) Note 6 (17.1%) Meeting 6 (17.1%)
  - heading "Task Priority Distribution" [level=3]
  - img
  - text: Medium (14) (31.1%) High (12) (26.7%) Low (10) (22.2%) Urgent (9) (20.0%)
  - heading "Pipeline Stages" [level=3]
  - img
  - text: Closed (6) (40.0%) Prospect (3) (20.0%) Qualified (3) (20.0%) Proposal (2) (13.3%) Negotiation (1) (6.7%)
  - paragraph: Recent Activity
  - text: 7/22/2026 Sales call email 9/8/2026 Quarterly review email 7/16/2026 Lunch meeting call 8/9/2026 Email correspondence deal 7/27/2026 Client meeting note
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
> 43 |     await expect(page.locator('input[placeholder="Search"], input[type="search"]')).toBeVisible();
     |                                                                                     ^ Error: expect(locator).toBeVisible() failed
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