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
  - paragraph: "10"
  - paragraph: ↓ 0 vs last month
  - paragraph: Activities This Week
  - paragraph: "35"
  - paragraph: Active Deals
  - paragraph: "12"
  - paragraph: ↑ 5 vs last month
  - heading "Task Status Breakdown" [level=3]
  - text: In Progress 15 (33.3%) Cancelled 10 (22.2%) Completed 10 (22.2%) Open 10 (22.2%)
  - heading "Activity Type Breakdown" [level=3]
  - text: Other 7 (20.0%) Deal 6 (17.1%) Note 5 (14.3%) Meeting 5 (14.3%) Task 4 (11.4%)
  - heading "Task Priority Distribution" [level=3]
  - img
  - text: High (13) (28.9%) Urgent (12) (26.7%) Low (11) (24.4%) Medium (9) (20.0%)
  - heading "Pipeline Stages" [level=3]
  - img
  - text: Closed (6) (40.0%) Prospect (3) (20.0%) Qualified (3) (20.0%) Proposal (2) (13.3%) Negotiation (1) (6.7%)
  - paragraph: Recent Activity
  - text: 10/3/2026 Technical review email 8/2/2026 Email correspondence task 8/20/2026 Technical review call 8/16/2026 Contract negotiation deal 10/4/2026 Sales call deal
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