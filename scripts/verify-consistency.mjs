#!/usr/bin/env node
/**
 * DOM-level consistency assertions for the "modals, forms and buttons look
 * consistent" issue.
 *
 * Standalone Playwright script (NOT a test spec — `pnpm test` stays
 * untouched). Pixel-level before/after comparison is unreliable in this
 * headless environment: two consecutive runs of the *same* code with the
 * *same* pinned data differ by 20k–127k pixels in text regions (Chromium
 * text anti-aliasing is not run-to-run deterministic). Computed-style and
 * structure assertions, by contrast, are deterministic — so this script
 * verifies the consistency properties directly in the DOM:
 *
 *  1. DialogTitle / DialogDescription carry the shared default styles
 *     (text-lg font-semibold / text-sm text-muted-foreground).
 *  2. ConfirmDialog is built on the shared Dialog primitive: same glass
 *     content class, DialogHeader/Title/Description/Footer structure, and
 *     shared Button cancel/confirm actions.
 *  3. TaskDetailModal's "View parent task" and dependency actions are
 *     shared Button (variant="link") elements — no raw <a> link buttons.
 *  4. SelectTrigger uses the shared radius (rounded-lg) and a
 *     focus-visible ring, matching the Input/Textarea convention.
 *  5. TaskFormModal's footer buttons are direct children of DialogFooter
 *     (no extra wrapper div).
 *  6. Every interactive control (buttons, links, select triggers, checkboxes,
 *     kanban cards; disabled / pointer-events:none skipped) computes to
 *     cursor: pointer — audited on the board, the detail modal and the
 *     create modal.
 *  7. Modal footers (detail, confirm, create) carry the shared mt-4
 *     (computed margin-top 16px).
 *  8. The dependency row has stable select widths: the type trigger is
 *     pinned to 176px (w-44) and the task trigger (flex-1 min-w-0) is wider.
 *
 * Usage: node scripts/verify-consistency.mjs
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
const stateFile = path.join(root, 'docs', 'screenshots', '.mock-state.json');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
context.setDefaultTimeout(15000);

// Pin the board so the first task (and its parent/dependency relations)
// is the same one the screenshot runs captured.
// NOTE: the init script body is stringified and re-evaluated in the
// browser, so it must not close over Node-side variables (a ReferenceError
// there is silent and the pin never lands). Use the literal key.
if (fs.existsSync(stateFile)) {
  const tasks = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  await context.addInitScript((stored) => {
    localStorage.setItem('mock_data_tasks', JSON.stringify(stored));
  }, tasks);
}

const page = await context.newPage();

const results = [];
function check(name, ok, detail = '', skip = false) {
  results.push({ name, ok, detail, skip });
  console.log(`  ${skip ? 'SKIP' : ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

// Shared cursor audit + footer-margin probe, injected as page globals.
// Playwright cannot serialize a Node function as an evaluate argument, so
// the probes live in an init script and are called by name from evaluate.
// (An init script — not a script tag — so the globals survive navigation.)
// __cursorAudit: every enabled, visible interactive control (buttons,
// links, select triggers, checkboxes, kanban cards) must compute to
// cursor: pointer; disabled / pointer-events:none controls are skipped.
// __footerMargin: the DialogFooter div is the one carrying the
// `justify-end` class that holds the action buttons.
await context.addInitScript(`
    window.__cursorAudit = (root) => {
      const els = Array.from(
        root.querySelectorAll(
          'button, a[href], [role="combobox"], input[type="checkbox"], [data-testid="kanban-task-card"]',
        ),
      ).filter((el) => !el.disabled && getComputedStyle(el).pointerEvents !== 'none');
      const bad = els.filter((el) => getComputedStyle(el).cursor !== 'pointer');
      return { total: els.length, bad: bad.length, badTags: bad.map((el) => el.tagName.toLowerCase()) };
    };
    window.__footerMargin = (root) => {
      const footer = Array.from(root.querySelectorAll('div')).find(
        (d) => (d.className || '').includes('justify-end') && d.querySelector('button'),
      );
      return footer ? getComputedStyle(footer).marginTop : null;
    };
`);

// Log in.
await page.goto(`${BASE}/login`);
await page.locator('#email').fill(EMAIL);
await page.locator('#password').fill(PASSWORD);
await page.locator('button[type="submit"]').click();
await page.waitForFunction(() => localStorage.getItem('token'), null, { timeout: 15000 });
await page.locator('[data-testid="kanban-task-card"]').first().waitFor();

// 12a. cursor: pointer — board surface (sidebar nav, theme toggle,
// quick-add button, kanban cards).
const boardCursor = await page.evaluate(() => window.__cursorAudit(document));

const tasks = await page.evaluate((key) => {
  return JSON.parse(localStorage.getItem(key) || '[]');
}, TASKS_STORAGE_KEY);
if (tasks.length === 0) throw new Error('no pinned tasks');
const taskId = tasks[0].id;
// A task with both a parent and a dependency, so the link-style action
// buttons render.
const richTask = tasks.find((t) => t.parent_task_id && (t.dependencies || []).length > 0);
const richTaskId = richTask ? richTask.id : null;

// --- Open the task detail modal ---
await page.goto(`${BASE}/tasks?task=${encodeURIComponent(taskId)}`);
// DOM waits keyed to the elements the checks below read (heading + the
// DialogDescription <p>) instead of a fixed sleep that races slow renders.
await page.getByRole('dialog').getByRole('heading').waitFor();
await page.getByRole('dialog').locator('p').waitFor();

// 1. DialogTitle / DialogDescription shared defaults (inside the detail modal)
const titleStyles = await page.getByRole('dialog').getByRole('heading').evaluate((el) => {
  const s = getComputedStyle(el);
  return { fontSize: s.fontSize, fontWeight: s.fontWeight, color: s.color };
});
check(
  'DialogTitle has shared text-lg font-semibold style',
  titleStyles.fontSize === '18px' && titleStyles.fontWeight === '600',
  JSON.stringify(titleStyles),
);

const descStyles = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]');
  const desc = dialog.querySelector('p'); // DialogDescription renders a <p>
  if (!desc) return null;
  const s = getComputedStyle(desc);
  return { fontSize: s.fontSize, color: s.color };
});
check(
  'DialogDescription has shared text-sm muted style',
  !!descStyles && descStyles.fontSize === '14px',
  JSON.stringify(descStyles),
);

// 12b/13a. detail modal: cursor audit + footer top margin.
const detailCursor = await page.evaluate(
  () => window.__cursorAudit(document.querySelector('[role="dialog"]')),
);
const detailFooterMargin = await page.evaluate(
  () => window.__footerMargin(document.querySelector('[role="dialog"]')),
);

// 2. ConfirmDialog built on the shared Dialog primitive
await page.getByRole('dialog').getByRole('button', { name: 'Delete', exact: true }).click();
await page.locator('[data-testid="confirm-dialog"]').waitFor();
await page.locator('[data-testid="confirm-dialog"]').locator('h2').waitFor();
await page.locator('[data-testid="confirm-dialog"]').locator('button').first().waitFor();

const confirm = await page.locator('[data-testid="confirm-dialog"]').evaluate((el) => {
  const content = el.closest('[role="dialog"]') || el;
  const title = content.querySelector('h2');
  const description = content.querySelector('p');
  // DialogHeader/DialogFooter are divs (shared primitives): the footer is
  // the div with the shared `sm:justify-end` class that holds the actions.
  const footer = Array.from(content.querySelectorAll('div')).find(
    (d) => (d.className || '').includes('justify-end') && d.querySelector('button'),
  );
  const buttons = Array.from(content.querySelectorAll('button'));
  const glass = (content.className || '').includes('glass');
  return {
    hasTitle: !!title,
    titleText: title?.textContent || '',
    hasDescription: !!description,
    hasFooter: !!footer,
    buttonLabels: buttons.map((b) => (b.getAttribute('aria-label') || b.textContent).trim()),
    glassContent: glass,
  };
});
check(
  'ConfirmDialog uses shared Dialog structure (title/description/footer)',
  confirm.hasTitle && confirm.hasDescription && confirm.hasFooter,
  JSON.stringify(confirm),
);
check(
  'ConfirmDialog content carries the shared glass class',
  confirm.glassContent,
);
check(
  'ConfirmDialog actions are shared Buttons (Cancel + destructive, plus the shared Close X)',
  confirm.buttonLabels.includes('Cancel') &&
    confirm.buttonLabels.some((l) => /delete/i.test(l)) &&
    confirm.buttonLabels.includes('Close'),
  JSON.stringify(confirm.buttonLabels),
);

// 13b. confirm dialog footer top margin.
const confirmFooterMargin = await page.evaluate(() => {
  const el = document.querySelector('[data-testid="confirm-dialog"]');
  const content = el ? el.closest('[role="dialog"]') : null;
  return content ? window.__footerMargin(content) : null;
});

// Dismiss the confirm dialog (Cancel — no deletion).
await page.locator('[data-testid="confirm-dialog"] button', { hasText: 'Cancel' }).click();
await page.locator('[data-testid="confirm-dialog"]').waitFor({ state: 'detached' });

// 3. TaskDetailModal link actions are shared Button(variant="link"), not raw <a>.
// Re-open the modal on a task that has a parent AND a dependency so the
// link actions render.
if (richTaskId) {
  await page.goto(`${BASE}/tasks?task=${encodeURIComponent(richTaskId)}`);
  // DOM wait keyed to the exact element the link-button checks read — the
  // proven failure mode was a fixed 600ms sleep that lost the race against
  // slow dev-server renders.
  await page.getByRole('button', { name: 'View parent task' }).waitFor();
}
const linkButtons = await page.getByRole('dialog').evaluate((dialog) => {
  const anchors = Array.from(dialog.querySelectorAll('a'));
  const buttons = Array.from(dialog.querySelectorAll('button'));
  const linkVariant = buttons.filter((b) => (b.className || '').includes('text-primary') && (b.className || '').includes('underline'));
  return {
    anchorCount: anchors.length,
    linkButtonCount: linkVariant.length,
    linkButtonLabels: linkVariant.map((b) => b.textContent.trim()),
  };
});
if (!richTaskId) {
  check(
    'TaskDetailModal has no raw <a> link buttons',
    true,
    'SKIP — no rich task pinned (parent + dependency), link actions do not render',
    true,
  );
  check(
    'TaskDetailModal link actions use shared Button link variant',
    true,
    'SKIP — no rich task pinned (parent + dependency), link actions do not render',
    true,
  );
} else {
  check(
    'TaskDetailModal has no raw <a> link buttons',
    linkButtons.anchorCount === 0,
    `anchors=${linkButtons.anchorCount}`,
  );
  check(
    'TaskDetailModal link actions use shared Button link variant',
    linkButtons.linkButtonCount >= 1,
    JSON.stringify(linkButtons.linkButtonLabels),
  );
}

// Close the detail modal.
await page.goto(`${BASE}/tasks`);
await page.waitForFunction(() => !document.querySelector('[role="dialog"]'), null, { timeout: 10000 });

// --- Open the create modal ---
await page.goto(`${BASE}/tasks?new`);
await page.getByRole('dialog').getByRole('heading', { name: 'Create Task' }).waitFor();
await page.getByRole('dialog').getByRole('combobox').first().waitFor();

// 4. SelectTrigger shared radius + focus-visible ring — compared against
// the Input control (the shared convention is the same classes on both).
const formStyles = await page.getByRole('dialog').evaluate((dialog) => {
  const select = dialog.querySelector('[role="combobox"]');
  const input = dialog.querySelector('input');
  const cs = (el) => {
    const s = el ? getComputedStyle(el) : null;
    const cls = el ? el.className || '' : '';
    return {
      borderRadius: s ? s.borderRadius : null,
      hasFocusVisibleRing: cls.includes('focus-visible:ring'),
      hasLegacyFocusRing: cls.includes('focus:ring'),
    };
  };
  return { select: cs(select), input: cs(input) };
});
check(
  'SelectTrigger radius matches the Input control (shared rounded-lg)',
  !!formStyles.select.borderRadius && formStyles.select.borderRadius === formStyles.input.borderRadius,
  `select=${formStyles.select.borderRadius} input=${formStyles.input.borderRadius}`,
);
check(
  'SelectTrigger uses focus-visible ring (shared convention)',
  formStyles.select.hasFocusVisibleRing && !formStyles.select.hasLegacyFocusRing,
  JSON.stringify(formStyles.select),
);

// 5. TaskFormModal footer: buttons are direct children of DialogFooter
// (the shared footer div carries `sm:justify-end`).
const footerStructure = await page.getByRole('dialog').evaluate((dialog) => {
  const footer = Array.from(dialog.querySelectorAll('div')).find(
    (d) => (d.className || '').includes('justify-end') && d.querySelector('button'),
  );
  if (!footer) return { hasFooter: false };
  const children = Array.from(footer.children);
  const directButtons = children.filter((c) => c.tagName === 'BUTTON').length;
  const wrapperDivs = children.filter((c) => c.tagName === 'DIV').length;
  return { hasFooter: true, childCount: children.length, directButtons, wrapperDivs };
});
check(
  'TaskFormModal footer has no extra wrapper div (buttons are direct children)',
  footerStructure.hasFooter && footerStructure.wrapperDivs === 0 && footerStructure.directButtons >= 2,
  JSON.stringify(footerStructure),
);

// Title/description consistency inside the create modal too
const createTitle = await page.getByRole('dialog').getByRole('heading', { name: 'Create Task' }).evaluate((el) => {
  const s = getComputedStyle(el);
  return `${s.fontSize}/${s.fontWeight}`;
});
check(
  'Create Task DialogTitle matches shared style',
  createTitle === '18px/600',
  createTitle,
);

// 12c/13c. create modal: cursor audit + footer top margin.
const createCursor = await page.evaluate(
  () => window.__cursorAudit(document.querySelector('[role="dialog"]')),
);
const createFooterMargin = await page.evaluate(
  () => window.__footerMargin(document.querySelector('[role="dialog"]')),
);

// 14. dependency row: add a row and measure the two select triggers
// (task trigger first, type trigger second).
await page.getByRole('dialog').getByRole('button', { name: 'Add Dependency' }).click();
await page.getByRole('dialog').locator('div.space-y-2 > div').first().waitFor();
const depWidths = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]');
  const row = Array.from(dialog.querySelectorAll('div.space-y-2 > div')).find(
    (d) => d.querySelectorAll('[role="combobox"]').length === 2,
  );
  if (!row) return null;
  const [task, type] = Array.from(row.querySelectorAll('[role="combobox"]'));
  return { task: task.offsetWidth, type: type.offsetWidth };
});

// 12. every interactive control (board, detail modal, create modal)
// computes to cursor: pointer.
check(
  'all interactive controls compute to cursor: pointer',
  boardCursor.bad === 0 && detailCursor.bad === 0 && createCursor.bad === 0,
  JSON.stringify({ board: boardCursor, detail: detailCursor, create: createCursor }),
);

// 13. modal footers carry the shared mt-4 (16px) top margin.
check(
  'modal footers have computed margin-top 16px (detail, confirm, create)',
  detailFooterMargin === '16px' && confirmFooterMargin === '16px' && createFooterMargin === '16px',
  JSON.stringify({ detail: detailFooterMargin, confirm: confirmFooterMargin, create: createFooterMargin }),
);

// 14. dependency selects have stable, content-independent widths.
check(
  'dependency row has stable select widths (type pinned 176px, task wider)',
  !!depWidths && depWidths.type === 176 && depWidths.task > depWidths.type,
  JSON.stringify(depWidths),
);

await context.close();
await browser.close();

const skipped = results.filter((r) => r.skip);
const failed = results.filter((r) => !r.ok && !r.skip);
const passed = results.filter((r) => r.ok && !r.skip);
console.log(
  `\n${passed.length}/${results.length - skipped.length} checks passed` +
    (skipped.length > 0 ? ` (${skipped.length} skipped)` : ''),
);
if (failed.length > 0) {
  console.error('Failed checks:');
  for (const f of failed) console.error(`  - ${f.name}`);
  process.exit(1);
}
console.log('All consistency checks passed.');
