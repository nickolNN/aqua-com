# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: password-reset.spec.ts >> Password Reset Tests >> password reset page displays correctly
- Location: src/frontend/tests/e2e/password-reset.spec.ts:9:3

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
  1  | import { Page } from '@playwright/test';
  2  | 
  3  | /**
  4  |  * Fixture: Setup test environment
  5  |  * Clears localStorage and navigates to the app's base URL
  6  |  */
  7  | export async function setupTestEnvironment(page: Page) {
  8  |   // Navigate to the app's base URL first (so localStorage is accessible)
> 9  |   await page.goto('/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  10 |   // Clear localStorage for isolation between tests
  11 |   await page.evaluate(() => {
  12 |     localStorage.clear();
  13 |   });
  14 | }
  15 | 
  16 | /**
  17 |  * Fixture: Login with valid credentials
  18 |  * @returns {Promise<void>}
  19 |  */
  20 | export async function login(page: Page) {
  21 |   // Navigate to login page
  22 |   await page.goto('/login');
  23 | 
  24 |   // Fill in valid credentials
  25 |   await page.locator('#email').click();
  26 |   await page.locator('#email').fill('test@example.com');
  27 |   await page.locator('#password').click();
  28 |   await page.locator('#password').fill('password123');
  29 | 
  30 |   // Submit login form
  31 |   await page.locator('button[type="submit"]').click();
  32 | 
  33 |   // Wait for navigation to complete
  34 |   await page.waitForURL(/\/(login|dashboard)/, { timeout: 10000 });
  35 | }
  36 | 
  37 | /**
  38 |  * Fixture: Register with valid data
  39 |  * @returns {Promise<void>}
  40 |  */
  41 | export async function register(page: Page) {
  42 |   // Navigate to register page
  43 |   await page.goto('/register');
  44 | 
  45 |   // Fill registration form
  46 |   await page.locator('#name').click();
  47 |   await page.locator('#name').fill('Test User');
  48 |   await page.locator('#register-email').click();
  49 |   await page.locator('#register-email').fill('newuser@example.com');
  50 |   await page.locator('#password').click();
  51 |   await page.locator('#password').fill('TestPass123');
  52 |   await page.locator('#confirm-password').click();
  53 |   await page.locator('#confirm-password').fill('TestPass123');
  54 | 
  55 |   // Submit registration form
  56 |   await page.locator('button[type="submit"]').click();
  57 | }
  58 | 
  59 | /**
  60 |  * Fixture: Navigate to dashboard after login
  61 |  * @returns {Promise<void>}
  62 |  */
  63 | export async function goToDashboard(page: Page) {
  64 |   await page.goto('/');
  65 |   await expect(page.locator('h1')).toBeVisible({ timeout: 5000 });
  66 | }
  67 | 
  68 | /**
  69 |  * Fixture: Logout by clearing localStorage and navigating to login
  70 |  * @returns {Promise<void>}
  71 |  */
  72 | export async function logout(page: Page) {
  73 |   // Navigate to login page first
  74 |   await page.goto('/login');
  75 |   // Clear localStorage
  76 |   await page.evaluate(() => {
  77 |     localStorage.clear();
  78 |   });
  79 | }
  80 | 
```