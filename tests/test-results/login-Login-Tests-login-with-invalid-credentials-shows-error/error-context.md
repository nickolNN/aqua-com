# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login Tests >> login with invalid credentials shows error
- Location: tests/e2e/login.spec.ts:21:3

# Error details

```
TimeoutError: locator.fill: Timeout 200ms exceeded.
Call log:
  - waiting for locator('#email')

```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - complementary [ref=f1e4]:
    - generic [ref=f1e5]:
      - generic [ref=f1e6]: Aqua CRM
      - navigation [ref=f1e9]:
        - link "Dashboard" [ref=f1e10] [cursor=pointer]:
          - /url: /
        - link "Contacts" [ref=f1e18] [cursor=pointer]:
          - /url: /contacts
        - link "Companies" [ref=f1e24] [cursor=pointer]:
          - /url: /companies
        - link "Tasks" [ref=f1e31] [cursor=pointer]:
          - /url: /tasks
        - link "Activities" [ref=f1e37] [cursor=pointer]:
          - /url: /activities
        - button "Switch to dark mode" [ref=f1e42]
        - button "Log out" [ref=f1e51]
  - generic [ref=f1e57]:
    - textbox "Global search" [ref=f1e60]:
      - /placeholder: Search contacts, tasks, companies...
    - main [ref=f1e61]:
      - generic [ref=f1e62]:
        - generic [ref=f1e63]:
          - heading "Dashboard" [level=1] [ref=f1e64]
          - paragraph [ref=f1e65]: Overview of your CRM activity and performance
        - generic [ref=f1e66]:
          - generic [ref=f1e67]:
            - paragraph [ref=f1e69]: Total Contacts
            - generic [ref=f1e70]:
              - paragraph [ref=f1e71]: "120"
              - paragraph [ref=f1e72]: ↑ 20 vs last month
          - generic [ref=f1e73]:
            - paragraph [ref=f1e75]: Open Tasks
            - generic [ref=f1e76]:
              - paragraph [ref=f1e77]: "8"
              - paragraph [ref=f1e78]: ↓ 0 vs last month
          - generic [ref=f1e79]:
            - paragraph [ref=f1e81]: Activities This Week
            - paragraph [ref=f1e83]: "35"
          - generic [ref=f1e84]:
            - paragraph [ref=f1e86]: Active Deals
            - generic [ref=f1e87]:
              - paragraph [ref=f1e88]: "12"
              - paragraph [ref=f1e89]: ↑ 5 vs last month
        - generic [ref=f1e90]:
          - generic [ref=f1e91]:
            - heading "Task Status Breakdown" [level=3] [ref=f1e92]
            - generic [ref=f1e93]:
              - generic [ref=f1e95]:
                - generic [ref=f1e96]: Cancelled
                - generic [ref=f1e97]: 17 (37.8%)
              - generic [ref=f1e101]:
                - generic [ref=f1e102]: Completed
                - generic [ref=f1e103]: 12 (26.7%)
              - generic [ref=f1e107]:
                - generic [ref=f1e108]: Open
                - generic [ref=f1e109]: 8 (17.8%)
              - generic [ref=f1e113]:
                - generic [ref=f1e114]: In Progress
                - generic [ref=f1e115]: 8 (17.8%)
          - generic [ref=f1e118]:
            - heading "Activity Type Breakdown" [level=3] [ref=f1e119]
            - generic [ref=f1e120]:
              - generic [ref=f1e122]:
                - generic [ref=f1e123]: Task
                - generic [ref=f1e124]: 8 (22.9%)
              - generic [ref=f1e128]:
                - generic [ref=f1e129]: Email
                - generic [ref=f1e130]: 7 (20.0%)
              - generic [ref=f1e134]:
                - generic [ref=f1e135]: Deal
                - generic [ref=f1e136]: 5 (14.3%)
              - generic [ref=f1e140]:
                - generic [ref=f1e141]: Note
                - generic [ref=f1e142]: 4 (11.4%)
              - generic [ref=f1e146]:
                - generic [ref=f1e147]: Other
                - generic [ref=f1e148]: 4 (11.4%)
        - generic [ref=f1e151]:
          - generic [ref=f1e152]:
            - heading "Task Priority Distribution" [level=3] [ref=f1e153]
            - generic [ref=f1e162]:
              - generic [ref=f1e163]:
                - generic [ref=f1e165]: High (18)
                - generic [ref=f1e166]: (40.0%)
              - generic [ref=f1e167]:
                - generic [ref=f1e169]: Medium (13)
                - generic [ref=f1e170]: (28.9%)
              - generic [ref=f1e171]:
                - generic [ref=f1e173]: Urgent (9)
                - generic [ref=f1e174]: (20.0%)
              - generic [ref=f1e175]:
                - generic [ref=f1e177]: Low (5)
                - generic [ref=f1e178]: (11.1%)
          - generic [ref=f1e179]:
            - heading "Pipeline Stages" [level=3] [ref=f1e180]
            - generic [ref=f1e190]:
              - generic [ref=f1e191]:
                - generic [ref=f1e193]: Closed (6)
                - generic [ref=f1e194]: (40.0%)
              - generic [ref=f1e195]:
                - generic [ref=f1e197]: Prospect (3)
                - generic [ref=f1e198]: (20.0%)
              - generic [ref=f1e199]:
                - generic [ref=f1e201]: Qualified (3)
                - generic [ref=f1e202]: (20.0%)
              - generic [ref=f1e203]:
                - generic [ref=f1e205]: Proposal (2)
                - generic [ref=f1e206]: (13.3%)
              - generic [ref=f1e207]:
                - generic [ref=f1e209]: Negotiation (1)
                - generic [ref=f1e210]: (6.7%)
        - generic [ref=f1e211]:
          - paragraph [ref=f1e213]: Recent Activity
          - generic [ref=f1e215]:
            - generic [ref=f1e216]:
              - generic [ref=f1e217]: 9/20/2026
              - generic [ref=f1e218]: Vendor meeting
              - generic [ref=f1e219]: call
            - generic [ref=f1e220]:
              - generic [ref=f1e221]: 9/18/2026
              - generic [ref=f1e222]: Project kickoff
              - generic [ref=f1e223]: other
            - generic [ref=f1e224]:
              - generic [ref=f1e225]: 9/15/2026
              - generic [ref=f1e226]: Client meeting
              - generic [ref=f1e227]: other
            - generic [ref=f1e228]:
              - generic [ref=f1e229]: 9/13/2026
              - generic [ref=f1e230]: Technical review
              - generic [ref=f1e231]: deal
            - generic [ref=f1e232]:
              - generic [ref=f1e233]: 7/25/2026
              - generic [ref=f1e234]: Status update
              - generic [ref=f1e235]: meeting
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login, setupTestEnvironment } from './fixtures/setup';
  3  | 
  4  | test.describe('Login Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('login with valid credentials', async ({ page }) => {
  10 |     await login(page);
  11 | 
  12 |     // Verify navigation to dashboard
  13 |     await expect(page).toHaveURL('/');
  14 |     await expect(page.locator('h1')).toBeVisible();
  15 | 
  16 |     // Verify token was stored in localStorage
  17 |     const token = await page.evaluate(() => localStorage.getItem('token'));
  18 |     expect(token).toBeTruthy();
  19 |   });
  20 | 
  21 |   test('login with invalid credentials shows error', async ({ page }) => {
  22 |     await login(page);
  23 | 
  24 |     // Fill in invalid credentials
> 25 |     await page.locator('#email').fill('invalid@example.com');
     |                                  ^ TimeoutError: locator.fill: Timeout 200ms exceeded.
  26 |     await page.locator('#password').fill('wrongpassword');
  27 | 
  28 |     // Submit login form
  29 |     await page.locator('button[type="submit"]').click();
  30 | 
  31 |     // Verify error message is displayed
  32 |     await expect(page.locator('div.rounded-md.border.border-destructive')).toBeVisible();
  33 |   });
  34 | 
  35 |   test('login form validation shows errors for empty fields', async ({ page }) => {
  36 |     await page.goto('/login');
  37 | 
  38 |     // Click submit without filling any fields
  39 |     await page.locator('button[type="submit"]').click();
  40 | 
  41 |     // Verify validation errors appear
  42 |     await expect(page.locator('p.text-xs.text-destructive', { hasText: 'Email is required' })).toBeVisible();
  43 |     await expect(page.locator('p.text-xs.text-destructive', { hasText: 'Password is required' })).toBeVisible();
  44 |   });
  45 | 
  46 |   test('login form validation shows error for invalid email format', async ({ page }) => {
  47 |     await page.goto('/login');
  48 | 
  49 |     // Fill invalid email
  50 |     await page.locator('#email').fill('invalid-email');
  51 |     await page.locator('#password').fill('password123');
  52 | 
  53 |     // Submit
  54 |     await page.locator('button[type="submit"]').click();
  55 | 
  56 |     // Verify error message
  57 |     await expect(page.locator('p.text-xs.text-destructive', { hasText: 'Invalid email format' })).toBeVisible();
  58 |   });
  59 | });
  60 | 
```