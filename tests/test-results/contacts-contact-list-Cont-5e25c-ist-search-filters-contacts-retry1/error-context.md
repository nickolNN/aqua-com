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
            - 'link "Jennifer Myers jennifer.myers@example.com +1-553-470-7612 Company: 3c2b7761-4299-4630-bfd7-b6be3dde2526" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/da9e6ee0-2212-4e9f-a90a-00e20889f73a
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Jennifer Myers
                - generic [ref=f2e77]: jennifer.myers@example.com
                - generic [ref=f2e78]: +1-553-470-7612
                - generic [ref=f2e79]: "Company: 3c2b7761-4299-4630-bfd7-b6be3dde2526"
          - listitem [ref=f2e80]:
            - 'link "Harold Thomas harold.thomas@example.com +1-857-216-1498 Company: 4ef9b0d0-9006-469f-8c30-47cae7d5bb0f" [ref=f2e81] [cursor=pointer]':
              - /url: /contacts/bd8a40b7-29f1-48dc-8a80-f7d34296ddc6
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: Harold Thomas
                - generic [ref=f2e84]: harold.thomas@example.com
                - generic [ref=f2e85]: +1-857-216-1498
                - generic [ref=f2e86]: "Company: 4ef9b0d0-9006-469f-8c30-47cae7d5bb0f"
          - listitem [ref=f2e87]:
            - link "Thomas Brown thomas.brown@example.com +1-992-814-3601" [ref=f2e88] [cursor=pointer]:
              - /url: /contacts/2dc216fc-54d4-4bfb-aa77-23c8bac5e5fb
              - generic [ref=f2e89]:
                - generic [ref=f2e90]: Thomas Brown
                - generic [ref=f2e91]: thomas.brown@example.com
                - generic [ref=f2e92]: +1-992-814-3601
          - listitem [ref=f2e93]:
            - 'link "Emily Patterson emily.patterson@example.com +1-727-489-4778 Company: 96488869-8a0d-4b69-88f3-27fc8512eb38" [ref=f2e94] [cursor=pointer]':
              - /url: /contacts/ab2be883-3187-4428-83f8-37c5e2d030ca
              - generic [ref=f2e95]:
                - generic [ref=f2e96]: Emily Patterson
                - generic [ref=f2e97]: emily.patterson@example.com
                - generic [ref=f2e98]: +1-727-489-4778
                - generic [ref=f2e99]: "Company: 96488869-8a0d-4b69-88f3-27fc8512eb38"
          - listitem [ref=f2e100]:
            - link "George Harrison george.harrison@example.com +1-801-296-3076" [ref=f2e101] [cursor=pointer]:
              - /url: /contacts/1c38c39a-d3ec-4884-a4aa-d26c6d5802f4
              - generic [ref=f2e102]:
                - generic [ref=f2e103]: George Harrison
                - generic [ref=f2e104]: george.harrison@example.com
                - generic [ref=f2e105]: +1-801-296-3076
          - listitem [ref=f2e106]:
            - link "Charles Rodriguez charles.rodriguez@example.com +1-454-628-9147" [ref=f2e107] [cursor=pointer]:
              - /url: /contacts/6f5422ca-84ae-4b17-961b-ee9797e695c5
              - generic [ref=f2e108]:
                - generic [ref=f2e109]: Charles Rodriguez
                - generic [ref=f2e110]: charles.rodriguez@example.com
                - generic [ref=f2e111]: +1-454-628-9147
          - listitem [ref=f2e112]:
            - 'link "William Cole william.cole@example.com +1-925-843-9922 Company: 9fbda85a-6aa6-445d-af2a-05bc3c7127e5" [ref=f2e113] [cursor=pointer]':
              - /url: /contacts/4dff4432-a908-4fd1-b575-dccd399719ce
              - generic [ref=f2e114]:
                - generic [ref=f2e115]: William Cole
                - generic [ref=f2e116]: william.cole@example.com
                - generic [ref=f2e117]: +1-925-843-9922
                - generic [ref=f2e118]: "Company: 9fbda85a-6aa6-445d-af2a-05bc3c7127e5"
          - listitem [ref=f2e119]:
            - link "Betty Cooper betty.cooper@example.com +1-652-487-9769" [ref=f2e120] [cursor=pointer]:
              - /url: /contacts/90fc9417-3f3b-4ceb-bdf1-69b1e643f8fd
              - generic [ref=f2e121]:
                - generic [ref=f2e122]: Betty Cooper
                - generic [ref=f2e123]: betty.cooper@example.com
                - generic [ref=f2e124]: +1-652-487-9769
          - listitem [ref=f2e125]:
            - 'link "Sarah Jackson sarah.jackson@example.com +1-902-561-6426 Company: 678c9f25-954c-4a1c-8713-0bfb3cf3cdfa" [ref=f2e126] [cursor=pointer]':
              - /url: /contacts/cb7f84cf-7901-4a68-831a-76918f95ab59
              - generic [ref=f2e127]:
                - generic [ref=f2e128]: Sarah Jackson
                - generic [ref=f2e129]: sarah.jackson@example.com
                - generic [ref=f2e130]: +1-902-561-6426
                - generic [ref=f2e131]: "Company: 678c9f25-954c-4a1c-8713-0bfb3cf3cdfa"
          - listitem [ref=f2e132]:
            - link "Samantha Kelly samantha.kelly@example.com +1-825-850-6036" [ref=f2e133] [cursor=pointer]:
              - /url: /contacts/4b6af637-9373-439f-b557-6e906f3d6493
              - generic [ref=f2e134]:
                - generic [ref=f2e135]: Samantha Kelly
                - generic [ref=f2e136]: samantha.kelly@example.com
                - generic [ref=f2e137]: +1-825-850-6036
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