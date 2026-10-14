# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-list.spec.ts >> Company List Tests >> company list displays companies
- Location: tests/e2e/companies/company-list.spec.ts:17:3

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
          - heading "Companies" [level=1] [ref=f2e64]
          - link "Create Company" [ref=f2e65] [cursor=pointer]:
            - /url: /companies/new
        - generic [ref=f2e66]:
          - textbox "Search companies..." [ref=f2e67]
          - button "Quick Add" [ref=f2e69]
        - list [ref=f2e72]:
          - listitem [ref=f2e73]:
            - link "Alpha Group Retail 908 Pine 861, Salem 5917 www.alphagroup.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/3c5ec473-479f-45b0-8615-9514fea59c88
              - generic [ref=f2e75]:
                - text: Alpha Group
                - generic [ref=f2e76]: Retail
                - generic [ref=f2e77]: 908 Pine 861, Salem 5917
                - generic [ref=f2e78]: www.alphagroup.com
          - listitem [ref=f2e79]:
            - link "Digital Labs Finance 367 First 639, Portland 8053 www.digitallabs.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/dded890a-c08a-4e54-ac10-138c99cff6f2
              - generic [ref=f2e81]:
                - text: Digital Labs
                - generic [ref=f2e82]: Finance
                - generic [ref=f2e83]: 367 First 639, Portland 8053
                - generic [ref=f2e84]: www.digitallabs.com
          - listitem [ref=f2e85]:
            - link "Tech Group Consulting 676 Pine 631, Springfield 2290 www.techgroup.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/bbb81813-b3ea-4e2d-b961-0f001946010b
              - generic [ref=f2e87]:
                - text: Tech Group
                - generic [ref=f2e88]: Consulting
                - generic [ref=f2e89]: 676 Pine 631, Springfield 2290
                - generic [ref=f2e90]: www.techgroup.com
          - listitem [ref=f2e91]:
            - link "Rapid Group Consulting 352 Broadway 639, Madison 1534 www.rapidgroup.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/312c28f3-09f7-4462-93ad-be6b64b82561
              - generic [ref=f2e93]:
                - text: Rapid Group
                - generic [ref=f2e94]: Consulting
                - generic [ref=f2e95]: 352 Broadway 639, Madison 1534
                - generic [ref=f2e96]: www.rapidgroup.com
          - listitem [ref=f2e97]:
            - link "Alpha Labs Telecommunications 402 Oak 732, Portland 7687 www.alphalabs.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/1f7c9311-4ca7-448e-a270-a454b2882ff0
              - generic [ref=f2e99]:
                - text: Alpha Labs
                - generic [ref=f2e100]: Telecommunications
                - generic [ref=f2e101]: 402 Oak 732, Portland 7687
                - generic [ref=f2e102]: www.alphalabs.com
          - listitem [ref=f2e103]:
            - link "Global Ventures Media 983 Oak 236, Portland 1505 www.globalventures.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/6c51a447-c094-493a-96f1-53122e9d7914
              - generic [ref=f2e105]:
                - text: Global Ventures
                - generic [ref=f2e106]: Media
                - generic [ref=f2e107]: 983 Oak 236, Portland 1505
                - generic [ref=f2e108]: www.globalventures.com
          - listitem [ref=f2e109]:
            - link "Alpha Group Manufacturing 938 Broadway 192, Springfield 6481 www.alphagroup.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/aa358907-0aae-411c-854c-da62525305a2
              - generic [ref=f2e111]:
                - text: Alpha Group
                - generic [ref=f2e112]: Manufacturing
                - generic [ref=f2e113]: 938 Broadway 192, Springfield 6481
                - generic [ref=f2e114]: www.alphagroup.com
          - listitem [ref=f2e115]:
            - link "Alpha Group Telecommunications 100 Pine 969, Springfield 5201 www.alphagroup.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/6d6ceb60-7371-44d2-9a07-232606840393
              - generic [ref=f2e117]:
                - text: Alpha Group
                - generic [ref=f2e118]: Telecommunications
                - generic [ref=f2e119]: 100 Pine 969, Springfield 5201
                - generic [ref=f2e120]: www.alphagroup.com
          - listitem [ref=f2e121]:
            - link "Prime Group Finance 448 Broadway 259, Salem 1169 www.primegroup.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/83c9c84c-97a8-4a00-9463-367a87841b27
              - generic [ref=f2e123]:
                - text: Prime Group
                - generic [ref=f2e124]: Finance
                - generic [ref=f2e125]: 448 Broadway 259, Salem 1169
                - generic [ref=f2e126]: www.primegroup.com
          - listitem [ref=f2e127]:
            - link "Smart Labs Telecommunications 49 Oak 514, Springfield 9542 www.smartlabs.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/f486773b-29af-436a-a736-d2e8a22c9a01
              - generic [ref=f2e129]:
                - text: Smart Labs
                - generic [ref=f2e130]: Telecommunications
                - generic [ref=f2e131]: 49 Oak 514, Springfield 9542
                - generic [ref=f2e132]: www.smartlabs.com
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login, setupTestEnvironment } from '../fixtures/setup';
  3  | 
  4  | test.describe('Company List Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('company list view loads correctly', async ({ page }) => {
  10 |     await login(page);
  11 |     await page.goto('/companies');
  12 | 
  13 |     // Verify page title
  14 |     await expect(page.locator('h1', { hasText: /Companies/ })).toBeVisible();
  15 |   });
  16 | 
  17 |   test('company list displays companies', async ({ page }) => {
  18 |     await login(page);
  19 |     await page.goto('/companies');
  20 | 
  21 |     // Verify company cards are displayed
  22 |     const companyCards = page.locator('a[class*="flex items-center gap-4"], [class*="divide-y"]');
> 23 |     await expect(companyCards).toHaveCountGreaterThan(0);
     |                                ^ TypeError: expect(...).toHaveCountGreaterThan is not a function
  24 |   });
  25 | 
  26 |   test('company list search filters companies', async ({ page }) => {
  27 |     await login(page);
  28 |     await page.goto('/companies');
  29 | 
  30 |     // Use search input
  31 |     const searchInput = page.locator('input[type="text"], input[placeholder="Search companies..."]');
  32 |     await searchInput.fill('Test');
  33 |     const companyCards = page.locator('a[class*="flex items-center gap-4"]');
  34 |     await expect(companyCards).toBeVisible();
  35 |   });
  36 | 
  37 |   test('company card is clickable', async ({ page }) => {
  38 |     await login(page);
  39 |     await page.goto('/companies');
  40 | 
  41 |     // Click on first company
  42 |     const companyCard = page.locator('a[class*="flex items-center gap-4"]:first');
  43 |     await companyCard.click();
  44 | 
  45 |     // Verify navigation to company detail
  46 |     await expect(page.locator('h1', { hasText: /Company|Task Details/ })).toBeVisible();
  47 |   });
  48 | 
  49 |   test('company list shows no companies message when empty', async ({ page }) => {
  50 |     await login(page);
  51 |     await page.goto('/companies');
  52 | 
  53 |     // Verify company list renders
  54 |     await expect(page.locator('h1', { hasText: /Companies/ })).toBeVisible();
  55 |   });
  56 | 
  57 |   test('quick add company form works', async ({ page }) => {
  58 |     await login(page);
  59 |     await page.goto('/companies');
  60 | 
  61 |     // Click quick add button
  62 |     const quickAddBtn = page.locator('button', { hasText: /Quick Add/ });
  63 |     await quickAddBtn.click();
  64 | 
  65 |     // Verify company is created
  66 |     await expect(page.locator('h1', { hasText: /Companies/ })).toBeVisible();
  67 |   });
  68 | });
  69 | 
```