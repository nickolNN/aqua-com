# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: reports.spec.ts >> Search Tests >> global search can be used to search
- Location: tests/e2e/reports.spec.ts:46:3

# Error details

```
TimeoutError: locator.fill: Timeout 200ms exceeded.
Call log:
  - waiting for locator('input[placeholder="Search"], input[type="search"]')

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
            - link "Ronald Wells ronald.wells@example.com +1-852-372-3553" [ref=f2e74] [cursor=pointer]:
              - /url: /contacts/ca4daf8d-3ad9-4aac-8f44-dd7b244d7d79
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Ronald Wells
                - generic [ref=f2e77]: ronald.wells@example.com
                - generic [ref=f2e78]: +1-852-372-3553
          - listitem [ref=f2e79]:
            - link "Betty Lopez betty.lopez@example.com +1-812-249-6783" [ref=f2e80] [cursor=pointer]:
              - /url: /contacts/442d43fb-acbc-43f0-b593-976a7512927d
              - generic [ref=f2e81]:
                - generic [ref=f2e82]: Betty Lopez
                - generic [ref=f2e83]: betty.lopez@example.com
                - generic [ref=f2e84]: +1-812-249-6783
          - listitem [ref=f2e85]:
            - 'link "Jason Hunter jason.hunter@example.com +1-493-701-3148 Company: b98f3ff8-3496-49aa-b3f7-8456db8b3534" [ref=f2e86] [cursor=pointer]':
              - /url: /contacts/7c2847d9-b77c-44b2-a4d6-7603e5e903f8
              - generic [ref=f2e87]:
                - generic [ref=f2e88]: Jason Hunter
                - generic [ref=f2e89]: jason.hunter@example.com
                - generic [ref=f2e90]: +1-493-701-3148
                - generic [ref=f2e91]: "Company: b98f3ff8-3496-49aa-b3f7-8456db8b3534"
          - listitem [ref=f2e92]:
            - link "Susan Harrison susan.harrison@example.com +1-270-394-1382" [ref=f2e93] [cursor=pointer]:
              - /url: /contacts/37616beb-9e1a-428a-9d8a-ad45dc6183e1
              - generic [ref=f2e94]:
                - generic [ref=f2e95]: Susan Harrison
                - generic [ref=f2e96]: susan.harrison@example.com
                - generic [ref=f2e97]: +1-270-394-1382
          - listitem [ref=f2e98]:
            - link "Patricia Hernandez patricia.hernandez@example.com +1-952-865-1260" [ref=f2e99] [cursor=pointer]:
              - /url: /contacts/05b0c450-7e27-4959-ac6b-bd563d324f1a
              - generic [ref=f2e100]:
                - generic [ref=f2e101]: Patricia Hernandez
                - generic [ref=f2e102]: patricia.hernandez@example.com
                - generic [ref=f2e103]: +1-952-865-1260
          - listitem [ref=f2e104]:
            - 'link "Daniel Walker daniel.walker@example.com +1-312-223-7733 Company: 4808be9b-a838-4b94-bd06-7af2209db0c6" [ref=f2e105] [cursor=pointer]':
              - /url: /contacts/a5612e0a-1dd2-4be5-bbeb-60c88c94cbb4
              - generic [ref=f2e106]:
                - generic [ref=f2e107]: Daniel Walker
                - generic [ref=f2e108]: daniel.walker@example.com
                - generic [ref=f2e109]: +1-312-223-7733
                - generic [ref=f2e110]: "Company: 4808be9b-a838-4b94-bd06-7af2209db0c6"
          - listitem [ref=f2e111]:
            - link "Jeffrey Richardson jeffrey.richardson@example.com +1-405-433-7878" [ref=f2e112] [cursor=pointer]:
              - /url: /contacts/f40b7ddd-3d65-4372-882c-77f86196c02f
              - generic [ref=f2e113]:
                - generic [ref=f2e114]: Jeffrey Richardson
                - generic [ref=f2e115]: jeffrey.richardson@example.com
                - generic [ref=f2e116]: +1-405-433-7878
          - listitem [ref=f2e117]:
            - link "Charles Webb charles.webb@example.com +1-973-953-4809" [ref=f2e118] [cursor=pointer]:
              - /url: /contacts/4493801f-8e83-4930-a443-06338162c374
              - generic [ref=f2e119]:
                - generic [ref=f2e120]: Charles Webb
                - generic [ref=f2e121]: charles.webb@example.com
                - generic [ref=f2e122]: +1-973-953-4809
          - listitem [ref=f2e123]:
            - 'link "Cynthia Wagner cynthia.wagner@example.com +1-424-974-2837 Company: 2638641f-98fd-44e5-b781-3532eeae364e" [ref=f2e124] [cursor=pointer]':
              - /url: /contacts/da544fed-de46-4c5e-b9c8-6f851cacc68c
              - generic [ref=f2e125]:
                - generic [ref=f2e126]: Cynthia Wagner
                - generic [ref=f2e127]: cynthia.wagner@example.com
                - generic [ref=f2e128]: +1-424-974-2837
                - generic [ref=f2e129]: "Company: 2638641f-98fd-44e5-b781-3532eeae364e"
          - listitem [ref=f2e130]:
            - 'link "Kimberly Cole kimberly.cole@example.com +1-467-432-9056 Company: f5ce2977-a069-47fb-b792-c3f6f9583b91" [ref=f2e131] [cursor=pointer]':
              - /url: /contacts/33a9d1f1-bef3-4aed-b105-360352bd8cde
              - generic [ref=f2e132]:
                - generic [ref=f2e133]: Kimberly Cole
                - generic [ref=f2e134]: kimberly.cole@example.com
                - generic [ref=f2e135]: +1-467-432-9056
                - generic [ref=f2e136]: "Company: f5ce2977-a069-47fb-b792-c3f6f9583b91"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login, setupTestEnvironment } from './fixtures/setup';
  3  | 
  4  | test.describe('Reports Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('reports page loads', async ({ page }) => {
  10 |     await login(page);
  11 |     await page.goto('/reports');
  12 | 
  13 |     await expect(page.locator('h1', { hasText: /Reports/ })).toBeVisible();
  14 |   });
  15 | 
  16 |   test('reports tabs exist', async ({ page }) => {
  17 |     await login(page);
  18 |     await page.goto('/reports');
  19 | 
  20 |     const tabs = page.locator('text=Tasks, text=Contacts, text=Activities, text=Pipeline, [role="tab"]');
  21 |     await expect(tabs.first()).toBeVisible();
  22 |   });
  23 | 
  24 |   test('reports tab switching works', async ({ page }) => {
  25 |     await login(page);
  26 |     await page.goto('/reports');
  27 | 
  28 |     const taskTab = page.locator('text=Tasks, [role="tab"]');
  29 |     await taskTab.click();
  30 | 
  31 |     await expect(page.locator('text=Tasks')).toBeVisible();
  32 |   });
  33 | });
  34 | 
  35 | test.describe('Search Tests', () => {
  36 |   test.beforeEach(async ({ page }) => {
  37 |     await setupTestEnvironment(page);
  38 |   });
  39 | 
  40 |   test('global search input exists', async ({ page }) => {
  41 |     await login(page);
  42 | 
  43 |     await expect(page.locator('input[placeholder="Search"], input[type="search"]')).toBeVisible();
  44 |   });
  45 | 
  46 |   test('global search can be used to search', async ({ page }) => {
  47 |     await login(page);
  48 |     await page.goto('/contacts');
  49 | 
  50 |     const searchInput = page.locator('input[placeholder="Search"], input[type="search"]');
> 51 |     await searchInput.fill('Test');
     |                       ^ TimeoutError: locator.fill: Timeout 200ms exceeded.
  52 | 
  53 |     await expect(page.locator('input[placeholder="Search"], input[type="search"]')).toHaveValue('Test');
  54 |   });
  55 | });
  56 | 
```