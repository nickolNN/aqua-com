# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth-protected-routes.spec.ts >> Protected Route Tests >> unauthenticated user redirects to login when accessing dashboard
- Location: src/frontend/tests/e2e/auth-protected-routes.spec.ts:9:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "Не удается получить доступ к сайту" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - text: Сайт
      - strong [ref=e9]: localhost
      - text: не позволяет установить соединение.
    - generic [ref=e10]:
      - paragraph [ref=e11]: "Попробуйте сделать следующее:"
      - list [ref=e12]:
        - listitem [ref=e13]: Проверьте подключение к интернету.
        - listitem [ref=e14]:
          - link "Проверьте настройки прокси-сервера и брандмауэра" [ref=e15] [cursor=pointer]:
            - /url: "#buttons"
          - text: .
    - generic [ref=e16]: ERR_CONNECTION_REFUSED
  - generic [ref=e17]:
    - button "Перезагрузить" [ref=e19] [cursor=pointer]
    - button "Сведения" [ref=e20] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { login, setupTestEnvironment } from './fixtures/setup';
  3  | 
  4  | test.describe('Protected Route Tests', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await setupTestEnvironment(page);
  7  |   });
  8  | 
  9  |   test('unauthenticated user redirects to login when accessing dashboard', async ({ page }) => {
  10 |     // Ensure no auth state
  11 |     await page.evaluate(() => {
  12 |       localStorage.clear();
  13 |     });
> 14 |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  15 | 
  16 |     // Verify redirect to login
  17 |     await expect(page).toHaveURL('/login');
  18 |   });
  19 | 
  20 |   test('unauthenticated user redirects to login when accessing contacts', async ({ page }) => {
  21 |     await page.evaluate(() => {
  22 |       localStorage.clear();
  23 |     });
  24 |     await page.goto('/contacts');
  25 | 
  26 |     // Verify redirect to login
  27 |     await expect(page).toHaveURL('/login');
  28 |   });
  29 | 
  30 |   test('unauthenticated user redirects to login when accessing companies', async ({ page }) => {
  31 |     await page.evaluate(() => {
  32 |       localStorage.clear();
  33 |     });
  34 |     await page.goto('/companies');
  35 | 
  36 |     // Verify redirect to login
  37 |     await expect(page).toHaveURL('/login');
  38 |   });
  39 | 
  40 |   test('unauthenticated user redirects to login when accessing tasks', async ({ page }) => {
  41 |     await page.evaluate(() => {
  42 |       localStorage.clear();
  43 |     });
  44 |     await page.goto('/tasks');
  45 | 
  46 |     // Verify redirect to login
  47 |     await expect(page).toHaveURL('/login');
  48 |   });
  49 | 
  50 |   test('unauthenticated user redirects to login when accessing activities', async ({ page }) => {
  51 |     await page.evaluate(() => {
  52 |       localStorage.clear();
  53 |     });
  54 |     await page.goto('/activities');
  55 | 
  56 |     // Verify redirect to login
  57 |     await expect(page).toHaveURL('/login');
  58 |   });
  59 | 
  60 |   test('authenticated user can access contacts', async ({ page }) => {
  61 |     await login(page);
  62 |     await page.goto('/contacts');
  63 |     await expect(page.locator('h1', { hasText: /Contacts|Contact List/i })).toBeVisible({ timeout: 5000 });
  64 |   });
  65 | 
  66 |   test('authenticated user can access companies', async ({ page }) => {
  67 |     await login(page);
  68 |     await page.goto('/companies');
  69 |     await expect(page.locator('h1', { hasText: /Companies|Company List/i })).toBeVisible({ timeout: 5000 });
  70 |   });
  71 | 
  72 |   test('authenticated user can access tasks', async ({ page }) => {
  73 |     await login(page);
  74 |     await page.goto('/tasks');
  75 |     await expect(page.locator('h1', { hasText: /Tasks|Task List/i })).toBeVisible({ timeout: 5000 });
  76 |   });
  77 | 
  78 |   test('authenticated user can access activities', async ({ page }) => {
  79 |     await login(page);
  80 |     await page.goto('/activities');
  81 |     await expect(page.locator('h1', { hasText: /Activities|Activity List/i })).toBeVisible({ timeout: 5000 });
  82 |   });
  83 | });
  84 | 
```