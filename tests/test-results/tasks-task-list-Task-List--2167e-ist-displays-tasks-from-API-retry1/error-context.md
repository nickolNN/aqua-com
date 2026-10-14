# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks/task-list.spec.ts >> Task List Tests >> task list displays tasks from API
- Location: tests/e2e/tasks/task-list.spec.ts:17:3

# Error details

```
TypeError: expect(...).toHaveCountGreaterThan is not a function
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
            - generic [ref=f2e75]:
              - heading "In Progress" [level=3] [ref=f2e76]
              - button "+ Add Task" [ref=f2e78]
              - generic [ref=f2e80]:
                - generic [ref=f2e81]:
                  - generic [ref=f2e82]: Setup CI/CD pipeline
                  - generic [ref=f2e83]: urgent
                - paragraph [ref=f2e84]: "Description for task: Setup CI/CD pipeline"
                - paragraph [ref=f2e85]: "Due: 10/14/2026"
              - generic [ref=f2e87]:
                - generic [ref=f2e88]:
                  - generic [ref=f2e89]: Create migration script
                  - generic [ref=f2e90]: medium
                - paragraph [ref=f2e91]: "Description for task: Create migration script"
                - paragraph [ref=f2e92]: "Due: 9/19/2026"
              - generic [ref=f2e94]:
                - generic [ref=f2e95]:
                  - generic [ref=f2e96]: Review project proposal
                  - generic [ref=f2e97]: urgent
                - paragraph [ref=f2e98]: "Description for task: Review project proposal"
                - paragraph [ref=f2e99]: "Due: 10/12/2026"
            - generic [ref=f2e100]:
              - heading "Completed" [level=3] [ref=f2e101]
              - button "+ Add Task" [ref=f2e103]
              - generic [ref=f2e105]:
                - generic [ref=f2e106]:
                  - generic [ref=f2e107]: Run performance tests
                  - generic [ref=f2e108]: high
                - paragraph [ref=f2e109]: "Description for task: Run performance tests"
              - generic [ref=f2e111]:
                - generic [ref=f2e112]:
                  - generic [ref=f2e113]: Review project proposal
                  - generic [ref=f2e114]: urgent
                - paragraph [ref=f2e115]: "Description for task: Review project proposal"
              - generic [ref=f2e117]:
                - generic [ref=f2e118]:
                  - generic [ref=f2e119]: Fix critical bug
                  - generic [ref=f2e120]: urgent
                - paragraph [ref=f2e121]: "Description for task: Fix critical bug"
              - generic [ref=f2e123]:
                - generic [ref=f2e124]:
                  - generic [ref=f2e125]: Prepare presentation
                  - generic [ref=f2e126]: medium
                - paragraph [ref=f2e127]: "Description for task: Prepare presentation"
            - generic [ref=f2e128]:
              - heading "Cancelled" [level=3] [ref=f2e129]
              - button "+ Add Task" [ref=f2e131]
              - generic [ref=f2e133]:
                - generic [ref=f2e134]:
                  - generic [ref=f2e135]: Optimize frontend build
                  - generic [ref=f2e136]: medium
                - paragraph [ref=f2e137]: "Description for task: Optimize frontend build"
                - paragraph [ref=f2e138]: "Due: 9/23/2026"
              - generic [ref=f2e140]:
                - generic [ref=f2e141]:
                  - generic [ref=f2e142]: Build dashboard
                  - generic [ref=f2e143]: low
                - paragraph [ref=f2e144]: "Description for task: Build dashboard"
                - paragraph [ref=f2e145]: "Due: 10/6/2026"
              - generic [ref=f2e147]:
                - generic [ref=f2e148]:
                  - generic [ref=f2e149]: Analyze requirements
                  - generic [ref=f2e150]: low
                - paragraph [ref=f2e151]: "Description for task: Analyze requirements"
                - paragraph [ref=f2e152]: "Due: 10/8/2026"
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
> 23 |     await expect(taskCards).toHaveCountGreaterThan(0);
     |                             ^ TypeError: expect(...).toHaveCountGreaterThan is not a function
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
  70 |     await kanbanBtn.click();
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