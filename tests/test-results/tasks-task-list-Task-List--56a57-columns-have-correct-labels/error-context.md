# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks/task-list.spec.ts >> Task List Tests >> kanban board columns have correct labels
- Location: tests/e2e/tasks/task-list.spec.ts:64:3

# Error details

```
TimeoutError: locator.click: Timeout 200ms exceeded.
Call log:
  - waiting for locator('button').filter({ hasText: /Kanban Board/ })

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
          - heading "Kanban Board" [level=1] [ref=f2e64]
          - button "Back to List" [ref=f2e65]
        - generic [ref=f2e66]:
          - generic [ref=f2e67]:
            - heading "Kanban Board" [level=2] [ref=f2e68]
            - button "Filter" [ref=f2e69]
          - generic [ref=f2e70]:
            - generic [ref=f2e71]:
              - heading "Open" [level=3] [ref=f2e72]
              - button "+ Add Task" [ref=f2e74]
              - generic [ref=f2e76]:
                - generic [ref=f2e77]:
                  - generic [ref=f2e78]: Update dependencies
                  - generic [ref=f2e79]: medium
                - paragraph [ref=f2e80]: "Description for task: Update dependencies"
                - paragraph [ref=f2e81]: "Due: 10/7/2026"
              - generic [ref=f2e83]:
                - generic [ref=f2e84]:
                  - generic [ref=f2e85]: Prepare presentation
                  - generic [ref=f2e86]: medium
                - paragraph [ref=f2e87]: "Description for task: Prepare presentation"
                - paragraph [ref=f2e88]: "Due: 10/12/2026"
              - generic [ref=f2e90]:
                - generic [ref=f2e91]:
                  - generic [ref=f2e92]: Fix critical bug
                  - generic [ref=f2e93]: medium
                - paragraph [ref=f2e94]: "Description for task: Fix critical bug"
                - paragraph [ref=f2e95]: "Due: 9/22/2026"
            - generic [ref=f2e96]:
              - heading "In Progress" [level=3] [ref=f2e97]
              - button "+ Add Task" [ref=f2e99]
              - generic [ref=f2e101]:
                - generic [ref=f2e102]:
                  - generic [ref=f2e103]: Deploy to production
                  - generic [ref=f2e104]: high
                - paragraph [ref=f2e105]: "Description for task: Deploy to production"
                - paragraph [ref=f2e106]: "Due: 9/29/2026"
              - generic [ref=f2e108]:
                - generic [ref=f2e109]:
                  - generic [ref=f2e110]: Create wireframes
                  - generic [ref=f2e111]: low
                - paragraph [ref=f2e112]: "Description for task: Create wireframes"
                - paragraph [ref=f2e113]: "Due: 9/21/2026"
              - generic [ref=f2e115]:
                - generic [ref=f2e116]:
                  - generic [ref=f2e117]: Implement user auth
                  - generic [ref=f2e118]: low
                - paragraph [ref=f2e119]: "Description for task: Implement user auth"
                - paragraph [ref=f2e120]: "Due: 10/6/2026"
              - generic [ref=f2e122]:
                - generic [ref=f2e123]:
                  - generic [ref=f2e124]: Configure monitoring
                  - generic [ref=f2e125]: high
                - paragraph [ref=f2e126]: "Description for task: Configure monitoring"
                - paragraph [ref=f2e127]: "Due: 9/30/2026"
            - generic [ref=f2e128]:
              - heading "Completed" [level=3] [ref=f2e129]
              - button "+ Add Task" [ref=f2e131]
              - generic [ref=f2e133]:
                - generic [ref=f2e134]:
                  - generic [ref=f2e135]: Write integration tests
                  - generic [ref=f2e136]: low
                - paragraph [ref=f2e137]: "Description for task: Write integration tests"
            - generic [ref=f2e138]:
              - heading "Cancelled" [level=3] [ref=f2e139]
              - button "+ Add Task" [ref=f2e141]
              - generic [ref=f2e143]:
                - generic [ref=f2e144]:
                  - generic [ref=f2e145]: Code review
                  - generic [ref=f2e146]: urgent
                - paragraph [ref=f2e147]: "Description for task: Code review"
                - paragraph [ref=f2e148]: "Due: 9/29/2026"
              - generic [ref=f2e150]:
                - generic [ref=f2e151]:
                  - generic [ref=f2e152]: Prepare presentation
                  - generic [ref=f2e153]: high
                - paragraph [ref=f2e154]: "Description for task: Prepare presentation"
                - paragraph [ref=f2e155]: "Due: 9/19/2026"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login, setupTestEnvironment } from '../fixtures/setup';
  3  | 
  4  | test.describe('Task List Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('task list view loads correctly', async ({ page }) => {
  10 |     await login(page);
  11 |     await page.goto('/tasks');
  12 | 
  13 |     // Verify page title
  14 |     await expect(page.locator('h1', { hasText: /Tasks|Kanban Board/ })).toBeVisible();
  15 |   });
  16 | 
  17 |   test('task list displays tasks from API', async ({ page }) => {
  18 |     await login(page);
  19 |     await page.goto('/tasks');
  20 | 
  21 |     // Verify tasks are displayed (tasks list view shows individual task cards)
  22 |     const taskCards = page.locator('a[role="link"], [class*="border rounded-lg p-4"]');
  23 |     await expect(taskCards).toHaveCountGreaterThan(0);
  24 |   });
  25 | 
  26 |   test('task list search filters tasks', async ({ page }) => {
  27 |     await login(page);
  28 |     await page.goto('/tasks');
  29 | 
  30 |     // Use the search input
  31 |     const searchInput = page.locator('input[type="text"], input[placeholder="Search tasks..."]');
  32 |     await searchInput.fill('Review project proposal');
  33 |     const taskCards = page.locator('a[role="link"], [class*="border rounded-lg p-4"]');
  34 |     await expect(taskCards).toBeVisible();
  35 |   });
  36 | 
  37 |   test('kanban toggle displays kanban board', async ({ page }) => {
  38 |     await login(page);
  39 |     await page.goto('/tasks');
  40 | 
  41 |     // Click the Kanban Board button to switch to kanban view
  42 |     const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
  43 |     await kanbanBtn.click();
  44 | 
  45 |     // Verify kanban board is displayed
  46 |     await expect(page.locator('h1', { hasText: /Kanban Board/ })).toBeVisible();
  47 |   });
  48 | 
  49 |   test('kanban board displays task columns', async ({ page }) => {
  50 |     await login(page);
  51 |     await page.goto('/tasks');
  52 | 
  53 |     // Ensure we're in kanban view
  54 |     const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
  55 |     if (await kanbanBtn.isVisible()) {
  56 |       await kanbanBtn.click();
  57 |     }
  58 | 
  59 |     // Kanban columns are rendered as columns for open, in_progress, completed, cancelled
  60 |     const kanbanColumns = page.locator('div[class*="grid grid-cols-1 md:grid-cols-4"]');
  61 |     await expect(kanbanColumns).toBeVisible();
  62 |   });
  63 | 
  64 |   test('kanban board columns have correct labels', async ({ page }) => {
  65 |     await login(page);
  66 |     await page.goto('/tasks');
  67 | 
  68 |     // Click to switch to kanban view
  69 |     const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
> 70 |     await kanbanBtn.click();
     |                     ^ TimeoutError: locator.click: Timeout 200ms exceeded.
  71 | 
  72 |     // Verify kanban columns are rendered with their labels
  73 |     const kanbanBoard = page.locator('div[class*="grid grid-cols-1 md:grid-cols-4"]');
  74 |     const columns = kanbanBoard.locator('h3');
  75 |     await expect(columns).toHaveCountGreaterThan(0);
  76 |   });
  77 | 
  78 |   test('task card is clickable and navigates to detail', async ({ page }) => {
  79 |     await login(page);
  80 |     await page.goto('/tasks');
  81 | 
  82 |     // Wait for task cards to load
  83 |     const taskCard = page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]:first');
  84 |     await taskCard.click();
  85 | 
  86 |     // Verify navigation to task detail page
  87 |     await expect(page.locator('h1', { hasText: /Task Details|Task/ })).toBeVisible();
  88 |   });
  89 | });
  90 | 
```