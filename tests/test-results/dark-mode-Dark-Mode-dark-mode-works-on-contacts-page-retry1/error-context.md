# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dark-mode.spec.ts >> Dark Mode >> dark mode works on contacts page
- Location: tests/e2e/dark-mode.spec.ts:48:3

# Error details

```
TimeoutError: locator.click: Timeout 200ms exceeded.
Call log:
  - waiting for locator('button[aria-label*="dark mode"]')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - heading "Aqua CRM" [level=1] [ref=e6]
    - paragraph [ref=e7]: Sign in to your account
  - generic [ref=e9]:
    - generic [ref=e10]:
      - text: Email
      - textbox "Email" [ref=e11]:
        - /placeholder: Enter your email
    - generic [ref=e12]:
      - text: Password
      - textbox "Password" [ref=e13]:
        - /placeholder: Enter your password
    - link "Forgot password?" [ref=e15] [cursor=pointer]:
      - /url: /password-reset
    - button "Sign in" [ref=e16]
    - paragraph [ref=e17]:
      - text: Don't have an account?
      - link "Register" [ref=e18] [cursor=pointer]:
        - /url: /register
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Dark Mode', () => {
  4   |   test('dark mode toggle works', async ({ page }) => {
  5   |     await page.goto('/');
  6   |     
  7   |     // Verify initial light mode
  8   |     const initialTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  9   |     expect(initialTheme).toBe(false);
  10  |     
  11  |     // Click theme toggle button (resilient selector with partial match)
  12  |     await page.locator('button[aria-label*="dark mode"]').click();
  13  |     
  14  |     // Verify dark mode is applied
  15  |     const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  16  |     expect(darkTheme).toBe(true);
  17  |     
  18  |     // Verify theme persists in localStorage
  19  |     const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
  20  |     expect(storedTheme).toBe('dark');
  21  |   });
  22  | 
  23  |   test('dark mode persists on reload', async ({ page }) => {
  24  |     await page.goto('/');
  25  |     
  26  |     // Set dark mode
  27  |     await page.locator('button[aria-label*="dark mode"]').click();
  28  |     
  29  |     // Reload page
  30  |     await page.reload();
  31  |     
  32  |     // Verify dark mode is still applied
  33  |     const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  34  |     expect(darkTheme).toBe(true);
  35  |   });
  36  | 
  37  |   test('dark mode works on login page', async ({ page }) => {
  38  |     await page.goto('/login');
  39  |     
  40  |     // Toggle dark mode
  41  |     await page.locator('button[aria-label*="dark mode"]').click();
  42  |     
  43  |     // Verify dark mode is applied
  44  |     const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  45  |     expect(darkTheme).toBe(true);
  46  |   });
  47  | 
  48  |   test('dark mode works on contacts page', async ({ page }) => {
  49  |     await page.goto('/contacts');
  50  |     
  51  |     // Toggle dark mode
> 52  |     await page.locator('button[aria-label*="dark mode"]').click();
      |                                                           ^ TimeoutError: locator.click: Timeout 200ms exceeded.
  53  |     
  54  |     // Verify dark mode is applied
  55  |     const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  56  |     expect(darkTheme).toBe(true);
  57  |   });
  58  | 
  59  |   test('dark mode works on companies page', async ({ page }) => {
  60  |     await page.goto('/companies');
  61  |     
  62  |     // Toggle dark mode
  63  |     await page.locator('button[aria-label*="dark mode"]').click();
  64  |     
  65  |     // Verify dark mode is applied
  66  |     const darkTheme = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  67  |     expect(darkTheme).toBe(true);
  68  |   });
  69  | });
  70  | 
  71  | test.describe('All Views', () => {
  72  |   test('login view loads correctly', async ({ page }) => {
  73  |     await page.goto('/login');
  74  |     await expect(page.locator('h1')).toContainText('Login');
  75  |   });
  76  | 
  77  |   test('register view loads correctly', async ({ page }) => {
  78  |     await page.goto('/register');
  79  |     await expect(page.locator('h1')).toContainText('Register');
  80  |   });
  81  | 
  82  |   test('dashboard view loads correctly', async ({ page }) => {
  83  |     await page.goto('/');
  84  |     await expect(page.locator('h1')).toContainText('Dashboard');
  85  |   });
  86  | 
  87  |   test('companies view loads correctly', async ({ page }) => {
  88  |     await page.goto('/companies');
  89  |     await expect(page.locator('h1')).toContainText('Companies');
  90  |   });
  91  | 
  92  |   test('contacts view loads correctly', async ({ page }) => {
  93  |     await page.goto('/contacts');
  94  |     await expect(page.locator('h1')).toContainText('Contacts');
  95  |   });
  96  | 
  97  |   test('tasks view loads correctly', async ({ page }) => {
  98  |     await page.goto('/tasks');
  99  |     await expect(page.locator('h1')).toContainText('Tasks');
  100 |   });
  101 | 
  102 |   test('activities view loads correctly', async ({ page }) => {
  103 |     await page.goto('/activities');
  104 |     await expect(page.locator('h1')).toContainText('Activities');
  105 |   });
  106 | 
  107 |   test('reports view loads correctly', async ({ page }) => {
  108 |     await page.goto('/reports');
  109 |     await expect(page.locator('h1')).toContainText('Reports');
  110 |   });
  111 | 
  112 |   test('search view loads correctly', async ({ page }) => {
  113 |     await page.goto('/search');
  114 |     await expect(page.locator('h1')).toContainText('Search');
  115 |   });
  116 | });
  117 | 
```