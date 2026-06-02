---
name: e2e-test-loop
description: E2E test loop with automated fix iteration
---

# E2E Test Loop

Run Playwright E2E tests and automatically fix failures through iterative delegation.

**All tests must run in a named subtask** — each test run spawns a named subagent (`test-runner`) that executes independently.

**All steps in this workflow are delegated to subagents** — each step spawns a named subagent that executes independently:

## How It Works

This workflow orchestrates a loop that:

1. **Pick a test file** (delegate — select test file from the list)
2. **Run the test** (delegate to `test-runner`)
3. **If tests fail** (delegate to `error-investigator` to find root cause)
4. **If fix proposed** (delegate to `fix-implementer` to apply fix and verify)
5. **If fix doesn't work** (delegate back to `error-investigator`)
6. **Loop limits** — Maximum 5 runs per test file, 20 total iterations (no delegation; control flow)

## Available Test Files

- tests/e2e/login.spec.ts
- tests/e2e/contacts/contact-form.spec.ts
- tests/e2e/contacts/contact-detail.spec.ts
- tests/e2e/contacts/contact-list.spec.ts
- tests/e2e/companies/company-form.spec.ts
- tests/e2e/companies/company-detail.spec.ts
- tests/e2e/companies/company-list.spec.ts
- tests/e2e/tasks/task-form.spec.ts
- tests/e2e/tasks/task-list.spec.ts
- tests/e2e/tasks/task-detail.spec.ts
- tests/e2e/tasks/task-kanban.spec.ts
- tests/e2e/activity-form.spec.ts
- tests/e2e/dashboard.spec.ts
- tests/e2e/reports.spec.ts
- tests/e2e/register.spec.ts
- tests/e2e/password-reset.spec.ts
- tests/e2e/navigation.spec.ts
- tests/e2e/dark-mode.spec.ts
- tests/e2e/auth-protected-routes.spec.ts

## Subagent Behavior

### test-runner
- Run ONLY the test file provided
- Execute: `npx playwright test <test-file-path>`
- Return `PASS` or `FAIL` with full output

### error-investigator
- Analyze test failure output to find root cause
- Read test file and component files
- Propose a specific fix with exact code changes

### fix-implementer
- Read proposed fix and current code
- Apply the fix
- Run test to verify
- Return `FIXED` or `STILL FAILING` with new error output

## Delegation Chains

- test-runner → if PASS: done, if FAIL: error-investigator
- error-investigator → if fix proposed: fix-implementer, if STILL FAILING after max attempts: return error
- fix-implementer → if FIXED: done, if STILL FAILING: back to error-investigator

## Output Format

- `PASS` - Test passes
- `FAIL` - Test fails with error details
- `FIXED` - Fix verified
- `STILL FAILING` - Fix did not resolve the issue
- `ERROR` - Max iterations reached without resolving
