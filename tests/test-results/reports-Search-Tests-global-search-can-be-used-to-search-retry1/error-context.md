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
            - link "Joshua Kelly joshua.kelly@example.com +1-641-548-5642" [ref=f2e74] [cursor=pointer]:
              - /url: /contacts/008822a2-587d-4bbc-b66a-56882e387ce3
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Joshua Kelly
                - generic [ref=f2e77]: joshua.kelly@example.com
                - generic [ref=f2e78]: +1-641-548-5642
          - listitem [ref=f2e79]:
            - 'link "Martin Thompson martin.thompson@example.com +1-453-810-7163 Company: 04ddf6a2-7207-4f36-b5d4-026f1af38e56" [ref=f2e80] [cursor=pointer]':
              - /url: /contacts/764a0f01-bb4f-4683-bbe8-712a3c09ff6d
              - generic [ref=f2e81]:
                - generic [ref=f2e82]: Martin Thompson
                - generic [ref=f2e83]: martin.thompson@example.com
                - generic [ref=f2e84]: +1-453-810-7163
                - generic [ref=f2e85]: "Company: 04ddf6a2-7207-4f36-b5d4-026f1af38e56"
          - listitem [ref=f2e86]:
            - 'link "Peter Bennett peter.bennett@example.com +1-685-285-5745 Company: 3178cdc4-758f-42b6-b8e3-6bd732c9622c" [ref=f2e87] [cursor=pointer]':
              - /url: /contacts/fea772e8-167e-4ac7-bcbb-598ae8170c59
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: Peter Bennett
                - generic [ref=f2e90]: peter.bennett@example.com
                - generic [ref=f2e91]: +1-685-285-5745
                - generic [ref=f2e92]: "Company: 3178cdc4-758f-42b6-b8e3-6bd732c9622c"
          - listitem [ref=f2e93]:
            - 'link "Christopher Bennett christopher.bennett@example.com +1-997-556-9457 Company: b6c02e4a-b64b-40fb-aadb-1a6cf222043f" [ref=f2e94] [cursor=pointer]':
              - /url: /contacts/25ecef1a-aad7-499c-b584-c0e34c6a5d28
              - generic [ref=f2e95]:
                - generic [ref=f2e96]: Christopher Bennett
                - generic [ref=f2e97]: christopher.bennett@example.com
                - generic [ref=f2e98]: +1-997-556-9457
                - generic [ref=f2e99]: "Company: b6c02e4a-b64b-40fb-aadb-1a6cf222043f"
          - listitem [ref=f2e100]:
            - 'link "Joshua Wells joshua.wells@example.com +1-699-441-1063 Company: c01862a7-0264-4884-a0d9-58dcf4e09770" [ref=f2e101] [cursor=pointer]':
              - /url: /contacts/682d80e3-43fb-4360-af78-e08d1582aec6
              - generic [ref=f2e102]:
                - generic [ref=f2e103]: Joshua Wells
                - generic [ref=f2e104]: joshua.wells@example.com
                - generic [ref=f2e105]: +1-699-441-1063
                - generic [ref=f2e106]: "Company: c01862a7-0264-4884-a0d9-58dcf4e09770"
          - listitem [ref=f2e107]:
            - 'link "Margaret Curtis margaret.curtis@example.com +1-981-966-1214 Company: c6eaa6e1-3634-463f-84bd-2fe766526710" [ref=f2e108] [cursor=pointer]':
              - /url: /contacts/caa2ee30-399f-4527-ae40-33d1402eeebc
              - generic [ref=f2e109]:
                - generic [ref=f2e110]: Margaret Curtis
                - generic [ref=f2e111]: margaret.curtis@example.com
                - generic [ref=f2e112]: +1-981-966-1214
                - generic [ref=f2e113]: "Company: c6eaa6e1-3634-463f-84bd-2fe766526710"
          - listitem [ref=f2e114]:
            - link "George Ellis george.ellis@example.com +1-256-408-7332" [ref=f2e115] [cursor=pointer]:
              - /url: /contacts/9fee1932-7f4f-40a9-8137-69b2061f7894
              - generic [ref=f2e116]:
                - generic [ref=f2e117]: George Ellis
                - generic [ref=f2e118]: george.ellis@example.com
                - generic [ref=f2e119]: +1-256-408-7332
          - listitem [ref=f2e120]:
            - 'link "Ryan Ward ryan.ward@example.com +1-413-675-5196 Company: 50d9cc7e-d1f1-4ff3-b3db-edfd57dd2c4f" [ref=f2e121] [cursor=pointer]':
              - /url: /contacts/949f7e1f-ade6-476a-8c85-8344d44bbdfe
              - generic [ref=f2e122]:
                - generic [ref=f2e123]: Ryan Ward
                - generic [ref=f2e124]: ryan.ward@example.com
                - generic [ref=f2e125]: +1-413-675-5196
                - generic [ref=f2e126]: "Company: 50d9cc7e-d1f1-4ff3-b3db-edfd57dd2c4f"
          - listitem [ref=f2e127]:
            - 'link "Robert Rodriguez robert.rodriguez@example.com +1-225-506-8416 Company: eafd87af-32fc-4316-a629-df0a959c5e66" [ref=f2e128] [cursor=pointer]':
              - /url: /contacts/987aaf54-3e2f-4bb1-a224-6e0f55ee24ca
              - generic [ref=f2e129]:
                - generic [ref=f2e130]: Robert Rodriguez
                - generic [ref=f2e131]: robert.rodriguez@example.com
                - generic [ref=f2e132]: +1-225-506-8416
                - generic [ref=f2e133]: "Company: eafd87af-32fc-4316-a629-df0a959c5e66"
          - listitem [ref=f2e134]:
            - link "Carl Fisher carl.fisher@example.com +1-298-826-5448" [ref=f2e135] [cursor=pointer]:
              - /url: /contacts/ee04e1ac-d887-4e84-a995-d8fc353d9186
              - generic [ref=f2e136]:
                - generic [ref=f2e137]: Carl Fisher
                - generic [ref=f2e138]: carl.fisher@example.com
                - generic [ref=f2e139]: +1-298-826-5448
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