# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-detail.spec.ts >> Contact Detail Tests >> contact detail has back link
- Location: tests/e2e/contacts/contact-detail.spec.ts:60:3

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
            - 'link "Margaret King margaret.king@example.com +1-464-582-9519 Company: 60b941c6-e3fc-47a6-8db7-076694b82721" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/e1faf65a-657c-4fde-8919-2f60a826f2ac
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Margaret King
                - generic [ref=f2e77]: margaret.king@example.com
                - generic [ref=f2e78]: +1-464-582-9519
                - generic [ref=f2e79]: "Company: 60b941c6-e3fc-47a6-8db7-076694b82721"
          - listitem [ref=f2e80]:
            - 'link "Barbara Wilson barbara.wilson@example.com +1-607-230-5385 Company: 18344433-2e17-4672-aad9-e56a25459fe7" [ref=f2e81] [cursor=pointer]':
              - /url: /contacts/cff408d6-1870-489f-8815-7bcb412a00ba
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: Barbara Wilson
                - generic [ref=f2e84]: barbara.wilson@example.com
                - generic [ref=f2e85]: +1-607-230-5385
                - generic [ref=f2e86]: "Company: 18344433-2e17-4672-aad9-e56a25459fe7"
          - listitem [ref=f2e87]:
            - link "Margaret Martinez margaret.martinez@example.com +1-628-514-3736" [ref=f2e88] [cursor=pointer]:
              - /url: /contacts/ae30f684-b76e-44d4-995a-14a787ca4483
              - generic [ref=f2e89]:
                - generic [ref=f2e90]: Margaret Martinez
                - generic [ref=f2e91]: margaret.martinez@example.com
                - generic [ref=f2e92]: +1-628-514-3736
          - listitem [ref=f2e93]:
            - link "Dennis Morgan dennis.morgan@example.com +1-211-658-3395" [ref=f2e94] [cursor=pointer]:
              - /url: /contacts/070228d7-4f1c-4257-847e-d4c9630ed1a6
              - generic [ref=f2e95]:
                - generic [ref=f2e96]: Dennis Morgan
                - generic [ref=f2e97]: dennis.morgan@example.com
                - generic [ref=f2e98]: +1-211-658-3395
          - listitem [ref=f2e99]:
            - 'link "Eleanor Morgan eleanor.morgan@example.com +1-263-622-1611 Company: a665d937-7e01-4a51-a66f-2e49e6daf5cb" [ref=f2e100] [cursor=pointer]':
              - /url: /contacts/ee90304a-c54d-4e84-b02c-724672099107
              - generic [ref=f2e101]:
                - generic [ref=f2e102]: Eleanor Morgan
                - generic [ref=f2e103]: eleanor.morgan@example.com
                - generic [ref=f2e104]: +1-263-622-1611
                - generic [ref=f2e105]: "Company: a665d937-7e01-4a51-a66f-2e49e6daf5cb"
          - listitem [ref=f2e106]:
            - link "Diane Hunter diane.hunter@example.com +1-269-658-4448" [ref=f2e107] [cursor=pointer]:
              - /url: /contacts/603871fb-8249-437b-87c0-67c33c87f2ca
              - generic [ref=f2e108]:
                - generic [ref=f2e109]: Diane Hunter
                - generic [ref=f2e110]: diane.hunter@example.com
                - generic [ref=f2e111]: +1-269-658-4448
          - listitem [ref=f2e112]:
            - 'link "Mary Harvey mary.harvey@example.com +1-806-449-5197 Company: c8907bfd-eba9-44df-83b7-1f6db303a742" [ref=f2e113] [cursor=pointer]':
              - /url: /contacts/f2aa0215-4938-4031-bbb5-3e7dcf3e08ea
              - generic [ref=f2e114]:
                - generic [ref=f2e115]: Mary Harvey
                - generic [ref=f2e116]: mary.harvey@example.com
                - generic [ref=f2e117]: +1-806-449-5197
                - generic [ref=f2e118]: "Company: c8907bfd-eba9-44df-83b7-1f6db303a742"
          - listitem [ref=f2e119]:
            - 'link "Douglas Hayes douglas.hayes@example.com +1-305-454-1067 Company: a868cea6-5472-4254-a114-a64e185bbbbe" [ref=f2e120] [cursor=pointer]':
              - /url: /contacts/3378157e-1185-4813-8ac3-e84e4398d0d9
              - generic [ref=f2e121]:
                - generic [ref=f2e122]: Douglas Hayes
                - generic [ref=f2e123]: douglas.hayes@example.com
                - generic [ref=f2e124]: +1-305-454-1067
                - generic [ref=f2e125]: "Company: a868cea6-5472-4254-a114-a64e185bbbbe"
          - listitem [ref=f2e126]:
            - 'link "Jason Hayes jason.hayes@example.com +1-232-283-1453 Company: 13b39083-8386-42f4-bcc0-b2799edef1de" [ref=f2e127] [cursor=pointer]':
              - /url: /contacts/caa3a751-b42d-4afc-87ab-faaa78584ce3
              - generic [ref=f2e128]:
                - generic [ref=f2e129]: Jason Hayes
                - generic [ref=f2e130]: jason.hayes@example.com
                - generic [ref=f2e131]: +1-232-283-1453
                - generic [ref=f2e132]: "Company: 13b39083-8386-42f4-bcc0-b2799edef1de"
          - listitem [ref=f2e133]:
            - 'link "Charles Harrison charles.harrison@example.com +1-410-235-8559 Company: 02ddb7dd-2421-473b-8964-34e14f1b1ce8" [ref=f2e134] [cursor=pointer]':
              - /url: /contacts/c01b706c-c41f-4cf2-8fdd-2c5a2fb31582
              - generic [ref=f2e135]:
                - generic [ref=f2e136]: Charles Harrison
                - generic [ref=f2e137]: charles.harrison@example.com
                - generic [ref=f2e138]: +1-410-235-8559
                - generic [ref=f2e139]: "Company: 02ddb7dd-2421-473b-8964-34e14f1b1ce8"
```