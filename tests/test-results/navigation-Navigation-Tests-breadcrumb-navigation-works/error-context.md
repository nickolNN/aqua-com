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
            - 'link "Henry Johnson henry.johnson@example.com +1-833-638-7771 Company: 559122ab-2464-4fca-8505-e09628eec711" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/97cdb8af-7e36-4a7c-b43b-2df280967459
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Henry Johnson
                - generic [ref=f2e77]: henry.johnson@example.com
                - generic [ref=f2e78]: +1-833-638-7771
                - generic [ref=f2e79]: "Company: 559122ab-2464-4fca-8505-e09628eec711"
          - listitem [ref=f2e80]:
            - 'link "Andrew Harrison andrew.harrison@example.com +1-567-409-4405 Company: 40875864-bdbd-4e60-90c8-f2a21878f218" [ref=f2e81] [cursor=pointer]':
              - /url: /contacts/7ce0d758-ebf7-4dec-b819-c41ab97b59db
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: Andrew Harrison
                - generic [ref=f2e84]: andrew.harrison@example.com
                - generic [ref=f2e85]: +1-567-409-4405
                - generic [ref=f2e86]: "Company: 40875864-bdbd-4e60-90c8-f2a21878f218"
          - listitem [ref=f2e87]:
            - link "Michelle Morgan michelle.morgan@example.com +1-270-886-1939" [ref=f2e88] [cursor=pointer]:
              - /url: /contacts/2dcf3018-821f-45f2-9323-49b6457da026
              - generic [ref=f2e89]:
                - generic [ref=f2e90]: Michelle Morgan
                - generic [ref=f2e91]: michelle.morgan@example.com
                - generic [ref=f2e92]: +1-270-886-1939
          - listitem [ref=f2e93]:
            - 'link "Eleanor Richardson eleanor.richardson@example.com +1-251-241-8145 Company: fb4620b5-94db-4d04-b741-6765e6854c47" [ref=f2e94] [cursor=pointer]':
              - /url: /contacts/c2e5c155-a6cf-4b93-94f9-e4ed13a88bab
              - generic [ref=f2e95]:
                - generic [ref=f2e96]: Eleanor Richardson
                - generic [ref=f2e97]: eleanor.richardson@example.com
                - generic [ref=f2e98]: +1-251-241-8145
                - generic [ref=f2e99]: "Company: fb4620b5-94db-4d04-b741-6765e6854c47"
          - listitem [ref=f2e100]:
            - 'link "Joseph Hunter joseph.hunter@example.com +1-210-773-1767 Company: 01c4e991-a5f3-4536-a6eb-4ed27b422db7" [ref=f2e101] [cursor=pointer]':
              - /url: /contacts/be5dbfd7-17c2-45c1-af8c-bc2813445068
              - generic [ref=f2e102]:
                - generic [ref=f2e103]: Joseph Hunter
                - generic [ref=f2e104]: joseph.hunter@example.com
                - generic [ref=f2e105]: +1-210-773-1767
                - generic [ref=f2e106]: "Company: 01c4e991-a5f3-4536-a6eb-4ed27b422db7"
          - listitem [ref=f2e107]:
            - 'link "Michelle Diaz michelle.diaz@example.com +1-350-768-9570 Company: faa1afca-722b-4037-8a9a-b18ff41a790a" [ref=f2e108] [cursor=pointer]':
              - /url: /contacts/18efca4a-e21f-44e8-b9aa-92705cd5153f
              - generic [ref=f2e109]:
                - generic [ref=f2e110]: Michelle Diaz
                - generic [ref=f2e111]: michelle.diaz@example.com
                - generic [ref=f2e112]: +1-350-768-9570
                - generic [ref=f2e113]: "Company: faa1afca-722b-4037-8a9a-b18ff41a790a"
          - listitem [ref=f2e114]:
            - 'link "Emily Young emily.young@example.com +1-334-785-3515 Company: 26031be1-da8c-4d55-b4da-31148642cc35" [ref=f2e115] [cursor=pointer]':
              - /url: /contacts/93f04eb5-d1f3-478b-848a-29ac43a52099
              - generic [ref=f2e116]:
                - generic [ref=f2e117]: Emily Young
                - generic [ref=f2e118]: emily.young@example.com
                - generic [ref=f2e119]: +1-334-785-3515
                - generic [ref=f2e120]: "Company: 26031be1-da8c-4d55-b4da-31148642cc35"
          - listitem [ref=f2e121]:
            - link "Mark Hunter mark.hunter@example.com +1-484-488-8046" [ref=f2e122] [cursor=pointer]:
              - /url: /contacts/9731c901-6358-40ba-909a-c3a95fb5ac36
              - generic [ref=f2e123]:
                - generic [ref=f2e124]: Mark Hunter
                - generic [ref=f2e125]: mark.hunter@example.com
                - generic [ref=f2e126]: +1-484-488-8046
          - listitem [ref=f2e127]:
            - 'link "Mary Hart mary.hart@example.com +1-990-696-8570 Company: 24dd8671-58ef-4495-9183-a51d8f260d25" [ref=f2e128] [cursor=pointer]':
              - /url: /contacts/9ef211fa-a037-4a6e-a83b-cf9054652a68
              - generic [ref=f2e129]:
                - generic [ref=f2e130]: Mary Hart
                - generic [ref=f2e131]: mary.hart@example.com
                - generic [ref=f2e132]: +1-990-696-8570
                - generic [ref=f2e133]: "Company: 24dd8671-58ef-4495-9183-a51d8f260d25"
          - listitem [ref=f2e134]:
            - link "Mary Walker mary.walker@example.com +1-646-535-2826" [ref=f2e135] [cursor=pointer]:
              - /url: /contacts/94549d84-9301-435c-a72d-63ce6d92ce26
              - generic [ref=f2e136]:
                - generic [ref=f2e137]: Mary Walker
                - generic [ref=f2e138]: mary.walker@example.com
                - generic [ref=f2e139]: +1-646-535-2826
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