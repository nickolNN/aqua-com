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
            - 'link "Margaret Myers margaret.myers@example.com +1-454-486-8624 Company: c3a6b7f8-f258-43f6-8863-c93d4702bfbf" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/5632b868-bc4d-4350-96cb-d075728d963e
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Margaret Myers
                - generic [ref=f2e77]: margaret.myers@example.com
                - generic [ref=f2e78]: +1-454-486-8624
                - generic [ref=f2e79]: "Company: c3a6b7f8-f258-43f6-8863-c93d4702bfbf"
          - listitem [ref=f2e80]:
            - link "Douglas Perez douglas.perez@example.com +1-545-453-9730" [ref=f2e81] [cursor=pointer]:
              - /url: /contacts/9fa724b4-6ac5-46d5-a97e-00de952146a9
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: Douglas Perez
                - generic [ref=f2e84]: douglas.perez@example.com
                - generic [ref=f2e85]: +1-545-453-9730
          - listitem [ref=f2e86]:
            - 'link "David Harvey david.harvey@example.com +1-819-772-1909 Company: be1e5cd1-b46b-43b5-84cb-b350825cbc76" [ref=f2e87] [cursor=pointer]':
              - /url: /contacts/44ddc233-6ec6-4f3e-9760-159ce18ac5e8
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: David Harvey
                - generic [ref=f2e90]: david.harvey@example.com
                - generic [ref=f2e91]: +1-819-772-1909
                - generic [ref=f2e92]: "Company: be1e5cd1-b46b-43b5-84cb-b350825cbc76"
          - listitem [ref=f2e93]:
            - link "Barbara Hugh barbara.hugh@example.com +1-351-264-7950" [ref=f2e94] [cursor=pointer]:
              - /url: /contacts/32fafb1b-704a-4db4-b847-1a45f25b7310
              - generic [ref=f2e95]:
                - generic [ref=f2e96]: Barbara Hugh
                - generic [ref=f2e97]: barbara.hugh@example.com
                - generic [ref=f2e98]: +1-351-264-7950
          - listitem [ref=f2e99]:
            - 'link "Richard Perez richard.perez@example.com +1-577-537-7787 Company: 53a959ca-3626-4bd1-a703-87487926c481" [ref=f2e100] [cursor=pointer]':
              - /url: /contacts/89fcbea0-0a0a-4362-b4a0-fff4815c2ce9
              - generic [ref=f2e101]:
                - generic [ref=f2e102]: Richard Perez
                - generic [ref=f2e103]: richard.perez@example.com
                - generic [ref=f2e104]: +1-577-537-7787
                - generic [ref=f2e105]: "Company: 53a959ca-3626-4bd1-a703-87487926c481"
          - listitem [ref=f2e106]:
            - link "Rebecca Webb rebecca.webb@example.com +1-764-321-6028" [ref=f2e107] [cursor=pointer]:
              - /url: /contacts/00ec8719-6d08-4e7e-9c74-4da3195116b9
              - generic [ref=f2e108]:
                - generic [ref=f2e109]: Rebecca Webb
                - generic [ref=f2e110]: rebecca.webb@example.com
                - generic [ref=f2e111]: +1-764-321-6028
          - listitem [ref=f2e112]:
            - 'link "Melissa Kelly melissa.kelly@example.com +1-956-454-6620 Company: 96a2d30f-0557-4b53-8e5e-95faaf5f2ffc" [ref=f2e113] [cursor=pointer]':
              - /url: /contacts/32a62908-c2d5-4a9f-84df-5d6484465c7d
              - generic [ref=f2e114]:
                - generic [ref=f2e115]: Melissa Kelly
                - generic [ref=f2e116]: melissa.kelly@example.com
                - generic [ref=f2e117]: +1-956-454-6620
                - generic [ref=f2e118]: "Company: 96a2d30f-0557-4b53-8e5e-95faaf5f2ffc"
          - listitem [ref=f2e119]:
            - link "Peter Hunter peter.hunter@example.com +1-832-803-1076" [ref=f2e120] [cursor=pointer]:
              - /url: /contacts/929c8ed4-3016-492e-89a5-1f09c12db27e
              - generic [ref=f2e121]:
                - generic [ref=f2e122]: Peter Hunter
                - generic [ref=f2e123]: peter.hunter@example.com
                - generic [ref=f2e124]: +1-832-803-1076
          - listitem [ref=f2e125]:
            - 'link "Jeffrey King jeffrey.king@example.com +1-859-210-9172 Company: 9cfc9278-eacb-412d-a529-e4c987d72ac9" [ref=f2e126] [cursor=pointer]':
              - /url: /contacts/3db74a65-dc37-4365-8679-f0bc27edf3ea
              - generic [ref=f2e127]:
                - generic [ref=f2e128]: Jeffrey King
                - generic [ref=f2e129]: jeffrey.king@example.com
                - generic [ref=f2e130]: +1-859-210-9172
                - generic [ref=f2e131]: "Company: 9cfc9278-eacb-412d-a529-e4c987d72ac9"
          - listitem [ref=f2e132]:
            - link "Susan Foster susan.foster@example.com +1-629-817-6266" [ref=f2e133] [cursor=pointer]:
              - /url: /contacts/40365487-b55b-4d8f-8917-783c23b29ae9
              - generic [ref=f2e134]:
                - generic [ref=f2e135]: Susan Foster
                - generic [ref=f2e136]: susan.foster@example.com
                - generic [ref=f2e137]: +1-629-817-6266
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