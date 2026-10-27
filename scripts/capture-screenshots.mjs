#!/usr/bin/env node
/**
 * Standalone Playwright script (NOT a test spec — `pnpm test` stays untouched).
 *
 * Captures the 12 modal/form/button UI states used as consistency evidence
 * for the "modals, forms and buttons look consistent" issue. Run twice:
 *
 *   node scripts/capture-screenshots.mjs before   # BEFORE any code change
 *   node scripts/capture-screenshots.mjs after    # AFTER all fixes
 *
 * Output: docs/screenshots/{before,after}/<state>.png
 *
 * Determinism:
 * - The mock task generator is random, so a fresh context would seed a
 *   different board each run. The `before` run therefore saves the seeded
 *   task store (localStorage `mock_data_tasks`) to
 *   docs/screenshots/.mock-state.json, and the `after` run re-injects it via
 *   addInitScript — both runs then render the identical board, so before/
 *   after pairs are comparable.
 * - `document.fonts.ready` is awaited before every shot: the UI font
 *   (Manrope) loads from Google Fonts, and shooting mid-font-load would make
 *   text metrics differ between runs.
 * - The confirm dialog is always Cancelled, never confirmed, so no task is
 *   deleted between runs.
 *
 * State order matters: the login page is captured BEFORE logging in (after
 * login the app lands on the board route), and nothing clears localStorage,
 * so the `after` run's seeded pinned board survives login.
 *
 * Requires the dev server at BASE (pnpm dev --port 5100 / DEV_SERVER.sh).
 */

import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

const BASE = process.env.BASE_URL || 'http://localhost:5100';
const EMAIL = 'test@example.com';
const PASSWORD = 'password123';
const TASKS_STORAGE_KEY = 'mock_data_tasks';

const phase = process.argv[2];
if (phase !== 'before' && phase !== 'after') {
  console.error('Usage: node scripts/capture-screenshots.mjs <before|after>');
  process.exit(1);
}

const outDir = path.join(root, 'docs', 'screenshots', phase);
const stateFile = path.join(root, 'docs', 'screenshots', '.mock-state.json');

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const contextOptions = {
  viewport: { width: 1920, height: 1080 },
};
const context = await browser.newContext(contextOptions);
context.setDefaultTimeout(15000);
context.setDefaultNavigationTimeout(30000);

// `after` run: pin the exact board the `before` run captured.
if (phase === 'after' && fs.existsSync(stateFile)) {
  const tasks = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  // NOTE: the init script body is stringified and re-evaluated in the
  // browser, so it must not close over Node-side variables (a ReferenceError
  // there is silent and the pin never lands). Use the literal key.
  await context.addInitScript((stored) => {
    localStorage.setItem('mock_data_tasks', JSON.stringify(stored));
  }, tasks);
  console.log(`Seeded board pinned from ${path.relative(root, stateFile)} (${tasks.length} tasks)`);
}

const page = await context.newPage();

async function shot(name) {
  // Deterministic text rendering: wait for the webfont to settle.
  await page.evaluate(() => document.fonts.ready);
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file });
  console.log(`  ${name} -> ${path.relative(root, file)}`);
}

const settle = (ms = 400) => page.waitForTimeout(ms); // let entry animations finish

// --- 1-2. Login page (light, dark) — captured BEFORE logging in ---
await page.goto(`${BASE}/login`);
await page.locator('#email').waitFor();
await settle(800);
await shot('login-light');

await page.getByTestId('theme-toggle').click();
await settle();
await shot('login-dark');

await page.getByTestId('theme-toggle').click(); // back to light
await settle();

// --- 3-4. Board (light, dark) ---
await page.locator('#email').fill(EMAIL);
await page.locator('#password').fill(PASSWORD);
await page.locator('button[type="submit"]').click();
await page.waitForFunction(() => localStorage.getItem('token'), null, { timeout: 15000 });
await page.waitForURL((url) => !url.toString().endsWith('/login'), { timeout: 10000 });
await page.locator('[data-testid="kanban-task-card"]').first().waitFor();
await settle(800);
await shot('board-light');

await page.getByTestId('theme-toggle').click(); // dark
await settle();
await shot('board-dark');

// --- 5. Quick-add form open in the Open column, input focused (light) ---
await page.getByTestId('theme-toggle').click(); // back to light
await settle();
await page.locator('[role="group"][aria-label="Open"] >> text=+ Add Task').first().click();
await page.locator('[data-testid="kanban-quick-add"]').click();
await settle();
await shot('quick-add-open');
// Collapse again (ghost Cancel) so the board state is unchanged.
await page.getByRole('button', { name: 'Cancel', exact: true }).first().click();
await settle();

// --- 6-8. Task detail modal: light, delete confirm, dark ---
await page.locator('[data-testid="kanban-task-card"]').first().click();
await page.getByRole('dialog').waitFor();
await page.getByRole('heading').first().waitFor();
await settle();
await shot('task-detail-modal');
const taskId = new URL(page.url()).searchParams.get('task');
if (!taskId) throw new Error('expected /tasks?task=<id> in the URL after the detail modal');

await page.getByRole('dialog').getByRole('button', { name: 'Delete', exact: true }).click();
await page.locator('[data-testid="confirm-dialog"]').waitFor();
await settle();
await shot('delete-confirm-dialog');
// Cancel — no actual delete, board stays identical for the after run.
await page.locator('[data-testid="confirm-dialog"] button', { hasText: 'Cancel' }).click();
await settle();

// Dark shot of the detail modal: the open dialog's overlay covers the
// sidebar toggle, so close the modal, switch the theme, then re-open it via
// its URL (the modal state is URL-linked: /tasks?task=<id>).
await page.goto(`${BASE}/tasks`);
await page.waitForFunction(() => !document.querySelector('[role="dialog"]'), null, { timeout: 10000 });
await page.getByTestId('theme-toggle').click(); // dark
await settle();
await page.goto(`${BASE}/tasks?task=${encodeURIComponent(taskId)}`);
await page.getByRole('dialog').waitFor();
await settle();
await shot('task-detail-modal-dark');

// --- 9-10. Create modal + open Priority select (light) ---
// Close the detail modal first (its overlay covers the sidebar toggle).
await page.goto(`${BASE}/tasks`);
await page.waitForFunction(() => !document.querySelector('[role="dialog"]'), null, { timeout: 10000 });
await page.getByTestId('theme-toggle').click(); // back to light
await settle();
await page.goto(`${BASE}/tasks?new`);
await page.getByRole('dialog').getByRole('heading', { name: 'Create Task' }).waitFor();
await settle();
await shot('task-create-modal');

await page.getByRole('dialog').getByRole('combobox').first().click();
await page.getByRole('listbox').waitFor();
await settle();
await shot('task-create-modal-select-open');
await page.keyboard.press('Escape'); // close the dropdown (not the dialog)
await settle();

// --- 11. Dependency row in the create modal (light) ---
// Add a dependency and select the first task option: the BEFORE shot of
// this scene shows the pre-fix collapse (the task trigger `flex-1` wraps a
// long title into 2-4 rows); the AFTER shot shows the stable row (`flex-1
// min-w-0` task trigger + pinned `w-44` type trigger).
await page.getByRole('dialog').getByRole('button', { name: 'Add Dependency' }).click();
await page.getByRole('dialog').getByRole('combobox').nth(2).click();
await page.getByRole('listbox').waitFor();
await page.getByRole('option').first().click();
await settle();
await shot('task-create-modal-dependency');

// --- 12. Edit modal (light) ---
await page.goto(`${BASE}/tasks?task=${encodeURIComponent(taskId)}&edit`);
await page.getByRole('dialog').getByRole('heading', { name: 'Edit Task' }).waitFor();
await settle();
await shot('task-edit-modal');

// `before` run: persist the seeded board so the `after` run renders the
// exact same tasks.
if (phase === 'before') {
  const stored = await page.evaluate((key) => localStorage.getItem(key), TASKS_STORAGE_KEY);
  if (stored) {
    fs.writeFileSync(stateFile, stored);
    console.log(`Mock state pinned -> ${path.relative(root, stateFile)}`);
  } else {
    console.error('WARNING: mock task store was empty after board load — after run will reseed a different board');
  }
}

await context.close();
await browser.close();
console.log(`Done: ${phase} shots in ${path.relative(root, outDir)}`);
