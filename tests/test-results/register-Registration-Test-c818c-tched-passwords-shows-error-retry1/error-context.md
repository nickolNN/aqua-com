# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.ts >> Registration Tests >> register with mismatched passwords shows error
- Location: tests/e2e/register.spec.ts:56:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('p:text-xs:text-destructive').filter({ hasText: 'Passwords do not match' })
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
  - Expect "toBeVisible" locator('p:text-xs:text-destructive').filter({ hasText: 'Passwords do not match' }) with timeout 1000ms
  - waiting for locator('p:text-xs:text-destructive').filter({ hasText: 'Passwords do not match' })

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - generic [ref=f1e5]:
    - heading "Aqua CRM" [level=1] [ref=f1e6]
    - paragraph [ref=f1e7]: Sign in to your account
  - generic [ref=f1e9]:
    - generic [ref=f1e10]:
      - text: Name
      - textbox "Name" [ref=f1e11]:
        - /placeholder: Enter your full name
        - text: Test User
    - generic [ref=f1e12]:
      - text: Email
      - textbox "Email" [ref=f1e13]:
        - /placeholder: Enter your email
        - text: newuser@example.com
    - generic [ref=f1e14]:
      - text: Password
      - textbox "Password" [ref=f1e15]:
        - /placeholder: Enter your password
        - text: TestPass123
    - generic [ref=f1e16]:
      - text: Confirm Password
      - textbox "Confirm Password" [ref=f1e17]:
        - /placeholder: Confirm your password
        - text: DifferentPass123
      - paragraph [ref=f1e18]: Passwords do not match
    - button "Create account" [active] [ref=f1e19]
    - paragraph [ref=f1e20]:
      - text: Already have an account?
      - link "Sign in" [ref=f1e21] [cursor=pointer]:
        - /url: /login
```