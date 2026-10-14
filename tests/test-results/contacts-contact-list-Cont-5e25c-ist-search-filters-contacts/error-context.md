# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-list.spec.ts >> Contact List Tests >> contact list search filters contacts
- Location: tests/e2e/contacts/contact-list.spec.ts:26:3

# Error details

```
Error: locator.fill: Error: strict mode violation: locator('input[type="text"], input[placeholder="Search contacts..."]') resolved to 2 elements:
    1) <input value="" type="text" aria-label="Global search" placeholder="Search contacts, tasks, companies..." class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"/> aka getByRole('textbox', { name: 'Global search' })
    2) <input value="" type="text" placeholder="Search contacts..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"/> aka getByRole('textbox', { name: 'Search contacts...' })

Call log:
  - waiting for locator('input[type="text"], input[placeholder="Search contacts..."]')

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
            - 'link "Amy King amy.king@example.com +1-849-848-2689 Company: b5983e0d-e473-460a-8e90-cd25c6695775" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/58216228-bd65-4f50-8ea1-503691aa535c
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Amy King
                - generic [ref=f2e77]: amy.king@example.com
                - generic [ref=f2e78]: +1-849-848-2689
                - generic [ref=f2e79]: "Company: b5983e0d-e473-460a-8e90-cd25c6695775"
          - listitem [ref=f2e80]:
            - link "Donald Myers donald.myers@example.com +1-553-610-8013" [ref=f2e81] [cursor=pointer]:
              - /url: /contacts/a681b23a-1fc4-43d2-9229-67f4d82a7e2a
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: Donald Myers
                - generic [ref=f2e84]: donald.myers@example.com
                - generic [ref=f2e85]: +1-553-610-8013
          - listitem [ref=f2e86]:
            - 'link "Rebecca Cole rebecca.cole@example.com +1-380-284-9726 Company: 2a6c0ea8-98ac-4d20-8930-82619c2d6a01" [ref=f2e87] [cursor=pointer]':
              - /url: /contacts/0a873d76-f02e-4dd0-bd5e-041e853e4ae5
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: Rebecca Cole
                - generic [ref=f2e90]: rebecca.cole@example.com
                - generic [ref=f2e91]: +1-380-284-9726
                - generic [ref=f2e92]: "Company: 2a6c0ea8-98ac-4d20-8930-82619c2d6a01"
          - listitem [ref=f2e93]:
            - link "Jonathan Hart jonathan.hart@example.com +1-779-329-8515" [ref=f2e94] [cursor=pointer]:
              - /url: /contacts/9debc73b-6c53-4175-ba56-1f68bc5e7180
              - generic [ref=f2e95]:
                - generic [ref=f2e96]: Jonathan Hart
                - generic [ref=f2e97]: jonathan.hart@example.com
                - generic [ref=f2e98]: +1-779-329-8515
          - listitem [ref=f2e99]:
            - 'link "Mary Hart mary.hart@example.com +1-208-998-2055 Company: 3c9d15df-02ea-4a5e-8c55-b20f8ee47d06" [ref=f2e100] [cursor=pointer]':
              - /url: /contacts/8c5e54fa-fb4b-4b5a-8063-16bc7f5a6a65
              - generic [ref=f2e101]:
                - generic [ref=f2e102]: Mary Hart
                - generic [ref=f2e103]: mary.hart@example.com
                - generic [ref=f2e104]: +1-208-998-2055
                - generic [ref=f2e105]: "Company: 3c9d15df-02ea-4a5e-8c55-b20f8ee47d06"
          - listitem [ref=f2e106]:
            - link "Ryan Garcia ryan.garcia@example.com +1-815-260-1651" [ref=f2e107] [cursor=pointer]:
              - /url: /contacts/3142b13c-b254-44cc-b6cb-53a65e75a07d
              - generic [ref=f2e108]:
                - generic [ref=f2e109]: Ryan Garcia
                - generic [ref=f2e110]: ryan.garcia@example.com
                - generic [ref=f2e111]: +1-815-260-1651
          - listitem [ref=f2e112]:
            - 'link "Emily Harvey emily.harvey@example.com +1-417-538-8509 Company: d68db253-44f3-4bd3-9409-c0f28404ae1a" [ref=f2e113] [cursor=pointer]':
              - /url: /contacts/85be1f40-2276-4337-b8fe-4f3d58aa9afe
              - generic [ref=f2e114]:
                - generic [ref=f2e115]: Emily Harvey
                - generic [ref=f2e116]: emily.harvey@example.com
                - generic [ref=f2e117]: +1-417-538-8509
                - generic [ref=f2e118]: "Company: d68db253-44f3-4bd3-9409-c0f28404ae1a"
          - listitem [ref=f2e119]:
            - 'link "Samantha Thomas samantha.thomas@example.com +1-755-252-3573 Company: 0d612536-9dd3-428c-8887-92ebb64f2048" [ref=f2e120] [cursor=pointer]':
              - /url: /contacts/4c295eb3-55be-44d4-8b96-4a8532b6f980
              - generic [ref=f2e121]:
                - generic [ref=f2e122]: Samantha Thomas
                - generic [ref=f2e123]: samantha.thomas@example.com
                - generic [ref=f2e124]: +1-755-252-3573
                - generic [ref=f2e125]: "Company: 0d612536-9dd3-428c-8887-92ebb64f2048"
          - listitem [ref=f2e126]:
            - 'link "Betty Harvey betty.harvey@example.com +1-873-695-4754 Company: a443edc2-354d-41ae-80fc-1604337b3592" [ref=f2e127] [cursor=pointer]':
              - /url: /contacts/b8d65fdb-1c8b-4575-9206-29288b9d3e54
              - generic [ref=f2e128]:
                - generic [ref=f2e129]: Betty Harvey
                - generic [ref=f2e130]: betty.harvey@example.com
                - generic [ref=f2e131]: +1-873-695-4754
                - generic [ref=f2e132]: "Company: a443edc2-354d-41ae-80fc-1604337b3592"
          - listitem [ref=f2e133]:
            - link "Larry Perez larry.perez@example.com +1-928-741-5826" [ref=f2e134] [cursor=pointer]:
              - /url: /contacts/c9c3bdc5-7606-4493-84fe-1eca5b9b4115
              - generic [ref=f2e135]:
                - generic [ref=f2e136]: Larry Perez
                - generic [ref=f2e137]: larry.perez@example.com
                - generic [ref=f2e138]: +1-928-741-5826
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
  23 |     await expect(contactCards).toHaveCountGreaterThan(0);
  24 |   });
  25 | 
  26 |   test('contact list search filters contacts', async ({ page }) => {
  27 |     await login(page);
  28 |     await page.goto('/contacts');
  29 | 
  30 |     // Use search input
  31 |     const searchInput = page.locator('input[type="text"], input[placeholder="Search contacts..."]');
> 32 |     await searchInput.fill('Test');
     |                       ^ Error: locator.fill: Error: strict mode violation: locator('input[type="text"], input[placeholder="Search contacts..."]') resolved to 2 elements:
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