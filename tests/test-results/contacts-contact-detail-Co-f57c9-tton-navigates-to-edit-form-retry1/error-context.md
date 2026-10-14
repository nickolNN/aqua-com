# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-detail.spec.ts >> Contact Detail Tests >> edit contact button navigates to edit form
- Location: tests/e2e/contacts/contact-detail.spec.ts:47:3

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
            - link "Stephanie Morris stephanie.morris@example.com +1-557-571-8035" [ref=f2e74] [cursor=pointer]:
              - /url: /contacts/d997b1ac-0f10-4405-ab7c-5a19ca9b186b
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Stephanie Morris
                - generic [ref=f2e77]: stephanie.morris@example.com
                - generic [ref=f2e78]: +1-557-571-8035
          - listitem [ref=f2e79]:
            - link "Betty Murphy betty.murphy@example.com +1-716-280-1173" [ref=f2e80] [cursor=pointer]:
              - /url: /contacts/c1060060-e948-452e-8ad5-ed1108eeea87
              - generic [ref=f2e81]:
                - generic [ref=f2e82]: Betty Murphy
                - generic [ref=f2e83]: betty.murphy@example.com
                - generic [ref=f2e84]: +1-716-280-1173
          - listitem [ref=f2e85]:
            - 'link "Susan Hayes susan.hayes@example.com +1-375-570-2400 Company: 1dd77fb0-fae7-4c27-8259-d778277f8516" [ref=f2e86] [cursor=pointer]':
              - /url: /contacts/35e216fc-cb1f-4c79-808e-01b00e82863a
              - generic [ref=f2e87]:
                - generic [ref=f2e88]: Susan Hayes
                - generic [ref=f2e89]: susan.hayes@example.com
                - generic [ref=f2e90]: +1-375-570-2400
                - generic [ref=f2e91]: "Company: 1dd77fb0-fae7-4c27-8259-d778277f8516"
          - listitem [ref=f2e92]:
            - 'link "Donald Hernandez donald.hernandez@example.com +1-212-258-9175 Company: 13844c3c-4368-49ab-96d0-9e4f74813d23" [ref=f2e93] [cursor=pointer]':
              - /url: /contacts/17fc89e9-9caf-4ca3-8336-41d23eaa8b79
              - generic [ref=f2e94]:
                - generic [ref=f2e95]: Donald Hernandez
                - generic [ref=f2e96]: donald.hernandez@example.com
                - generic [ref=f2e97]: +1-212-258-9175
                - generic [ref=f2e98]: "Company: 13844c3c-4368-49ab-96d0-9e4f74813d23"
          - listitem [ref=f2e99]:
            - link "Andrew Wells andrew.wells@example.com +1-767-642-4778" [ref=f2e100] [cursor=pointer]:
              - /url: /contacts/c23ea54c-1ed3-4a3a-8683-e99644fb3100
              - generic [ref=f2e101]:
                - generic [ref=f2e102]: Andrew Wells
                - generic [ref=f2e103]: andrew.wells@example.com
                - generic [ref=f2e104]: +1-767-642-4778
          - listitem [ref=f2e105]:
            - 'link "Emily Scott emily.scott@example.com +1-221-402-3535 Company: 25ad1508-2736-48b5-b481-59ed77efdec7" [ref=f2e106] [cursor=pointer]':
              - /url: /contacts/d9550643-7d87-417c-8097-420a058cd23a
              - generic [ref=f2e107]:
                - generic [ref=f2e108]: Emily Scott
                - generic [ref=f2e109]: emily.scott@example.com
                - generic [ref=f2e110]: +1-221-402-3535
                - generic [ref=f2e111]: "Company: 25ad1508-2736-48b5-b481-59ed77efdec7"
          - listitem [ref=f2e112]:
            - 'link "Christopher Harrison christopher.harrison@example.com +1-727-593-1351 Company: 43deae27-b086-44e8-8dc4-048e3cd1e94d" [ref=f2e113] [cursor=pointer]':
              - /url: /contacts/9ca49257-d3d4-4723-ada7-d0adf9e85ea8
              - generic [ref=f2e114]:
                - generic [ref=f2e115]: Christopher Harrison
                - generic [ref=f2e116]: christopher.harrison@example.com
                - generic [ref=f2e117]: +1-727-593-1351
                - generic [ref=f2e118]: "Company: 43deae27-b086-44e8-8dc4-048e3cd1e94d"
          - listitem [ref=f2e119]:
            - link "Karen Wilson karen.wilson@example.com +1-936-263-3288" [ref=f2e120] [cursor=pointer]:
              - /url: /contacts/43760ac9-517f-4b37-a05d-d6090ef9b2c6
              - generic [ref=f2e121]:
                - generic [ref=f2e122]: Karen Wilson
                - generic [ref=f2e123]: karen.wilson@example.com
                - generic [ref=f2e124]: +1-936-263-3288
          - listitem [ref=f2e125]:
            - link "David Diaz david.diaz@example.com +1-477-928-1303" [ref=f2e126] [cursor=pointer]:
              - /url: /contacts/9eeb8304-8114-4d6f-8dd5-007d7dd2e4b4
              - generic [ref=f2e127]:
                - generic [ref=f2e128]: David Diaz
                - generic [ref=f2e129]: david.diaz@example.com
                - generic [ref=f2e130]: +1-477-928-1303
          - listitem [ref=f2e131]:
            - 'link "George Garcia george.garcia@example.com +1-339-810-4671 Company: 7de4babf-500e-41f9-93ad-897a91a7ec21" [ref=f2e132] [cursor=pointer]':
              - /url: /contacts/24f9dab5-129c-4d5c-8fbb-2b7a371cdb9c
              - generic [ref=f2e133]:
                - generic [ref=f2e134]: George Garcia
                - generic [ref=f2e135]: george.garcia@example.com
                - generic [ref=f2e136]: +1-339-810-4671
                - generic [ref=f2e137]: "Company: 7de4babf-500e-41f9-93ad-897a91a7ec21"
```