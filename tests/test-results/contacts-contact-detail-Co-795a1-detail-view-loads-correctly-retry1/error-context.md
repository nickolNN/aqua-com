# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-detail.spec.ts >> Contact Detail Tests >> contact detail view loads correctly
- Location: tests/e2e/contacts/contact-detail.spec.ts:9:3

# Error details

```
Error: locator.click: SyntaxError: Failed to execute 'querySelectorAll' on 'Document': 'a[class*="flex items-center gap-4"]:first' is not a valid selector.
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
  - waiting for locator('a[class*="flex items-center gap-4"]:first')

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
          - heading "Contacts" [level=1] [ref=f2e64]
          - link "Create Contact" [ref=f2e65] [cursor=pointer]:
            - /url: /contacts/new
        - generic [ref=f2e66]:
          - textbox "Search contacts..." [ref=f2e67]
          - button "Quick Add" [ref=f2e69]
        - list [ref=f2e72]:
          - listitem [ref=f2e73]:
            - link "Tammy Wagner tammy.wagner@example.com +1-952-900-9121" [ref=f2e74] [cursor=pointer]:
              - /url: /contacts/4163c270-f546-4c2a-9a47-751b2536e4a5
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Tammy Wagner
                - generic [ref=f2e77]: tammy.wagner@example.com
                - generic [ref=f2e78]: +1-952-900-9121
          - listitem [ref=f2e79]:
            - link "Ryan Morgan ryan.morgan@example.com +1-688-503-6547" [ref=f2e80] [cursor=pointer]:
              - /url: /contacts/75bf0834-5cdd-4b52-9f3e-ac6684139e72
              - generic [ref=f2e81]:
                - generic [ref=f2e82]: Ryan Morgan
                - generic [ref=f2e83]: ryan.morgan@example.com
                - generic [ref=f2e84]: +1-688-503-6547
          - listitem [ref=f2e85]:
            - link "Donald Thomas donald.thomas@example.com +1-517-950-9884" [ref=f2e86] [cursor=pointer]:
              - /url: /contacts/4021d069-e383-4d3b-823b-b9c18b522cde
              - generic [ref=f2e87]:
                - generic [ref=f2e88]: Donald Thomas
                - generic [ref=f2e89]: donald.thomas@example.com
                - generic [ref=f2e90]: +1-517-950-9884
          - listitem [ref=f2e91]:
            - link "Harold Patterson harold.patterson@example.com +1-905-339-5634" [ref=f2e92] [cursor=pointer]:
              - /url: /contacts/73702ba7-fafd-4e20-9319-315940d74009
              - generic [ref=f2e93]:
                - generic [ref=f2e94]: Harold Patterson
                - generic [ref=f2e95]: harold.patterson@example.com
                - generic [ref=f2e96]: +1-905-339-5634
          - listitem [ref=f2e97]:
            - 'link "Sarah Kelly sarah.kelly@example.com +1-249-996-3070 Company: 014d0414-f368-484d-a753-b36e2d97cf5b" [ref=f2e98] [cursor=pointer]':
              - /url: /contacts/e76c7ea7-c54c-4b5c-908e-a0c5b1bca504
              - generic [ref=f2e99]:
                - generic [ref=f2e100]: Sarah Kelly
                - generic [ref=f2e101]: sarah.kelly@example.com
                - generic [ref=f2e102]: +1-249-996-3070
                - generic [ref=f2e103]: "Company: 014d0414-f368-484d-a753-b36e2d97cf5b"
          - listitem [ref=f2e104]:
            - link "Matthew Bradley matthew.bradley@example.com +1-327-872-5735" [ref=f2e105] [cursor=pointer]:
              - /url: /contacts/07bceec0-ce53-48b4-89be-f4a84d15740b
              - generic [ref=f2e106]:
                - generic [ref=f2e107]: Matthew Bradley
                - generic [ref=f2e108]: matthew.bradley@example.com
                - generic [ref=f2e109]: +1-327-872-5735
          - listitem [ref=f2e110]:
            - link "Kyle Morris kyle.morris@example.com +1-701-278-7885" [ref=f2e111] [cursor=pointer]:
              - /url: /contacts/2dbdd5a0-e1ae-4472-a70a-c07ffd9cf7d5
              - generic [ref=f2e112]:
                - generic [ref=f2e113]: Kyle Morris
                - generic [ref=f2e114]: kyle.morris@example.com
                - generic [ref=f2e115]: +1-701-278-7885
          - listitem [ref=f2e116]:
            - link "Diane Wells diane.wells@example.com +1-400-516-1419" [ref=f2e117] [cursor=pointer]:
              - /url: /contacts/588f8eb7-5b15-4f22-9e11-0063126e0546
              - generic [ref=f2e118]:
                - generic [ref=f2e119]: Diane Wells
                - generic [ref=f2e120]: diane.wells@example.com
                - generic [ref=f2e121]: +1-400-516-1419
          - listitem [ref=f2e122]:
            - link "Brian Hayes brian.hayes@example.com +1-243-581-9915" [ref=f2e123] [cursor=pointer]:
              - /url: /contacts/cd83f237-08ad-4dc6-b9df-a419e07effd7
              - generic [ref=f2e124]:
                - generic [ref=f2e125]: Brian Hayes
                - generic [ref=f2e126]: brian.hayes@example.com
                - generic [ref=f2e127]: +1-243-581-9915
          - listitem [ref=f2e128]:
            - 'link "Timothy Jordan timothy.jordan@example.com +1-909-916-6381 Company: bd24a053-464f-42d2-9fc5-2f013cadde46" [ref=f2e129] [cursor=pointer]':
              - /url: /contacts/7b01944a-d76f-4ff0-916d-24379bfa82a6
              - generic [ref=f2e130]:
                - generic [ref=f2e131]: Timothy Jordan
                - generic [ref=f2e132]: timothy.jordan@example.com
                - generic [ref=f2e133]: +1-909-916-6381
                - generic [ref=f2e134]: "Company: bd24a053-464f-42d2-9fc5-2f013cadde46"
```