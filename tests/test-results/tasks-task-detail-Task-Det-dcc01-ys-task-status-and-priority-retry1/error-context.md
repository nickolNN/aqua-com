# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks/task-detail.spec.ts >> Task Detail Tests >> task detail displays task status and priority
- Location: tests/e2e/tasks/task-detail.spec.ts:26:3

# Error details

```
TimeoutError: locator.click: Timeout 200ms exceeded.
Call log:
  - waiting for locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first()

```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - complementary [ref=f1e4]:
    - generic [ref=f1e5]:
      - generic [ref=f1e6]: Aqua CRM
      - navigation [ref=f1e9]:
        - link "Dashboard" [ref=f1e10] [cursor=pointer]:
          - /url: /
        - link "Contacts" [ref=f1e18] [cursor=pointer]:
          - /url: /contacts
        - link "Companies" [ref=f1e24] [cursor=pointer]:
          - /url: /companies
        - link "Tasks" [ref=f1e31] [cursor=pointer]:
          - /url: /tasks
        - link "Activities" [ref=f1e37] [cursor=pointer]:
          - /url: /activities
        - button "Switch to dark mode" [ref=f1e42]
        - button "Log out" [ref=f1e51]
  - generic [ref=f1e57]:
    - textbox "Global search" [ref=f1e60]:
      - /placeholder: Search contacts, tasks, companies...
    - main [ref=f1e61]:
      - generic [ref=f1e62]:
        - generic [ref=f1e63]:
          - heading "Dashboard" [level=1] [ref=f1e64]
          - paragraph [ref=f1e65]: Overview of your CRM activity and performance
        - generic [ref=f1e66]:
          - generic [ref=f1e67]:
            - paragraph [ref=f1e69]: Total Contacts
            - generic [ref=f1e70]:
              - paragraph [ref=f1e71]: "120"
              - paragraph [ref=f1e72]: ↑ 20 vs last month
          - generic [ref=f1e73]:
            - paragraph [ref=f1e75]: Open Tasks
            - generic [ref=f1e76]:
              - paragraph [ref=f1e77]: "11"
              - paragraph [ref=f1e78]: ↓ 0 vs last month
          - generic [ref=f1e79]:
            - paragraph [ref=f1e81]: Activities This Week
            - paragraph [ref=f1e83]: "35"
          - generic [ref=f1e84]:
            - paragraph [ref=f1e86]: Active Deals
            - generic [ref=f1e87]:
              - paragraph [ref=f1e88]: "12"
              - paragraph [ref=f1e89]: ↑ 5 vs last month
        - generic [ref=f1e90]:
          - generic [ref=f1e91]:
            - heading "Task Status Breakdown" [level=3] [ref=f1e92]
            - generic [ref=f1e93]:
              - generic [ref=f1e95]:
                - generic [ref=f1e96]: In Progress
                - generic [ref=f1e97]: 14 (31.1%)
              - generic [ref=f1e101]:
                - generic [ref=f1e102]: Open
                - generic [ref=f1e103]: 11 (24.4%)
              - generic [ref=f1e107]:
                - generic [ref=f1e108]: Cancelled
                - generic [ref=f1e109]: 10 (22.2%)
              - generic [ref=f1e113]:
                - generic [ref=f1e114]: Completed
                - generic [ref=f1e115]: 10 (22.2%)
          - generic [ref=f1e118]:
            - heading "Activity Type Breakdown" [level=3] [ref=f1e119]
            - generic [ref=f1e120]:
              - generic [ref=f1e122]:
                - generic [ref=f1e123]: Email
                - generic [ref=f1e124]: 9 (25.7%)
              - generic [ref=f1e128]:
                - generic [ref=f1e129]: Deal
                - generic [ref=f1e130]: 7 (20.0%)
              - generic [ref=f1e134]:
                - generic [ref=f1e135]: Meeting
                - generic [ref=f1e136]: 5 (14.3%)
              - generic [ref=f1e140]:
                - generic [ref=f1e141]: Task
                - generic [ref=f1e142]: 4 (11.4%)
              - generic [ref=f1e146]:
                - generic [ref=f1e147]: Call
                - generic [ref=f1e148]: 4 (11.4%)
        - generic [ref=f1e151]:
          - generic [ref=f1e152]:
            - heading "Task Priority Distribution" [level=3] [ref=f1e153]
            - generic [ref=f1e162]:
              - generic [ref=f1e163]:
                - generic [ref=f1e165]: High (14)
                - generic [ref=f1e166]: (31.1%)
              - generic [ref=f1e167]:
                - generic [ref=f1e169]: Medium (12)
                - generic [ref=f1e170]: (26.7%)
              - generic [ref=f1e171]:
                - generic [ref=f1e173]: Low (10)
                - generic [ref=f1e174]: (22.2%)
              - generic [ref=f1e175]:
                - generic [ref=f1e177]: Urgent (9)
                - generic [ref=f1e178]: (20.0%)
          - generic [ref=f1e179]:
            - heading "Pipeline Stages" [level=3] [ref=f1e180]
            - generic [ref=f1e190]:
              - generic [ref=f1e191]:
                - generic [ref=f1e193]: Closed (6)
                - generic [ref=f1e194]: (40.0%)
              - generic [ref=f1e195]:
                - generic [ref=f1e197]: Prospect (3)
                - generic [ref=f1e198]: (20.0%)
              - generic [ref=f1e199]:
                - generic [ref=f1e201]: Qualified (3)
                - generic [ref=f1e202]: (20.0%)
              - generic [ref=f1e203]:
                - generic [ref=f1e205]: Proposal (2)
                - generic [ref=f1e206]: (13.3%)
              - generic [ref=f1e207]:
                - generic [ref=f1e209]: Negotiation (1)
                - generic [ref=f1e210]: (6.7%)
        - generic [ref=f1e211]:
          - paragraph [ref=f1e213]: Recent Activity
          - generic [ref=f1e215]:
            - generic [ref=f1e216]:
              - generic [ref=f1e217]: 9/14/2026
              - generic [ref=f1e218]: Vendor meeting
              - generic [ref=f1e219]: task
            - generic [ref=f1e220]:
              - generic [ref=f1e221]: 7/13/2026
              - generic [ref=f1e222]: Strategy session
              - generic [ref=f1e223]: note
            - generic [ref=f1e224]:
              - generic [ref=f1e225]: 10/9/2026
              - generic [ref=f1e226]: Follow-up call
              - generic [ref=f1e227]: note
            - generic [ref=f1e228]:
              - generic [ref=f1e229]: 9/4/2026
              - generic [ref=f1e230]: Sales call
              - generic [ref=f1e231]: call
            - generic [ref=f1e232]:
              - generic [ref=f1e233]: 8/17/2026
              - generic [ref=f1e234]: Email correspondence
              - generic [ref=f1e235]: email
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
  12  |     await page.locator('a[class*="border rounded-lg p-4"]').first().click();
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
> 28  |     await page.locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]').first().click();
      |                                                                                                       ^ TimeoutError: locator.click: Timeout 200ms exceeded.
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