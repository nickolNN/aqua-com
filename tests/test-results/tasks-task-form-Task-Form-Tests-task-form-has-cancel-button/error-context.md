# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks/task-form.spec.ts >> Task Form Tests >> task form has cancel button
- Location: tests/e2e/tasks/task-form.spec.ts:105:3

# Error details

```
Error: locator.click: Error: strict mode violation: locator('a').filter({ hasText: /Cancel/ }) resolved to 2 elements:
    1) <a href="/tasks" data-discover="true" class="text-primary hover:text-primary/80 transition-colors">Cancel</a> aka getByRole('link', { name: 'Cancel' }).first()
    2) <a href="/tasks" data-discover="true">Cancel</a> aka getByRole('link', { name: 'Cancel' }).nth(1)

Call log:
  - waiting for locator('a').filter({ hasText: /Cancel/ })

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
          - heading "Create Task" [level=1] [ref=f2e64]
          - link "Cancel" [ref=f2e65] [cursor=pointer]:
            - /url: /tasks
        - generic [ref=f2e66]:
          - generic [ref=f2e67]:
            - paragraph [ref=f2e68]: Create Task
            - paragraph [ref=f2e69]: Fill in the task details
          - generic [ref=f2e72]:
            - generic [ref=f2e73]:
              - generic [ref=f2e74]: Title *
              - textbox "Title *" [ref=f2e75]
            - generic [ref=f2e76]:
              - generic [ref=f2e77]: Priority
              - combobox [ref=f2e78]:
                - generic: Medium
                - generic [aria-hidden] [ref=f2e79]: ▼
              - combobox [aria-hidden] [ref=f2e80]
            - generic [ref=f2e81]:
              - generic [ref=f2e82]: Status
              - combobox [ref=f2e83]:
                - generic: Open
                - generic [aria-hidden] [ref=f2e84]: ▼
              - combobox [aria-hidden] [ref=f2e85]
            - generic [ref=f2e86]:
              - generic [ref=f2e87]: Assigned To
              - textbox "Assigned To" [ref=f2e88]
            - generic [ref=f2e89]:
              - generic [ref=f2e90]:
                - checkbox "Create as subtask" [ref=f2e91]
                - generic [ref=f2e92]: Create as subtask
              - generic [ref=f2e93]:
                - generic [ref=f2e94]: Dependencies
                - button "Add Dependency" [ref=f2e95]
            - generic [ref=f2e96]:
              - generic [ref=f2e97]: Description
              - textbox "Description" [ref=f2e98]
          - generic [ref=f2e100]:
            - button "Create Task" [ref=f2e101]
            - link "Cancel" [ref=f2e102] [cursor=pointer]:
              - /url: /tasks
```

# Test source

```ts
  10  |     await login(page);
  11  |     await page.goto('/tasks/new');
  12  | 
  13  |     // Verify form is displayed
  14  |     await expect(page.locator('h1', { hasText: /Create Task/ })).toBeVisible();
  15  |   });
  16  | 
  17  |   test('task form displays all required fields', async ({ page }) => {
  18  |     await login(page);
  19  |     await page.goto('/tasks/new');
  20  | 
  21  |     // Verify form fields are present
  22  |     await expect(page.locator('label', { hasText: /Title/ })).toBeVisible();
  23  |     await expect(page.locator('label', { hasText: /Priority/ })).toBeVisible();
  24  |     await expect(page.locator('label', { hasText: /Status/ })).toBeVisible();
  25  |   });
  26  | 
  27  |   test('task title is required', async ({ page }) => {
  28  |     await login(page);
  29  |     await page.goto('/tasks/new');
  30  | 
  31  |     // Fill form without title
  32  |     await page.locator('label', { hasText: /Priority/ }).locator('..').locator('select').click();
  33  |     await page.locator('div[role="option"]:first').click();
  34  | 
  35  |     // Submit form
  36  |     await page.locator('button', { hasText: /Create Task/ }).click();
  37  | 
  38  |     // Verify validation error appears
  39  |     await expect(page.locator('label', { hasText: /Title is required/ })).toBeVisible();
  40  |   });
  41  | 
  42  |   test('task form with valid data creates task', async ({ page }) => {
  43  |     await login(page);
  44  |     await page.goto('/tasks/new');
  45  | 
  46  |     // Fill task title
  47  |     await page.locator('input[id="title"]').fill('Test Task');
  48  | 
  49  |     // Select priority
  50  |     await page.locator('label', { hasText: /Priority/ }).locator('..').locator('select').click();
  51  |     await page.locator('div[role="option"]', { hasText: /Medium/ }).click();
  52  | 
  53  |     // Select status
  54  |     await page.locator('label', { hasText: /Status/ }).locator('..').locator('select').click();
  55  |     await page.locator('div[role="option"]', { hasText: /Open/ }).click();
  56  | 
  57  |     // Click submit
  58  |     await page.locator('button', { hasText: /Create Task/ }).click();
  59  | 
  60  |     // Verify task is created (either redirected to list or detail)
  61  |     await expect(page.locator('h1', { hasText: /Task/ })).toBeVisible();
  62  |   });
  63  | 
  64  |   test('task form shows priority options', async ({ page }) => {
  65  |     await login(page);
  66  |     await page.goto('/tasks/new');
  67  | 
  68  |     // Click priority selector
  69  |     await page.locator('label', { hasText: /Priority/ }).locator('..').locator('select').click();
  70  | 
  71  |     // Verify options are displayed
  72  |     const options = page.locator('div[role="option"]');
  73  |     await expect(options).toHaveCount(4); // low, medium, high, urgent
  74  |   });
  75  | 
  76  |   test('task form shows status options', async ({ page }) => {
  77  |     await login(page);
  78  |     await page.goto('/tasks/new');
  79  | 
  80  |     // Click status selector
  81  |     await page.locator('label', { hasText: /Status/ }).locator('..').locator('select').click();
  82  | 
  83  |     // Verify options are displayed
  84  |     const options = page.locator('div[role="option"]');
  85  |     await expect(options).toHaveCount(4); // open, in_progress, completed, cancelled
  86  |   });
  87  | 
  88  |   test('task form can be submitted with description', async ({ page }) => {
  89  |     await login(page);
  90  |     await page.goto('/tasks/new');
  91  | 
  92  |     // Fill task title
  93  |     await page.locator('input[id="title"]').fill('Test Task');
  94  | 
  95  |     // Fill description
  96  |     await page.locator('textarea').fill('This is a test description');
  97  | 
  98  |     // Submit
  99  |     await page.locator('button', { hasText: /Create Task/ }).click();
  100 | 
  101 |     // Verify success
  102 |     await expect(page.locator('h1', { hasText: /Task/ })).toBeVisible();
  103 |   });
  104 | 
  105 |   test('task form has cancel button', async ({ page }) => {
  106 |     await login(page);
  107 |     await page.goto('/tasks/new');
  108 | 
  109 |     // Click cancel
> 110 |     await page.locator('a', { hasText: /Cancel/ }).click();
      |                                                    ^ Error: locator.click: Error: strict mode violation: locator('a').filter({ hasText: /Cancel/ }) resolved to 2 elements:
  111 | 
  112 |     // Verify we're back on task list
  113 |     await expect(page.locator('h1', { hasText: /Tasks/ })).toBeVisible();
  114 |   });
  115 | });
  116 | 
```