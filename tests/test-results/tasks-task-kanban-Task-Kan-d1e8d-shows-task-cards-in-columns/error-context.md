# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks/task-kanban.spec.ts >> Task Kanban Tests >> kanban board shows task cards in columns
- Location: tests/e2e/tasks/task-kanban.spec.ts:34:3

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
                  - generic [ref=f2e78]: Fix critical bug
                  - generic [ref=f2e79]: high
                - paragraph [ref=f2e80]: "Description for task: Fix critical bug"
                - paragraph [ref=f2e81]: "Due: 9/25/2026"
              - generic [ref=f2e83]:
                - generic [ref=f2e84]:
                  - generic [ref=f2e85]: Deploy to production
                  - generic [ref=f2e86]: low
                - paragraph [ref=f2e87]: "Description for task: Deploy to production"
                - paragraph [ref=f2e88]: "Due: 10/12/2026"
            - generic [ref=f2e89]:
              - heading "In Progress" [level=3] [ref=f2e90]
              - button "+ Add Task" [ref=f2e92]
              - generic [ref=f2e94]:
                - generic [ref=f2e95]:
                  - generic [ref=f2e96]: Create wireframes
                  - generic [ref=f2e97]: low
                - paragraph [ref=f2e98]: "Description for task: Create wireframes"
                - paragraph [ref=f2e99]: "Due: 9/22/2026"
              - generic [ref=f2e101]:
                - generic [ref=f2e102]:
                  - generic [ref=f2e103]: Implement user auth
                  - generic [ref=f2e104]: low
                - paragraph [ref=f2e105]: "Description for task: Implement user auth"
                - paragraph [ref=f2e106]: "Due: 10/8/2026"
              - generic [ref=f2e108]:
                - generic [ref=f2e109]:
                  - generic [ref=f2e110]: Write integration tests
                  - generic [ref=f2e111]: high
                - paragraph [ref=f2e112]: "Description for task: Write integration tests"
                - paragraph [ref=f2e113]: "Due: 10/7/2026"
            - generic [ref=f2e114]:
              - heading "Completed" [level=3] [ref=f2e115]
              - button "+ Add Task" [ref=f2e117]
              - generic [ref=f2e119]:
                - generic [ref=f2e120]:
                  - generic [ref=f2e121]: Create wireframes
                  - generic [ref=f2e122]: medium
                - paragraph [ref=f2e123]: "Description for task: Create wireframes"
              - generic [ref=f2e125]:
                - generic [ref=f2e126]:
                  - generic [ref=f2e127]: Review project proposal
                  - generic [ref=f2e128]: high
                - paragraph [ref=f2e129]: "Description for task: Review project proposal"
              - generic [ref=f2e131]:
                - generic [ref=f2e132]:
                  - generic [ref=f2e133]: Refactor API endpoints
                  - generic [ref=f2e134]: urgent
                - paragraph [ref=f2e135]: "Description for task: Refactor API endpoints"
              - generic [ref=f2e137]:
                - generic [ref=f2e138]:
                  - generic [ref=f2e139]: Design review
                  - generic [ref=f2e140]: medium
                - paragraph [ref=f2e141]: "Description for task: Design review"
            - generic [ref=f2e142]:
              - heading "Cancelled" [level=3] [ref=f2e143]
              - button "+ Add Task" [ref=f2e145]
              - generic [ref=f2e147]:
                - generic [ref=f2e148]:
                  - generic [ref=f2e149]: Code review
                  - generic [ref=f2e150]: medium
                - paragraph [ref=f2e151]: "Description for task: Code review"
                - paragraph [ref=f2e152]: "Due: 10/7/2026"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { login, setupTestEnvironment } from '../fixtures/setup';
  3   | 
  4   | test.describe('Task Kanban Tests', () => {
  5   |   test.beforeEach(async ({ page }) => {
  6   |     await setupTestEnvironment(page);
  7   |   });
  8   | 
  9   |   test('kanban board renders correctly', async ({ page }) => {
  10  |     await login(page);
  11  |     await page.goto('/tasks');
  12  | 
  13  |     // Click kanban view button
  14  |     const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
  15  |     await kanbanBtn.click();
  16  | 
  17  |     // Verify kanban board is displayed
  18  |     await expect(page.locator('h1', { hasText: /Kanban Board/ })).toBeVisible();
  19  |   });
  20  | 
  21  |   test('kanban board shows columns', async ({ page }) => {
  22  |     await login(page);
  23  |     await page.goto('/tasks');
  24  | 
  25  |     // Click kanban view button
  26  |     const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
  27  |     await kanbanBtn.click();
  28  | 
  29  |     // Verify kanban columns are rendered
  30  |     const kanbanBoard = page.locator('div[class*="grid grid-cols-1 md:grid-cols-4"]');
  31  |     await expect(kanbanBoard).toBeVisible();
  32  |   });
  33  | 
  34  |   test('kanban board shows task cards in columns', async ({ page }) => {
  35  |     await login(page);
  36  |     await page.goto('/tasks');
  37  | 
  38  |     // Click kanban view button
  39  |     const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
> 40  |     await kanbanBtn.click();
      |                     ^ TimeoutError: locator.click: Timeout 200ms exceeded.
  41  | 
  42  |     // Verify task cards are displayed in columns
  43  |     const taskCards = page.locator('div[class*="rounded-lg p-3"]:first');
  44  |     await expect(taskCards).toBeVisible();
  45  |   });
  46  | 
  47  |   test('kanban column has add task button', async ({ page }) => {
  48  |     await login(page);
  49  |     await page.goto('/tasks');
  50  | 
  51  |     // Click kanban view button
  52  |     const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
  53  |     await kanbanBtn.click();
  54  | 
  55  |     // Verify "+ Add Task" button exists in columns
  56  |     const addTaskBtn = page.locator('button', { hasText: /Add Task/ });
  57  |     await expect(addTaskBtn).toBeVisible();
  58  |   });
  59  | 
  60  |   test('clicking task card navigates to detail', async ({ page }) => {
  61  |     await login(page);
  62  |     await page.goto('/tasks');
  63  | 
  64  |     // Click kanban view button
  65  |     const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
  66  |     await kanbanBtn.click();
  67  | 
  68  |     // Click on task card
  69  |     const taskCard = page.locator('div[class*="rounded-lg p-3"]:first');
  70  |     await taskCard.click();
  71  | 
  72  |     // Verify navigation to task detail
  73  |     await expect(page.locator('h1', { hasText: /Task Details/ })).toBeVisible();
  74  |   });
  75  | 
  76  |   test('kanban board filters tasks by status column', async ({ page }) => {
  77  |     await login(page);
  78  |     await page.goto('/tasks');
  79  | 
  80  |     // Click kanban view button
  81  |     const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
  82  |     await kanbanBtn.click();
  83  | 
  84  |     // Verify tasks are organized in columns by status
  85  |     const kanbanBoard = page.locator('div[class*="grid grid-cols-1 md:grid-cols-4"]');
  86  |     const columns = kanbanBoard.locator('div[class*="rounded-lg p-3"]');
  87  |     await expect(columns).toHaveCountGreaterThan(0);
  88  |   });
  89  | 
  90  |   test('back to list button works', async ({ page }) => {
  91  |     await login(page);
  92  |     await page.goto('/tasks');
  93  | 
  94  |     // Click kanban view button
  95  |     const kanbanBtn = page.locator('button', { hasText: /Kanban Board/ });
  96  |     await kanbanBtn.click();
  97  | 
  98  |     // Click back button
  99  |     const backBtn = page.locator('button', { hasText: /Back to List/ });
  100 |     await backBtn.click();
  101 | 
  102 |     // Verify list view is displayed
  103 |     await expect(page.locator('h1', { hasText: /Tasks/ })).toBeVisible();
  104 |   });
  105 | });
  106 | 
```