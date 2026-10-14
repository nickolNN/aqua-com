# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks/task-list.spec.ts >> Task List Tests >> task list search filters tasks
- Location: tests/e2e/tasks/task-list.spec.ts:26:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a[role="link"], [class*="border rounded-lg p-4"]')
Expected: visible
Timeout: 1000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('a[role="link"], [class*="border rounded-lg p-4"]') with timeout 1000ms
  - waiting for locator('a[role="link"], [class*="border rounded-lg p-4"]')

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
  - text: Review project proposal
- text: 1 result found
- link "task Review project proposal medium | completed":
  - /url: /tasks
- main:
  - heading "Kanban Board" [level=1]
  - button "Back to List"
  - heading "Kanban Board" [level=2]
  - button "Filter"
  - heading "Open" [level=3]
  - button "+ Add Task"
  - text: Prepare presentation high
  - paragraph: "Description for task: Prepare presentation"
  - paragraph: "Due: 9/26/2026"
  - heading "In Progress" [level=3]
  - button "+ Add Task"
  - text: Set up staging environment medium
  - paragraph: "Description for task: Set up staging environment"
  - paragraph: "Due: 10/12/2026"
  - text: Fix critical bug medium
  - paragraph: "Description for task: Fix critical bug"
  - paragraph: "Due: 10/11/2026"
  - text: Analyze requirements high
  - paragraph: "Description for task: Analyze requirements"
  - paragraph: "Due: 9/30/2026"
  - text: Code review urgent
  - paragraph: "Description for task: Code review"
  - paragraph: "Due: 9/27/2026"
  - heading "Completed" [level=3]
  - button "+ Add Task"
  - text: Run performance tests high
  - paragraph: "Description for task: Run performance tests"
  - heading "Cancelled" [level=3]
  - button "+ Add Task"
  - text: Update documentation medium
  - paragraph: "Description for task: Update documentation"
  - paragraph: "Due: 10/8/2026"
  - text: Design review medium
  - paragraph: "Description for task: Design review"
  - paragraph: "Due: 9/27/2026"
  - text: Prepare release notes urgent
  - paragraph: "Description for task: Prepare release notes"
  - paragraph: "Due: 10/13/2026"
  - text: Design review high
  - paragraph: "Description for task: Design review"
  - paragraph: "Due: 10/8/2026"
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
> 34 |     await expect(taskCards).toBeVisible();
     |                             ^ Error: expect(locator).toBeVisible() failed
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