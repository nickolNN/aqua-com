# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation Tests >> sidebar renders correctly
- Location: tests/e2e/navigation.spec.ts:9:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[role="navigation"], [class*="sidebar"], nav')
Expected: visible
Error: strict mode violation: locator('[role="navigation"], [class*="sidebar"], nav') resolved to 10 elements:
    1) <aside class="sticky top-0 h-screen w-64 flex flex-col border-r bg-sidebar text-sidebar-foreground">…</aside> aka getByRole('complementary')
    2) <div class="h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">…</div> aka getByText('Aqua CRMDashboardContactsCompaniesTasksActivitiesSwitch to dark modeLog out')
    3) <nav class="flex flex-col gap-1 p-2">…</nav> aka getByText('DashboardContactsCompaniesTasksActivitiesSwitch to dark modeLog out')
    4) <a href="/" aria-current="page" data-discover="true" class="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors bg-sidebar-accent text-sidebar-accent-foreground">…</a> aka getByRole('link', { name: 'Dashboard' })
    5) <a href="/contacts" data-discover="true" class="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">…</a> aka getByRole('link', { name: 'Contacts' })
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
              - paragraph [ref=f1e77]: "12"
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
                - generic [ref=f1e96]: Open
                - generic [ref=f1e97]: 12 (26.7%)
              - generic [ref=f1e101]:
                - generic [ref=f1e102]: In Progress
                - generic [ref=f1e103]: 12 (26.7%)
              - generic [ref=f1e107]:
                - generic [ref=f1e108]: Cancelled
                - generic [ref=f1e109]: 11 (24.4%)
              - generic [ref=f1e113]:
                - generic [ref=f1e114]: Completed
                - generic [ref=f1e115]: 10 (22.2%)
          - generic [ref=f1e118]:
            - heading "Activity Type Breakdown" [level=3] [ref=f1e119]
            - generic [ref=f1e120]:
              - generic [ref=f1e122]:
                - generic [ref=f1e123]: Email
                - generic [ref=f1e124]: 8 (22.9%)
              - generic [ref=f1e128]:
                - generic [ref=f1e129]: Other
                - generic [ref=f1e130]: 7 (20.0%)
              - generic [ref=f1e134]:
                - generic [ref=f1e135]: Task
                - generic [ref=f1e136]: 4 (11.4%)
              - generic [ref=f1e140]:
                - generic [ref=f1e141]: Meeting
                - generic [ref=f1e142]: 4 (11.4%)
              - generic [ref=f1e146]:
                - generic [ref=f1e147]: Deal
                - generic [ref=f1e148]: 4 (11.4%)
        - generic [ref=f1e151]:
          - generic [ref=f1e152]:
            - heading "Task Priority Distribution" [level=3] [ref=f1e153]
            - generic [ref=f1e162]:
              - generic [ref=f1e163]:
                - generic [ref=f1e165]: Low (15)
                - generic [ref=f1e166]: (33.3%)
              - generic [ref=f1e167]:
                - generic [ref=f1e169]: Urgent (14)
                - generic [ref=f1e170]: (31.1%)
              - generic [ref=f1e171]:
                - generic [ref=f1e173]: Medium (9)
                - generic [ref=f1e174]: (20.0%)
              - generic [ref=f1e175]:
                - generic [ref=f1e177]: High (7)
                - generic [ref=f1e178]: (15.6%)
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
              - generic [ref=f1e217]: 9/15/2026
              - generic [ref=f1e218]: Contract negotiation
              - generic [ref=f1e219]: call
            - generic [ref=f1e220]:
              - generic [ref=f1e221]: 9/3/2026
              - generic [ref=f1e222]: Technical review
              - generic [ref=f1e223]: call
            - generic [ref=f1e224]:
              - generic [ref=f1e225]: 9/24/2026
              - generic [ref=f1e226]: Follow-up call
              - generic [ref=f1e227]: call
            - generic [ref=f1e228]:
              - generic [ref=f1e229]: 9/9/2026
              - generic [ref=f1e230]: Status update
              - generic [ref=f1e231]: meeting
            - generic [ref=f1e232]:
              - generic [ref=f1e233]: 8/5/2026
              - generic [ref=f1e234]: Initial phone call
              - generic [ref=f1e235]: meeting
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
> 12 |     await expect(page.locator('[role="navigation"], [class*="sidebar"], nav')).toBeVisible();
     |                                                                                ^ Error: expect(locator).toBeVisible() failed
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
  36 |     await expect(page.locator('[role="navigation"], [class*="sidebar"], nav')).toBeVisible();
  37 | 
  38 |     const sidebarLink = page.locator('[role="navigation"] a, [class*="sidebar"] a').first();
  39 |     await sidebarLink.click();
  40 | 
  41 |     await expect(page).toHaveURL(/\/\w+/);
  42 |   });
  43 | });
  44 | 
```