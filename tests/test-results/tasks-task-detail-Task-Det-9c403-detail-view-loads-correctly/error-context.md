# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks/task-detail.spec.ts >> Task Detail Tests >> task detail view loads correctly
- Location: tests/e2e/tasks/task-detail.spec.ts:9:3

# Error details

```
TimeoutError: locator.click: Timeout 200ms exceeded.
Call log:
  - waiting for locator('a[class*="border rounded-lg p-4"]').first()

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
                  - generic [ref=f2e78]: Implement user auth
                  - generic [ref=f2e79]: urgent
                - paragraph [ref=f2e80]: "Description for task: Implement user auth"
                - paragraph [ref=f2e81]: "Due: 10/18/2026"
              - generic [ref=f2e83]:
                - generic [ref=f2e84]:
                  - generic [ref=f2e85]: Fix critical bug
                  - generic [ref=f2e86]: high
                - paragraph [ref=f2e87]: "Description for task: Fix critical bug"
                - paragraph [ref=f2e88]: "Due: 10/7/2026"
              - generic [ref=f2e90]:
                - generic [ref=f2e91]:
                  - generic [ref=f2e92]: Run performance tests
                  - generic [ref=f2e93]: medium
                - paragraph [ref=f2e94]: "Description for task: Run performance tests"
                - paragraph [ref=f2e95]: "Due: 9/27/2026"
            - generic [ref=f2e96]:
              - heading "In Progress" [level=3] [ref=f2e97]
              - button "+ Add Task" [ref=f2e99]
              - generic [ref=f2e101]:
                - generic [ref=f2e102]:
                  - generic [ref=f2e103]: Configure monitoring
                  - generic [ref=f2e104]: low
                - paragraph [ref=f2e105]: "Description for task: Configure monitoring"
                - paragraph [ref=f2e106]: "Due: 9/28/2026"
              - generic [ref=f2e108]:
                - generic [ref=f2e109]:
                  - generic [ref=f2e110]: Refactor API endpoints
                  - generic [ref=f2e111]: medium
                - paragraph [ref=f2e112]: "Description for task: Refactor API endpoints"
                - paragraph [ref=f2e113]: "Due: 9/26/2026"
              - generic [ref=f2e115]:
                - generic [ref=f2e116]:
                  - generic [ref=f2e117]: Create migration script
                  - generic [ref=f2e118]: medium
                - paragraph [ref=f2e119]: "Description for task: Create migration script"
                - paragraph [ref=f2e120]: "Due: 10/7/2026"
            - generic [ref=f2e121]:
              - heading "Completed" [level=3] [ref=f2e122]
              - button "+ Add Task" [ref=f2e124]
              - generic [ref=f2e126]:
                - generic [ref=f2e127]:
                  - generic [ref=f2e128]: Schedule meeting
                  - generic [ref=f2e129]: urgent
                - paragraph [ref=f2e130]: "Description for task: Schedule meeting"
              - generic [ref=f2e132]:
                - generic [ref=f2e133]:
                  - generic [ref=f2e134]: Set up staging environment
                  - generic [ref=f2e135]: high
                - paragraph [ref=f2e136]: "Description for task: Set up staging environment"
              - generic [ref=f2e138]:
                - generic [ref=f2e139]:
                  - generic [ref=f2e140]: Update dependencies
                  - generic [ref=f2e141]: high
                - paragraph [ref=f2e142]: "Description for task: Update dependencies"
              - generic [ref=f2e144]:
                - generic [ref=f2e145]:
                  - generic [ref=f2e146]: Code review
                  - generic [ref=f2e147]: medium
                - paragraph [ref=f2e148]: "Description for task: Code review"
            - generic [ref=f2e149]:
              - heading "Cancelled" [level=3] [ref=f2e150]
              - button "+ Add Task" [ref=f2e152]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { login, setupTestEnvironment } from '../fixtures/setup';
  3   | 
  4   | test.describe('Task Detail Tests', () => {
  5   |   test.beforeEach(async ({ page }) => {
  6   |     await setupTestEnvironment(page);
  7   |   });
  8   | 
  9   |   test('task detail view loads correctly', async ({ page }) => {
  10  |     await login(page);
  11  |     await page.goto('/tasks');
> 12  |     await page.locator('a[class*="border rounded-lg p-4"]').first().click();
      |                                                                     ^ TimeoutError: locator.click: Timeout 200ms exceeded.
  13  | 
  14  |     // Verify task detail is displayed
  15  |     await expect(page.locator('h1', { hasText: /Task Details/ })).toBeVisible();
  16  |   });
  17  | 
  18  |   test('task detail displays task title', async ({ page }) => {
  19  |     await login(page);
  20  |     await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();
  21  | 
  22  |     // Verify task title is displayed
  23  |     await expect(page.locator('h1, [class*="text-lg font-semibold"]')).toBeVisible();
  24  |   });
  25  | 
  26  |   test('task detail displays task status and priority', async ({ page }) => {
  27  |     await login(page);
  28  |     await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();
  29  | 
  30  |     // Verify status and priority badges are displayed
  31  |     const badges = page.locator('button[variant*="badge"], [class*="rounded"]');
  32  |     await expect(badges).toBeVisible();
  33  |   });
  34  | 
  35  |   test('task detail displays task description', async ({ page }) => {
  36  |     await login(page);
  37  |     await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();
  38  | 
  39  |     // Verify description is displayed
  40  |     const description = page.locator('dl, [class*="text-sm text-muted-foreground"]');
  41  |     await expect(description).toBeVisible();
  42  |   });
  43  | 
  44  |   test('task detail displays due date', async ({ page }) => {
  45  |     await login(page);
  46  |     await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();
  47  | 
  48  |     // Verify due date is displayed
  49  |     await expect(page.locator('dl dt', { hasText: /Due Date/ })).toBeVisible();
  50  |   });
  51  | 
  52  |   test('edit button navigates to edit form', async ({ page }) => {
  53  |     await login(page);
  54  |     await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();
  55  | 
  56  |     // Click edit button
  57  |     const editBtn = page.locator('button', { hasText: /Edit Task/ }).first();
  58  |     await editBtn.click();
  59  | 
  60  |     // Verify we're on the edit form
  61  |     await expect(page.locator('h1', { hasText: /Edit Task/ })).toBeVisible();
  62  |   });
  63  | 
  64  |   test('delete dialog appears when delete button clicked', async ({ page }) => {
  65  |     await login(page);
  66  |     await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();
  67  | 
  68  |     // Click delete button
  69  |     const deleteBtn = page.locator('button', { hasText: /Delete/ });
  70  |     await deleteBtn.click();
  71  | 
  72  |     // Verify confirm dialog appears
  73  |     await expect(page.locator('div[class*="fixed inset-0"], [role="dialog"]')).toBeVisible();
  74  |   });
  75  | 
  76  |   test('delete confirm button works', async ({ page }) => {
  77  |     await login(page);
  78  |     await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();
  79  | 
  80  |     // Click delete button
  81  |     const deleteBtn = page.locator('button', { hasText: /Delete/ });
  82  |     await deleteBtn.click();
  83  | 
  84  |     // Click confirm button
  85  |     const confirmBtn = page.locator('button', { hasText: /Delete/, visible: true });
  86  |     await confirmBtn.click();
  87  | 
  88  |     // Verify success message or redirect
  89  |     await expect(page.locator('h1', { hasText: /Task Details/ })).toBeVisible();
  90  |   });
  91  | 
  92  |   test('back link navigates to task list', async ({ page }) => {
  93  |     await login(page);
  94  |     await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();
  95  | 
  96  |     // Click back link
  97  |     const backLink = page.locator('a', { hasText: /Back|Back to tasks/ });
  98  |     await backLink.click();
  99  | 
  100 |     // Verify we're back on tasks list
  101 |     await expect(page.locator('h1', { hasText: /Tasks/ })).toBeVisible();
  102 |   });
  103 | });
  104 | 
```