# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: password-reset.spec.ts >> Password Reset Tests >> password reset form validates email format
- Location: tests/e2e/password-reset.spec.ts:27:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('p:text-xs:text-destructive').filter({ hasText: 'Invalid email format' })
Expected: visible
Error: SyntaxError: Failed to execute 'querySelectorAll' on 'Document': 'p:text-xs:text-destructive' is not a valid selector.
    at query (<anonymous>:5720:41)
    at <anonymous>:5730:7
    at SelectorEvaluatorImpl._cached (<anonymous>:5507:20)
    at SelectorEvaluatorImpl._queryCSS (<anonymous>:5717:17)
    at SelectorEvaluatorImpl._querySimple (<anonymous>:5597:19)
    at <anonymous>:5545:29
    at SelectorEvaluatorImpl._cached (<anonymous>:5507:20)
    at SelectorEvaluatorImpl.query (<anonymous>:5538:19)
    at Object.query (<anonymous>:5752:44)
    at <anonymous>:5710:21

Call log:
  - Expect "toBeVisible" locator('p:text-xs:text-destructive').filter({ hasText: 'Invalid email format' }) with timeout 1000ms
  - waiting for locator('p:text-xs:text-destructive').filter({ hasText: 'Invalid email format' })

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic [ref=f1e5]:
    - heading "Aqua CRM" [level=1] [ref=f1e6]
    - paragraph [ref=f1e7]: Sign in to your account
  - generic [ref=f1e9]:
    - generic [ref=f1e10]:
      - text: Email
      - textbox "Email" [active] [ref=f1e11]:
        - /placeholder: Enter your email
        - text: invalid-email
    - button "Send reset link" [ref=f1e12]
    - paragraph [ref=f1e13]:
      - link "Back to login" [ref=f1e14] [cursor=pointer]:
        - /url: /login
```