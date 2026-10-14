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
            - link "Alpha Solutions Real Estate 557 Elm 39, Madison 1610 www.alphasolutions.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/a6b77bf1-db5c-402b-b62c-3675906bee76
              - generic [ref=f2e75]:
                - text: Alpha Solutions
                - generic [ref=f2e76]: Real Estate
                - generic [ref=f2e77]: 557 Elm 39, Madison 1610
                - generic [ref=f2e78]: www.alphasolutions.com
          - listitem [ref=f2e79]:
            - link "Rapid Holdings Technology 855 First 266, Springfield 5191 www.rapidholdings.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/7dcc11ab-2fc2-42c2-9da4-19905accb3d3
              - generic [ref=f2e81]:
                - text: Rapid Holdings
                - generic [ref=f2e82]: Technology
                - generic [ref=f2e83]: 855 First 266, Springfield 5191
                - generic [ref=f2e84]: www.rapidholdings.com
          - listitem [ref=f2e85]:
            - link "Next Labs Healthcare 956 Main 462, Madison 1160 www.nextlabs.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/e97d5040-80cd-484b-973b-bcf18c71b781
              - generic [ref=f2e87]:
                - text: Next Labs
                - generic [ref=f2e88]: Healthcare
                - generic [ref=f2e89]: 956 Main 462, Madison 1160
                - generic [ref=f2e90]: www.nextlabs.com
          - listitem [ref=f2e91]:
            - link "Tech Enterprises Technology 534 Market 48, Salem 6044 www.techenterprises.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/f48ec020-2aff-4f5b-8af1-31a80c2fd48e
              - generic [ref=f2e93]:
                - text: Tech Enterprises
                - generic [ref=f2e94]: Technology
                - generic [ref=f2e95]: 534 Market 48, Salem 6044
                - generic [ref=f2e96]: www.techenterprises.com
          - listitem [ref=f2e97]:
            - link "Prime Group Real Estate 32 Broadway 872, Salem 6065 www.primegroup.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/2934c18a-4715-4814-bc7b-5b5d177d9ef2
              - generic [ref=f2e99]:
                - text: Prime Group
                - generic [ref=f2e100]: Real Estate
                - generic [ref=f2e101]: 32 Broadway 872, Salem 6065
                - generic [ref=f2e102]: www.primegroup.com
          - listitem [ref=f2e103]:
            - link "Prime Holdings Finance 84 Pine 471, Madison 4216 www.primeholdings.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/f2c24e5d-256f-40af-85bc-eb374777444e
              - generic [ref=f2e105]:
                - text: Prime Holdings
                - generic [ref=f2e106]: Finance
                - generic [ref=f2e107]: 84 Pine 471, Madison 4216
                - generic [ref=f2e108]: www.primeholdings.com
          - listitem [ref=f2e109]:
            - link "Smart Partners Media 926 First 439, Madison 9324 www.smartpartners.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/9a6eeed5-5fb2-4e2a-8bea-e0266e81519a
              - generic [ref=f2e111]:
                - text: Smart Partners
                - generic [ref=f2e112]: Media
                - generic [ref=f2e113]: 926 First 439, Madison 9324
                - generic [ref=f2e114]: www.smartpartners.com
          - listitem [ref=f2e115]:
            - link "Digital Enterprises Real Estate 485 Oak 93, Salem 1586 www.digitalenterprises.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/59fcea8e-5f18-40c4-9062-9efd6bf1ea23
              - generic [ref=f2e117]:
                - text: Digital Enterprises
                - generic [ref=f2e118]: Real Estate
                - generic [ref=f2e119]: 485 Oak 93, Salem 1586
                - generic [ref=f2e120]: www.digitalenterprises.com
          - listitem [ref=f2e121]:
            - link "Digital Labs Consulting 659 Broadway 859, Arlington 9023 www.digitallabs.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/b55e40e3-f3b5-4508-b1d3-4314f343119d
              - generic [ref=f2e123]:
                - text: Digital Labs
                - generic [ref=f2e124]: Consulting
                - generic [ref=f2e125]: 659 Broadway 859, Arlington 9023
                - generic [ref=f2e126]: www.digitallabs.com
          - listitem [ref=f2e127]:
            - link "Alpha Ventures Consulting 575 Pine 160, Madison 9940 www.alphaventures.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/3fdac09c-0d35-42b9-8215-c79eac0af4fd
              - generic [ref=f2e129]:
                - text: Alpha Ventures
                - generic [ref=f2e130]: Consulting
                - generic [ref=f2e131]: 575 Pine 160, Madison 9940
                - generic [ref=f2e132]: www.alphaventures.com
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