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
            - 'link "Kimberly Patterson kimberly.patterson@example.com +1-745-272-8137 Company: d9a604e3-b07e-4d80-b20a-fd10d9569125" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/64483811-4ade-4d01-ada6-2d9e239e28a8
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Kimberly Patterson
                - generic [ref=f2e77]: kimberly.patterson@example.com
                - generic [ref=f2e78]: +1-745-272-8137
                - generic [ref=f2e79]: "Company: d9a604e3-b07e-4d80-b20a-fd10d9569125"
          - listitem [ref=f2e80]:
            - link "Christopher Hayes christopher.hayes@example.com +1-800-971-3272" [ref=f2e81] [cursor=pointer]:
              - /url: /contacts/0291532a-68aa-46b3-bfc1-51998db44391
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: Christopher Hayes
                - generic [ref=f2e84]: christopher.hayes@example.com
                - generic [ref=f2e85]: +1-800-971-3272
          - listitem [ref=f2e86]:
            - link "David Ward david.ward@example.com +1-870-435-5672" [ref=f2e87] [cursor=pointer]:
              - /url: /contacts/89bd837f-cdbd-4c43-9860-c7f52f0bb321
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: David Ward
                - generic [ref=f2e90]: david.ward@example.com
                - generic [ref=f2e91]: +1-870-435-5672
          - listitem [ref=f2e92]:
            - link "Michael Jordan michael.jordan@example.com +1-400-638-1393" [ref=f2e93] [cursor=pointer]:
              - /url: /contacts/a38266fb-9f7d-45d3-b3a5-733c4051acab
              - generic [ref=f2e94]:
                - generic [ref=f2e95]: Michael Jordan
                - generic [ref=f2e96]: michael.jordan@example.com
                - generic [ref=f2e97]: +1-400-638-1393
          - listitem [ref=f2e98]:
            - link "Emily Hunter emily.hunter@example.com +1-718-385-4734" [ref=f2e99] [cursor=pointer]:
              - /url: /contacts/06c9a5d7-fb5a-4371-9146-359e4834bacd
              - generic [ref=f2e100]:
                - generic [ref=f2e101]: Emily Hunter
                - generic [ref=f2e102]: emily.hunter@example.com
                - generic [ref=f2e103]: +1-718-385-4734
          - listitem [ref=f2e104]:
            - 'link "Robert Diaz robert.diaz@example.com +1-894-765-3944 Company: f7ce78e7-e54d-466c-9f46-d0e38415c127" [ref=f2e105] [cursor=pointer]':
              - /url: /contacts/eed89eaf-74a2-495a-bdb4-7ebf74a01fca
              - generic [ref=f2e106]:
                - generic [ref=f2e107]: Robert Diaz
                - generic [ref=f2e108]: robert.diaz@example.com
                - generic [ref=f2e109]: +1-894-765-3944
                - generic [ref=f2e110]: "Company: f7ce78e7-e54d-466c-9f46-d0e38415c127"
          - listitem [ref=f2e111]:
            - 'link "Patricia Baker patricia.baker@example.com +1-501-346-5541 Company: ccd07bbe-5d98-4db3-9dd1-21c8b888aded" [ref=f2e112] [cursor=pointer]':
              - /url: /contacts/3f36ae47-107b-4df0-99cf-88a1bf04b3ee
              - generic [ref=f2e113]:
                - generic [ref=f2e114]: Patricia Baker
                - generic [ref=f2e115]: patricia.baker@example.com
                - generic [ref=f2e116]: +1-501-346-5541
                - generic [ref=f2e117]: "Company: ccd07bbe-5d98-4db3-9dd1-21c8b888aded"
          - listitem [ref=f2e118]:
            - 'link "James Perez james.perez@example.com +1-215-211-7621 Company: 525c3a32-5eb0-4997-8c36-99498e3cd670" [ref=f2e119] [cursor=pointer]':
              - /url: /contacts/6b3c3e69-1dad-47de-9597-d62033e9ad2c
              - generic [ref=f2e120]:
                - generic [ref=f2e121]: James Perez
                - generic [ref=f2e122]: james.perez@example.com
                - generic [ref=f2e123]: +1-215-211-7621
                - generic [ref=f2e124]: "Company: 525c3a32-5eb0-4997-8c36-99498e3cd670"
          - listitem [ref=f2e125]:
            - link "Maria Hart maria.hart@example.com +1-789-469-6552" [ref=f2e126] [cursor=pointer]:
              - /url: /contacts/a3108367-47b0-4f30-b43f-b2fce2f6edd5
              - generic [ref=f2e127]:
                - generic [ref=f2e128]: Maria Hart
                - generic [ref=f2e129]: maria.hart@example.com
                - generic [ref=f2e130]: +1-789-469-6552
          - listitem [ref=f2e131]:
            - link "Charles Brooks charles.brooks@example.com +1-369-454-3970" [ref=f2e132] [cursor=pointer]:
              - /url: /contacts/735e9a0e-8bd1-4795-a552-a94d3af7451c
              - generic [ref=f2e133]:
                - generic [ref=f2e134]: Charles Brooks
                - generic [ref=f2e135]: charles.brooks@example.com
                - generic [ref=f2e136]: +1-369-454-3970
```