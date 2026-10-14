# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks/task-list.spec.ts >> Task List Tests >> task card is clickable and navigates to detail
- Location: tests/e2e/tasks/task-list.spec.ts:78:3

# Error details

```
Error: locator.click: SyntaxError: Failed to execute 'querySelectorAll' on 'Document': '[class*="border rounded-lg p-4"]:first' is not a valid selector.
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
  - waiting for locator('a[class*="border rounded-lg p-4"], [class*="border rounded-lg p-4"]:first')

```

# Page snapshot

```yaml
- generic [ref=f2e3]:
  - complementary [ref=f2e4]:
    - generic [ref=f2e5]:
      - generic [ref=f2e6]: Aqua CRM
      - navigation [ref=f2e9]:
        - link "Dashboard" [ref=f2e10] [cursor=pointer]:
          - /url: /
        - link "Contacts" [ref=f2e18] [cursor=pointer]:
          - /url: /contacts
        - link "Companies" [ref=f2e24] [cursor=pointer]:
          - /url: /companies
        - link "Tasks" [ref=f2e31] [cursor=pointer]:
          - /url: /tasks
        - link "Activities" [ref=f2e37] [cursor=pointer]:
          - /url: /activities
        - button "Switch to dark mode" [ref=f2e42]
        - button "Log out" [ref=f2e51]
  - generic [ref=f2e57]:
    - textbox "Global search" [ref=f2e60]:
      - /placeholder: Search contacts, tasks, companies...
    - main [ref=f2e61]:
      - generic [ref=f2e62]:
        - generic [ref=f2e63]:
          - heading "Kanban Board" [level=1] [ref=f2e64]
          - button "Back to List" [ref=f2e65]
        - generic [ref=f2e66]:
          - generic [ref=f2e67]:
            - heading "Kanban Board" [level=2] [ref=f2e68]
            - button "Filter" [ref=f2e69]
          - generic [ref=f2e70]:
            - generic [ref=f2e71]:
              - heading "Open" [level=3] [ref=f2e72]
              - button "+ Add Task" [ref=f2e74]
              - generic [ref=f2e76]:
                - generic [ref=f2e77]:
                  - generic [ref=f2e78]: Run performance tests
                  - generic [ref=f2e79]: urgent
                - paragraph [ref=f2e80]: "Description for task: Run performance tests"
                - paragraph [ref=f2e81]: "Due: 9/25/2026"
              - generic [ref=f2e83]:
                - generic [ref=f2e84]:
                  - generic [ref=f2e85]: Optimize database queries
                  - generic [ref=f2e86]: low
                - paragraph [ref=f2e87]: "Description for task: Optimize database queries"
                - paragraph [ref=f2e88]: "Due: 9/30/2026"
            - generic [ref=f2e89]:
              - heading "In Progress" [level=3] [ref=f2e90]
              - button "+ Add Task" [ref=f2e92]
              - generic [ref=f2e94]:
                - generic [ref=f2e95]:
                  - generic [ref=f2e96]: Optimize frontend build
                  - generic [ref=f2e97]: medium
                - paragraph [ref=f2e98]: "Description for task: Optimize frontend build"
                - paragraph [ref=f2e99]: "Due: 10/16/2026"
            - generic [ref=f2e100]:
              - heading "Completed" [level=3] [ref=f2e101]
              - button "+ Add Task" [ref=f2e103]
              - generic [ref=f2e105]:
                - generic [ref=f2e106]:
                  - generic [ref=f2e107]: Analyze requirements
                  - generic [ref=f2e108]: low
                - paragraph [ref=f2e109]: "Description for task: Analyze requirements"
              - generic [ref=f2e111]:
                - generic [ref=f2e112]:
                  - generic [ref=f2e113]: Analyze requirements
                  - generic [ref=f2e114]: urgent
                - paragraph [ref=f2e115]: "Description for task: Analyze requirements"
              - generic [ref=f2e117]:
                - generic [ref=f2e118]:
                  - generic [ref=f2e119]: Deploy to production
                  - generic [ref=f2e120]: high
                - paragraph [ref=f2e121]: "Description for task: Deploy to production"
              - generic [ref=f2e123]:
                - generic [ref=f2e124]:
                  - generic [ref=f2e125]: Fix critical bug
                  - generic [ref=f2e126]: high
                - paragraph [ref=f2e127]: "Description for task: Fix critical bug"
            - generic [ref=f2e128]:
              - heading "Cancelled" [level=3] [ref=f2e129]
              - button "+ Add Task" [ref=f2e131]
              - generic [ref=f2e133]:
                - generic [ref=f2e134]:
                  - generic [ref=f2e135]: Build dashboard
                  - generic [ref=f2e136]: low
                - paragraph [ref=f2e137]: "Description for task: Build dashboard"
                - paragraph [ref=f2e138]: "Due: 10/10/2026"
              - generic [ref=f2e140]:
                - generic [ref=f2e141]:
                  - generic [ref=f2e142]: Update dependencies
                  - generic [ref=f2e143]: medium
                - paragraph [ref=f2e144]: "Description for task: Update dependencies"
                - paragraph [ref=f2e145]: "Due: 10/18/2026"
              - generic [ref=f2e147]:
                - generic [ref=f2e148]:
                  - generic [ref=f2e149]: Analyze requirements
                  - generic [ref=f2e150]: low
                - paragraph [ref=f2e151]: "Description for task: Analyze requirements"
                - paragraph [ref=f2e152]: "Due: 10/13/2026"
```