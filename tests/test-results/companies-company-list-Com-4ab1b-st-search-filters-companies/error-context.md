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
            - link "Digital Group Retail 706 First 580, Springfield 1256 www.digitalgroup.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/d95a7c29-7ce8-4488-8c59-068f2329e5cb
              - generic [ref=f2e75]:
                - text: Digital Group
                - generic [ref=f2e76]: Retail
                - generic [ref=f2e77]: 706 First 580, Springfield 1256
                - generic [ref=f2e78]: www.digitalgroup.com
          - listitem [ref=f2e79]:
            - link "Global Labs Education 852 Market 401, Portland 9784 www.globallabs.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/41188367-02ab-44e4-9a67-50dfa33b1f22
              - generic [ref=f2e81]:
                - text: Global Labs
                - generic [ref=f2e82]: Education
                - generic [ref=f2e83]: 852 Market 401, Portland 9784
                - generic [ref=f2e84]: www.globallabs.com
          - listitem [ref=f2e85]:
            - link "Digital Systems Technology 619 First 553, Springfield 4480 www.digitalsystems.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/ddaaca8e-0f81-482f-8aec-b19ef75488d7
              - generic [ref=f2e87]:
                - text: Digital Systems
                - generic [ref=f2e88]: Technology
                - generic [ref=f2e89]: 619 First 553, Springfield 4480
                - generic [ref=f2e90]: www.digitalsystems.com
          - listitem [ref=f2e91]:
            - link "Rapid Systems Media 767 Market 386, Salem 8062 www.rapidsystems.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/7aeb280b-5499-44a4-a578-72ce25fb0434
              - generic [ref=f2e93]:
                - text: Rapid Systems
                - generic [ref=f2e94]: Media
                - generic [ref=f2e95]: 767 Market 386, Salem 8062
                - generic [ref=f2e96]: www.rapidsystems.com
          - listitem [ref=f2e97]:
            - link "Tech Group Consulting 691 Oak 623, Springfield 5735 www.techgroup.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/3cfd7674-f36e-494d-89dd-9dd3c5776606
              - generic [ref=f2e99]:
                - text: Tech Group
                - generic [ref=f2e100]: Consulting
                - generic [ref=f2e101]: 691 Oak 623, Springfield 5735
                - generic [ref=f2e102]: www.techgroup.com
          - listitem [ref=f2e103]:
            - link "Next Group Real Estate 2 Elm 304, Madison 7397 www.nextgroup.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/18f7f567-45d2-4c08-bcf7-4ad33819f0a5
              - generic [ref=f2e105]:
                - text: Next Group
                - generic [ref=f2e106]: Real Estate
                - generic [ref=f2e107]: 2 Elm 304, Madison 7397
                - generic [ref=f2e108]: www.nextgroup.com
          - listitem [ref=f2e109]:
            - link "Tech Holdings Real Estate 367 Main 828, Arlington 3622 www.techholdings.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/cd899b80-329f-49ff-8c0e-aae32b199e94
              - generic [ref=f2e111]:
                - text: Tech Holdings
                - generic [ref=f2e112]: Real Estate
                - generic [ref=f2e113]: 367 Main 828, Arlington 3622
                - generic [ref=f2e114]: www.techholdings.com
          - listitem [ref=f2e115]:
            - link "Alpha Systems Education 303 Pine 535, Arlington 4016 www.alphasystems.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/2f8ef8b2-7883-4613-92b2-1306b41e9921
              - generic [ref=f2e117]:
                - text: Alpha Systems
                - generic [ref=f2e118]: Education
                - generic [ref=f2e119]: 303 Pine 535, Arlington 4016
                - generic [ref=f2e120]: www.alphasystems.com
          - listitem [ref=f2e121]:
            - link "Next Labs Healthcare 479 Oak 268, Madison 6158 www.nextlabs.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/2fecd41a-350e-4448-b3b9-7f3d126eea6a
              - generic [ref=f2e123]:
                - text: Next Labs
                - generic [ref=f2e124]: Healthcare
                - generic [ref=f2e125]: 479 Oak 268, Madison 6158
                - generic [ref=f2e126]: www.nextlabs.com
          - listitem [ref=f2e127]:
            - link "Alpha Ventures Real Estate 476 Main 755, Springfield 4420 www.alphaventures.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/982695a9-6907-413b-a92e-312a3900ee8f
              - generic [ref=f2e129]:
                - text: Alpha Ventures
                - generic [ref=f2e130]: Real Estate
                - generic [ref=f2e131]: 476 Main 755, Springfield 4420
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