# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-list.spec.ts >> Contact List Tests >> contact list displays contacts
- Location: tests/e2e/contacts/contact-list.spec.ts:17:3

# Error details

```
TypeError: expect(...).toHaveCountGreaterThan is not a function
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
            - 'link "Tammy Ward tammy.ward@example.com +1-251-558-6352 Company: e093c7d1-8516-4a8e-8e15-6815838fa9e7" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/1f11c745-ee75-451f-9686-4f45ecdc9ae3
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Tammy Ward
                - generic [ref=f2e77]: tammy.ward@example.com
                - generic [ref=f2e78]: +1-251-558-6352
                - generic [ref=f2e79]: "Company: e093c7d1-8516-4a8e-8e15-6815838fa9e7"
          - listitem [ref=f2e80]:
            - link "Nathan Webb nathan.webb@example.com +1-952-655-9123" [ref=f2e81] [cursor=pointer]:
              - /url: /contacts/6922117f-b8c0-490e-a2f5-2adfd4fc1f27
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: Nathan Webb
                - generic [ref=f2e84]: nathan.webb@example.com
                - generic [ref=f2e85]: +1-952-655-9123
          - listitem [ref=f2e86]:
            - link "Thomas Martinez thomas.martinez@example.com +1-928-350-5616" [ref=f2e87] [cursor=pointer]:
              - /url: /contacts/40c028b4-f647-4421-be8d-58914b07fd55
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: Thomas Martinez
                - generic [ref=f2e90]: thomas.martinez@example.com
                - generic [ref=f2e91]: +1-928-350-5616
          - listitem [ref=f2e92]:
            - link "Thomas Hunter thomas.hunter@example.com +1-869-276-8366" [ref=f2e93] [cursor=pointer]:
              - /url: /contacts/2db64aeb-a382-48a2-b672-1697d1905bca
              - generic [ref=f2e94]:
                - generic [ref=f2e95]: Thomas Hunter
                - generic [ref=f2e96]: thomas.hunter@example.com
                - generic [ref=f2e97]: +1-869-276-8366
          - listitem [ref=f2e98]:
            - 'link "Nancy Fleming nancy.fleming@example.com +1-605-928-9000 Company: 782c957c-5c7b-494f-a6f7-137a0c7ed112" [ref=f2e99] [cursor=pointer]':
              - /url: /contacts/fb5a1f4d-f483-4fbd-aef1-b3b48a151602
              - generic [ref=f2e100]:
                - generic [ref=f2e101]: Nancy Fleming
                - generic [ref=f2e102]: nancy.fleming@example.com
                - generic [ref=f2e103]: +1-605-928-9000
                - generic [ref=f2e104]: "Company: 782c957c-5c7b-494f-a6f7-137a0c7ed112"
          - listitem [ref=f2e105]:
            - 'link "Barbara Miller barbara.miller@example.com +1-903-588-1047 Company: 3c979cc2-e1a6-4b3b-a41b-1f567b454ab0" [ref=f2e106] [cursor=pointer]':
              - /url: /contacts/138fd8b9-3cc4-40f3-829a-c2c4c7d837e7
              - generic [ref=f2e107]:
                - generic [ref=f2e108]: Barbara Miller
                - generic [ref=f2e109]: barbara.miller@example.com
                - generic [ref=f2e110]: +1-903-588-1047
                - generic [ref=f2e111]: "Company: 3c979cc2-e1a6-4b3b-a41b-1f567b454ab0"
          - listitem [ref=f2e112]:
            - link "Peter Thomas peter.thomas@example.com +1-373-380-5369" [ref=f2e113] [cursor=pointer]:
              - /url: /contacts/4c89af36-699e-4f0f-8622-3dda5c55f9be
              - generic [ref=f2e114]:
                - generic [ref=f2e115]: Peter Thomas
                - generic [ref=f2e116]: peter.thomas@example.com
                - generic [ref=f2e117]: +1-373-380-5369
          - listitem [ref=f2e118]:
            - 'link "Emily Lopez emily.lopez@example.com +1-328-526-2238 Company: 5624c9d5-b546-43c7-9936-f76966a898b4" [ref=f2e119] [cursor=pointer]':
              - /url: /contacts/50997721-9809-4729-80ce-9482d89e8eda
              - generic [ref=f2e120]:
                - generic [ref=f2e121]: Emily Lopez
                - generic [ref=f2e122]: emily.lopez@example.com
                - generic [ref=f2e123]: +1-328-526-2238
                - generic [ref=f2e124]: "Company: 5624c9d5-b546-43c7-9936-f76966a898b4"
          - listitem [ref=f2e125]:
            - link "Maria Hart maria.hart@example.com +1-495-820-7754" [ref=f2e126] [cursor=pointer]:
              - /url: /contacts/c43787b7-a220-412f-9577-5ef30374914e
              - generic [ref=f2e127]:
                - generic [ref=f2e128]: Maria Hart
                - generic [ref=f2e129]: maria.hart@example.com
                - generic [ref=f2e130]: +1-495-820-7754
          - listitem [ref=f2e131]:
            - 'link "Rachel Curtis rachel.curtis@example.com +1-281-585-3182 Company: e4c8dd70-c3da-406f-bad3-802e368becbc" [ref=f2e132] [cursor=pointer]':
              - /url: /contacts/467bc3e9-03a5-4bf3-92cb-2fcb5249adae
              - generic [ref=f2e133]:
                - generic [ref=f2e134]: Rachel Curtis
                - generic [ref=f2e135]: rachel.curtis@example.com
                - generic [ref=f2e136]: +1-281-585-3182
                - generic [ref=f2e137]: "Company: e4c8dd70-c3da-406f-bad3-802e368becbc"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login, setupTestEnvironment } from '../fixtures/setup';
  3  | 
  4  | test.describe('Contact List Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('contact list view loads correctly', async ({ page }) => {
  10 |     await login(page);
  11 |     await page.goto('/contacts');
  12 | 
  13 |     // Verify page title
  14 |     await expect(page.locator('h1', { hasText: /Contacts/ })).toBeVisible();
  15 |   });
  16 | 
  17 |   test('contact list displays contacts', async ({ page }) => {
  18 |     await login(page);
  19 |     await page.goto('/contacts');
  20 | 
  21 |     // Verify contact cards are displayed
  22 |     const contactCards = page.locator('a[class*="flex items-center gap-4"], [class*="divide-y"]');
> 23 |     await expect(contactCards).toHaveCountGreaterThan(0);
     |                                ^ TypeError: expect(...).toHaveCountGreaterThan is not a function
  24 |   });
  25 | 
  26 |   test('contact list search filters contacts', async ({ page }) => {
  27 |     await login(page);
  28 |     await page.goto('/contacts');
  29 | 
  30 |     // Use search input
  31 |     const searchInput = page.locator('input[type="text"], input[placeholder="Search contacts..."]');
  32 |     await searchInput.fill('Test');
  33 |     const contactCards = page.locator('a[class*="flex items-center gap-4"]');
  34 |     await expect(contactCards).toBeVisible();
  35 |   });
  36 | 
  37 |   test('contact card is clickable', async ({ page }) => {
  38 |     await login(page);
  39 |     await page.goto('/contacts');
  40 | 
  41 |     // Click on first contact
  42 |     const contactCard = page.locator('a[class*="flex items-center gap-4"]:first');
  43 |     await contactCard.click();
  44 | 
  45 |     // Verify navigation to contact detail
  46 |     await expect(page.locator('h1', { hasText: /Contact|Task Details/ })).toBeVisible();
  47 |   });
  48 | 
  49 |   test('contact list shows no contacts message when empty', async ({ page }) => {
  50 |     await login(page);
  51 |     await page.goto('/contacts');
  52 | 
  53 |     // Verify contacts list renders
  54 |     await expect(page.locator('h1', { hasText: /Contacts/ })).toBeVisible();
  55 |   });
  56 | 
  57 |   test('quick add contact form works', async ({ page }) => {
  58 |     await login(page);
  59 |     await page.goto('/contacts');
  60 | 
  61 |     // Click quick add button
  62 |     const quickAddBtn = page.locator('button', { hasText: /Quick Add/ });
  63 |     await quickAddBtn.click();
  64 | 
  65 |     // Verify contact is created
  66 |     await expect(page.locator('h1', { hasText: /Contacts/ })).toBeVisible();
  67 |   });
  68 | });
  69 | 
```