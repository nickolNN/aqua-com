# Testing Guidelines

## Test Types

- End-to-end tests with Playwright (`tests/e2e/`) covering the full app: auth, tasks, contacts, companies, activities, dashboard, reports, navigation, dark mode
- MSW (Mock Service Worker) mocks the API data during dev and test runs
- No unit/component test framework is configured — behavior is covered by the E2E suite

## Running Tests

```bash
pnpm test             # run the Playwright suite
pnpm test -- --ui     # run with the Playwright test UI
```

The Playwright config (`playwright.config.ts`) starts the dev server itself (`webServer`), so no separate setup is needed.

## Conventions

- One spec file per feature area in `tests/e2e/` (`login.spec.ts`, `register.spec.ts`, `tasks/`, `contacts/`, `companies/`, ...)
- Reuse the shared setup in `tests/e2e/fixtures/setup.ts` (`setupTestEnvironment`, `login`) in `beforeEach`
- Prefer stable, semantic locators (`#email`, `button[type="submit"]`, visible text) over brittle CSS selectors
- Assert on user-visible state (URL, visible elements, localStorage) rather than app internals

## Examples

### Good

```typescript
import { test, expect } from '@playwright/test';
import { login, setupTestEnvironment } from './fixtures/setup';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page);
  });

  test('login with valid credentials', async ({ page }) => {
    await login(page);

    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toBeVisible();

    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
  });
});
```

### Avoid

```typescript
// Don't rely on deeply nested, style-based selectors
await page.click('div:nth-child(3) > button > span');
```
