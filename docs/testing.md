# Testing Guidelines

## Test Types

- End-to-end tests with Playwright (`tests/e2e/`) covering the kanban app:
  auth (login/logout), tasks (kanban board, form, detail), protected routes,
  navigation, dark mode
- The mock API layer is an RTK Query baseQuery interceptor
  (`src/api/interceptors/mocks.ts`) — tasks are seeded into and persisted in
  `localStorage` (`mock_data_tasks`); no MSW
- No unit/component test framework is configured — behavior is covered by the
  E2E suite

## Running Tests

```bash
pnpm test             # run the Playwright suite
pnpm test -- --ui     # run with the Playwright test UI
```

The Playwright config (`playwright.config.ts`) starts the dev server itself
(`webServer`), so no separate setup is needed.

## Conventions

- One spec file per feature area in `tests/e2e/` (`login.spec.ts`,
  `logout.spec.ts`, `dark-mode.spec.ts`, `auth-protected-routes.spec.ts`,
  `navigation.spec.ts`, `tasks/`)
- Reuse the shared setup in `tests/e2e/fixtures/setup.ts`
  (`setupTestEnvironment`, `login`) in `beforeEach`
- The mock login only accepts the fixture credentials
  (`test@example.com` / `password123`); anything else is rejected with an
  error box
- Prefer stable, semantic locators (`#email`, `button[type="submit"]`,
  `getByRole`, visible text) over brittle CSS selectors
- Assert on user-visible state (URL, visible elements, localStorage) rather
  than app internals

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
