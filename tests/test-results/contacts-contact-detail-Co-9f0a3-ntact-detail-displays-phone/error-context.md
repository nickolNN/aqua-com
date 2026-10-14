# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-detail.spec.ts >> Contact Detail Tests >> contact detail displays phone
- Location: tests/e2e/contacts/contact-detail.spec.ts:37:3

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
            - link "Timothy Villa timothy.villa@example.com +1-347-718-9453" [ref=f2e74] [cursor=pointer]:
              - /url: /contacts/0767d53c-7ccc-4728-ab59-3e0d65b6db12
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Timothy Villa
                - generic [ref=f2e77]: timothy.villa@example.com
                - generic [ref=f2e78]: +1-347-718-9453
          - listitem [ref=f2e79]:
            - 'link "Barbara Morgan barbara.morgan@example.com +1-925-620-7066 Company: 94bbf34b-4e07-4897-898a-80e3e393ffbc" [ref=f2e80] [cursor=pointer]':
              - /url: /contacts/322509ba-cf16-472c-b2e7-a78c3cedabd5
              - generic [ref=f2e81]:
                - generic [ref=f2e82]: Barbara Morgan
                - generic [ref=f2e83]: barbara.morgan@example.com
                - generic [ref=f2e84]: +1-925-620-7066
                - generic [ref=f2e85]: "Company: 94bbf34b-4e07-4897-898a-80e3e393ffbc"
          - listitem [ref=f2e86]:
            - link "Andrew Hunter andrew.hunter@example.com +1-888-393-7101" [ref=f2e87] [cursor=pointer]:
              - /url: /contacts/47a2d46f-e5e6-4600-ab1f-c240f77ed0af
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: Andrew Hunter
                - generic [ref=f2e90]: andrew.hunter@example.com
                - generic [ref=f2e91]: +1-888-393-7101
          - listitem [ref=f2e92]:
            - 'link "Robert Diaz robert.diaz@example.com +1-806-216-9066 Company: 4883d23a-4581-43d9-ac84-33375803ccd3" [ref=f2e93] [cursor=pointer]':
              - /url: /contacts/12989c5d-cdc3-42c8-a736-7c292f116ab5
              - generic [ref=f2e94]:
                - generic [ref=f2e95]: Robert Diaz
                - generic [ref=f2e96]: robert.diaz@example.com
                - generic [ref=f2e97]: +1-806-216-9066
                - generic [ref=f2e98]: "Company: 4883d23a-4581-43d9-ac84-33375803ccd3"
          - listitem [ref=f2e99]:
            - 'link "Larry Wells larry.wells@example.com +1-366-647-1251 Company: b8c5c59e-56b7-4f91-9372-acdbe4940242" [ref=f2e100] [cursor=pointer]':
              - /url: /contacts/7f3555a1-4cbe-482b-8659-52ae00275ffb
              - generic [ref=f2e101]:
                - generic [ref=f2e102]: Larry Wells
                - generic [ref=f2e103]: larry.wells@example.com
                - generic [ref=f2e104]: +1-366-647-1251
                - generic [ref=f2e105]: "Company: b8c5c59e-56b7-4f91-9372-acdbe4940242"
          - listitem [ref=f2e106]:
            - link "Dennis Diaz dennis.diaz@example.com +1-378-627-3006" [ref=f2e107] [cursor=pointer]:
              - /url: /contacts/336cc82e-c128-43e3-ae7f-ba1acca05f2e
              - generic [ref=f2e108]:
                - generic [ref=f2e109]: Dennis Diaz
                - generic [ref=f2e110]: dennis.diaz@example.com
                - generic [ref=f2e111]: +1-378-627-3006
          - listitem [ref=f2e112]:
            - link "Joshua Thomas joshua.thomas@example.com +1-913-348-3314" [ref=f2e113] [cursor=pointer]:
              - /url: /contacts/903433e1-4a7e-44f8-8b21-aa0434871b2c
              - generic [ref=f2e114]:
                - generic [ref=f2e115]: Joshua Thomas
                - generic [ref=f2e116]: joshua.thomas@example.com
                - generic [ref=f2e117]: +1-913-348-3314
          - listitem [ref=f2e118]:
            - link "Amber Hart amber.hart@example.com +1-366-533-2833" [ref=f2e119] [cursor=pointer]:
              - /url: /contacts/0ea0e8e9-e3af-4cc8-a8f4-1b3104a9b776
              - generic [ref=f2e120]:
                - generic [ref=f2e121]: Amber Hart
                - generic [ref=f2e122]: amber.hart@example.com
                - generic [ref=f2e123]: +1-366-533-2833
          - listitem [ref=f2e124]:
            - link "Samantha Garcia samantha.garcia@example.com +1-676-906-6944" [ref=f2e125] [cursor=pointer]:
              - /url: /contacts/79232344-4291-42af-8c24-b55d94ec47d6
              - generic [ref=f2e126]:
                - generic [ref=f2e127]: Samantha Garcia
                - generic [ref=f2e128]: samantha.garcia@example.com
                - generic [ref=f2e129]: +1-676-906-6944
          - listitem [ref=f2e130]:
            - link "John Reed john.reed@example.com +1-256-903-4885" [ref=f2e131] [cursor=pointer]:
              - /url: /contacts/38dd6c4d-cbc6-480e-accc-8e8774757f1f
              - generic [ref=f2e132]:
                - generic [ref=f2e133]: John Reed
                - generic [ref=f2e134]: john.reed@example.com
                - generic [ref=f2e135]: +1-256-903-4885
```