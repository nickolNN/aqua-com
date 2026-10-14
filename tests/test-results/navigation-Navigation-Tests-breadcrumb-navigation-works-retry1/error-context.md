# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation Tests >> breadcrumb navigation works
- Location: tests/e2e/navigation.spec.ts:32:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[role="navigation"], [class*="sidebar"], nav')
Expected: visible
Error: strict mode violation: locator('[role="navigation"], [class*="sidebar"], nav') resolved to 10 elements:
    1) <aside class="sticky top-0 h-screen w-64 flex flex-col border-r bg-sidebar text-sidebar-foreground">…</aside> aka getByRole('complementary')
    2) <div class="h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">…</div> aka getByText('Aqua CRMDashboardContactsCompaniesTasksActivitiesSwitch to dark modeLog out')
    3) <nav class="flex flex-col gap-1 p-2">…</nav> aka getByText('DashboardContactsCompaniesTasksActivitiesSwitch to dark modeLog out')
    4) <a href="/" data-discover="true" class="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">…</a> aka getByRole('link', { name: 'Dashboard' })
    5) <a href="/contacts" aria-current="page" data-discover="true" class="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors bg-sidebar-accent text-sidebar-accent-foreground">…</a> aka getByRole('link', { name: 'Contacts' })
    6) <a href="/companies" data-discover="true" class="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">…</a> aka getByRole('link', { name: 'Companies' })
    7) <a href="/tasks" data-discover="true" class="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">…</a> aka getByRole('link', { name: 'Tasks' })
    8) <a href="/activities" data-discover="true" class="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">…</a> aka getByRole('link', { name: 'Activities' })
    9) <button type="button" class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">…</button> aka getByRole('button', { name: 'Switch to dark mode' })
    10) <button type="button" class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">…</button> aka getByRole('button', { name: 'Log out' })

Call log:
  - Expect "toBeVisible" locator('[role="navigation"], [class*="sidebar"], nav') with timeout 1000ms
  - waiting for locator('[role="navigation"], [class*="sidebar"], nav')

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
          - heading "Contacts" [level=1] [ref=f2e64]
          - link "Create Contact" [ref=f2e65] [cursor=pointer]:
            - /url: /contacts/new
        - generic [ref=f2e66]:
          - textbox "Search contacts..." [ref=f2e67]
          - button "Quick Add" [ref=f2e69]
        - list [ref=f2e72]:
          - listitem [ref=f2e73]:
            - 'link "Larry Morgan larry.morgan@example.com +1-986-722-2839 Company: 79990c86-02fc-462f-a65b-70270be670ba" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/57c9d43f-b65c-4bb6-8099-eb1ce7a7d866
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Larry Morgan
                - generic [ref=f2e77]: larry.morgan@example.com
                - generic [ref=f2e78]: +1-986-722-2839
                - generic [ref=f2e79]: "Company: 79990c86-02fc-462f-a65b-70270be670ba"
          - listitem [ref=f2e80]:
            - link "Jonathan Jackson jonathan.jackson@example.com +1-755-488-9963" [ref=f2e81] [cursor=pointer]:
              - /url: /contacts/3380fee5-18a0-451f-a5f4-eaa61d40056c
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: Jonathan Jackson
                - generic [ref=f2e84]: jonathan.jackson@example.com
                - generic [ref=f2e85]: +1-755-488-9963
          - listitem [ref=f2e86]:
            - 'link "Joseph Ortiz joseph.ortiz@example.com +1-465-543-8142 Company: ea019bea-6cc4-4d3b-9c4f-61b0bb03de19" [ref=f2e87] [cursor=pointer]':
              - /url: /contacts/f8b7e704-870e-49f5-a034-cc0446413f21
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: Joseph Ortiz
                - generic [ref=f2e90]: joseph.ortiz@example.com
                - generic [ref=f2e91]: +1-465-543-8142
                - generic [ref=f2e92]: "Company: ea019bea-6cc4-4d3b-9c4f-61b0bb03de19"
          - listitem [ref=f2e93]:
            - link "Betty Smith betty.smith@example.com +1-551-650-5494" [ref=f2e94] [cursor=pointer]:
              - /url: /contacts/ed32e983-1a66-4379-9c3a-9ecd99e73628
              - generic [ref=f2e95]:
                - generic [ref=f2e96]: Betty Smith
                - generic [ref=f2e97]: betty.smith@example.com
                - generic [ref=f2e98]: +1-551-650-5494
          - listitem [ref=f2e99]:
            - 'link "Diane Perez diane.perez@example.com +1-422-826-2922 Company: a1f0edf8-ce83-41ef-b235-1e35c6f8a8d7" [ref=f2e100] [cursor=pointer]':
              - /url: /contacts/0fac8f68-5f87-46bf-8361-62f46fd0410c
              - generic [ref=f2e101]:
                - generic [ref=f2e102]: Diane Perez
                - generic [ref=f2e103]: diane.perez@example.com
                - generic [ref=f2e104]: +1-422-826-2922
                - generic [ref=f2e105]: "Company: a1f0edf8-ce83-41ef-b235-1e35c6f8a8d7"
          - listitem [ref=f2e106]:
            - link "Mary Hunter mary.hunter@example.com +1-226-442-3996" [ref=f2e107] [cursor=pointer]:
              - /url: /contacts/668ab031-0e82-48c7-9be0-9a8a535b0e55
              - generic [ref=f2e108]:
                - generic [ref=f2e109]: Mary Hunter
                - generic [ref=f2e110]: mary.hunter@example.com
                - generic [ref=f2e111]: +1-226-442-3996
          - listitem [ref=f2e112]:
            - link "Kyle Fleming kyle.fleming@example.com +1-709-796-3959" [ref=f2e113] [cursor=pointer]:
              - /url: /contacts/d2a8417a-070a-4e8e-a18d-1074bea0b340
              - generic [ref=f2e114]:
                - generic [ref=f2e115]: Kyle Fleming
                - generic [ref=f2e116]: kyle.fleming@example.com
                - generic [ref=f2e117]: +1-709-796-3959
          - listitem [ref=f2e118]:
            - link "George Lewis george.lewis@example.com +1-790-692-1070" [ref=f2e119] [cursor=pointer]:
              - /url: /contacts/eab8bc7c-bb25-40cc-80bd-5e8a14d48a1a
              - generic [ref=f2e120]:
                - generic [ref=f2e121]: George Lewis
                - generic [ref=f2e122]: george.lewis@example.com
                - generic [ref=f2e123]: +1-790-692-1070
          - listitem [ref=f2e124]:
            - link "Mary Hernandez mary.hernandez@example.com +1-577-218-5344" [ref=f2e125] [cursor=pointer]:
              - /url: /contacts/4401a65a-3063-4d4b-abd8-4e4e15ab8410
              - generic [ref=f2e126]:
                - generic [ref=f2e127]: Mary Hernandez
                - generic [ref=f2e128]: mary.hernandez@example.com
                - generic [ref=f2e129]: +1-577-218-5344
          - listitem [ref=f2e130]:
            - link "Carl Wagner carl.wagner@example.com +1-386-733-1690" [ref=f2e131] [cursor=pointer]:
              - /url: /contacts/6844fccc-00cc-4d53-b2b1-a1e8d0ba242c
              - generic [ref=f2e132]:
                - generic [ref=f2e133]: Carl Wagner
                - generic [ref=f2e134]: carl.wagner@example.com
                - generic [ref=f2e135]: +1-386-733-1690
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login, setupTestEnvironment } from './fixtures/setup';
  3  | 
  4  | test.describe('Navigation Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('sidebar renders correctly', async ({ page }) => {
  10 |     await login(page);
  11 | 
  12 |     await expect(page.locator('[role="navigation"], [class*="sidebar"], nav')).toBeVisible();
  13 |   });
  14 | 
  15 |   test('sidebar menu items exist', async ({ page }) => {
  16 |     await login(page);
  17 | 
  18 |     await expect(
  19 |       page.locator('[role="navigation"] a, [class*="sidebar"] a, nav a').first()
  20 |     ).toBeVisible();
  21 |   });
  22 | 
  23 |   test('sidebar navigation routes correctly', async ({ page }) => {
  24 |     await login(page);
  25 | 
  26 |     const sidebarLink = page.locator('[role="navigation"] a, [class*="sidebar"] a').first();
  27 |     await sidebarLink.click();
  28 | 
  29 |     await expect(page).toHaveURL(/\/\w+/);
  30 |   });
  31 | 
  32 |   test('breadcrumb navigation works', async ({ page }) => {
  33 |     await login(page);
  34 |     await page.goto('/contacts');
  35 | 
> 36 |     await expect(page.locator('[role="navigation"], [class*="sidebar"], nav')).toBeVisible();
     |                                                                                ^ Error: expect(locator).toBeVisible() failed
  37 | 
  38 |     const sidebarLink = page.locator('[role="navigation"] a, [class*="sidebar"] a').first();
  39 |     await sidebarLink.click();
  40 | 
  41 |     await expect(page).toHaveURL(/\/\w+/);
  42 |   });
  43 | });
  44 | 
```