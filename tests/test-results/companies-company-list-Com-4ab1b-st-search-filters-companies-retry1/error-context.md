# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-list.spec.ts >> Company List Tests >> company list search filters companies
- Location: tests/e2e/companies/company-list.spec.ts:26:3

# Error details

```
Error: locator.fill: Error: strict mode violation: locator('input[type="text"], input[placeholder="Search companies..."]') resolved to 2 elements:
    1) <input value="" type="text" aria-label="Global search" placeholder="Search contacts, tasks, companies..." class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"/> aka getByRole('textbox', { name: 'Global search' })
    2) <input value="" type="text" placeholder="Search companies..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"/> aka getByRole('textbox', { name: 'Search companies...' })

Call log:
  - waiting for locator('input[type="text"], input[placeholder="Search companies..."]')

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
            - link "Prime Systems Retail 678 Market 295, Arlington 5412 www.primesystems.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/250d8b8f-e2b5-4e9c-8402-f568d751b10e
              - generic [ref=f2e75]:
                - text: Prime Systems
                - generic [ref=f2e76]: Retail
                - generic [ref=f2e77]: 678 Market 295, Arlington 5412
                - generic [ref=f2e78]: www.primesystems.com
          - listitem [ref=f2e79]:
            - link "Rapid Group Healthcare 537 Pine 713, Salem 9772 www.rapidgroup.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/475fad1c-f416-4ef0-925d-5c7dcea1eaf0
              - generic [ref=f2e81]:
                - text: Rapid Group
                - generic [ref=f2e82]: Healthcare
                - generic [ref=f2e83]: 537 Pine 713, Salem 9772
                - generic [ref=f2e84]: www.rapidgroup.com
          - listitem [ref=f2e85]:
            - link "Rapid Labs Healthcare 118 First 235, Portland 5561 www.rapidlabs.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/53e13c37-6bf1-4a32-8498-2d68d2ad83d9
              - generic [ref=f2e87]:
                - text: Rapid Labs
                - generic [ref=f2e88]: Healthcare
                - generic [ref=f2e89]: 118 First 235, Portland 5561
                - generic [ref=f2e90]: www.rapidlabs.com
          - listitem [ref=f2e91]:
            - link "Prime Systems Healthcare 687 Oak 25, Portland 8504 www.primesystems.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/d0335320-35f2-462e-8cc2-6bb3ffc82b25
              - generic [ref=f2e93]:
                - text: Prime Systems
                - generic [ref=f2e94]: Healthcare
                - generic [ref=f2e95]: 687 Oak 25, Portland 8504
                - generic [ref=f2e96]: www.primesystems.com
          - listitem [ref=f2e97]:
            - link "Global Group Healthcare 971 First 660, Springfield 8839 www.globalgroup.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/08a959ef-731c-46bf-bdfc-08f1fc03f30b
              - generic [ref=f2e99]:
                - text: Global Group
                - generic [ref=f2e100]: Healthcare
                - generic [ref=f2e101]: 971 First 660, Springfield 8839
                - generic [ref=f2e102]: www.globalgroup.com
          - listitem [ref=f2e103]:
            - link "Global Ventures Real Estate 487 Elm 579, Arlington 6526 www.globalventures.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/874fb380-2e94-4e54-8e36-7e8ea5117e76
              - generic [ref=f2e105]:
                - text: Global Ventures
                - generic [ref=f2e106]: Real Estate
                - generic [ref=f2e107]: 487 Elm 579, Arlington 6526
                - generic [ref=f2e108]: www.globalventures.com
          - listitem [ref=f2e109]:
            - link "Next Partners Consulting 517 Pine 306, Springfield 9443 www.nextpartners.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/1593118e-c951-4401-9c22-4e4c671e50db
              - generic [ref=f2e111]:
                - text: Next Partners
                - generic [ref=f2e112]: Consulting
                - generic [ref=f2e113]: 517 Pine 306, Springfield 9443
                - generic [ref=f2e114]: www.nextpartners.com
          - listitem [ref=f2e115]:
            - link "Global Holdings Retail 980 Main 515, Arlington 3276 www.globalholdings.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/6d3a7662-a5b8-4a0e-963d-c25d79881a29
              - generic [ref=f2e117]:
                - text: Global Holdings
                - generic [ref=f2e118]: Retail
                - generic [ref=f2e119]: 980 Main 515, Arlington 3276
                - generic [ref=f2e120]: www.globalholdings.com
          - listitem [ref=f2e121]:
            - link "Prime Enterprises Telecommunications 583 Oak 820, Salem 7668 www.primeenterprises.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/03d656be-2189-4118-a796-8cbbdb2bdb24
              - generic [ref=f2e123]:
                - text: Prime Enterprises
                - generic [ref=f2e124]: Telecommunications
                - generic [ref=f2e125]: 583 Oak 820, Salem 7668
                - generic [ref=f2e126]: www.primeenterprises.com
          - listitem [ref=f2e127]:
            - link "Prime Holdings Healthcare 137 Oak 15, Madison 2864 www.primeholdings.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/5391ef3e-b3a2-4339-b77a-a8c1738a697e
              - generic [ref=f2e129]:
                - text: Prime Holdings
                - generic [ref=f2e130]: Healthcare
                - generic [ref=f2e131]: 137 Oak 15, Madison 2864
                - generic [ref=f2e132]: www.primeholdings.com
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
  23 |     await expect(companyCards).toHaveCountGreaterThan(0);
  24 |   });
  25 | 
  26 |   test('company list search filters companies', async ({ page }) => {
  27 |     await login(page);
  28 |     await page.goto('/companies');
  29 | 
  30 |     // Use search input
  31 |     const searchInput = page.locator('input[type="text"], input[placeholder="Search companies..."]');
> 32 |     await searchInput.fill('Test');
     |                       ^ Error: locator.fill: Error: strict mode violation: locator('input[type="text"], input[placeholder="Search companies..."]') resolved to 2 elements:
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