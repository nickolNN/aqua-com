# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-detail.spec.ts >> Contact Detail Tests >> contact detail displays email
- Location: tests/e2e/contacts/contact-detail.spec.ts:27:3

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
            - link "Amber Sullivan amber.sullivan@example.com +1-606-790-5571" [ref=f2e74] [cursor=pointer]:
              - /url: /contacts/6d0be07f-5203-49ab-be8b-40df52b9354c
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Amber Sullivan
                - generic [ref=f2e77]: amber.sullivan@example.com
                - generic [ref=f2e78]: +1-606-790-5571
          - listitem [ref=f2e79]:
            - 'link "Deborah Davis deborah.davis@example.com +1-990-377-4706 Company: 08d8c9d5-1c7e-4dbe-8e00-35a5f02adec3" [ref=f2e80] [cursor=pointer]':
              - /url: /contacts/2a0c576e-f5a6-4b0f-91c1-0efffe62e8cf
              - generic [ref=f2e81]:
                - generic [ref=f2e82]: Deborah Davis
                - generic [ref=f2e83]: deborah.davis@example.com
                - generic [ref=f2e84]: +1-990-377-4706
                - generic [ref=f2e85]: "Company: 08d8c9d5-1c7e-4dbe-8e00-35a5f02adec3"
          - listitem [ref=f2e86]:
            - 'link "Nancy Garcia nancy.garcia@example.com +1-222-511-5137 Company: be366590-475e-4463-b9e3-8387ee652dec" [ref=f2e87] [cursor=pointer]':
              - /url: /contacts/796a7a65-ea20-429a-86f8-a5d04f3094e0
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: Nancy Garcia
                - generic [ref=f2e90]: nancy.garcia@example.com
                - generic [ref=f2e91]: +1-222-511-5137
                - generic [ref=f2e92]: "Company: be366590-475e-4463-b9e3-8387ee652dec"
          - listitem [ref=f2e93]:
            - 'link "Henry Wells henry.wells@example.com +1-890-204-6230 Company: 6086ecf5-94b5-415c-9d0b-0ac3580ecdee" [ref=f2e94] [cursor=pointer]':
              - /url: /contacts/f42f3d49-3ed3-4161-b783-f781506fc38a
              - generic [ref=f2e95]:
                - generic [ref=f2e96]: Henry Wells
                - generic [ref=f2e97]: henry.wells@example.com
                - generic [ref=f2e98]: +1-890-204-6230
                - generic [ref=f2e99]: "Company: 6086ecf5-94b5-415c-9d0b-0ac3580ecdee"
          - listitem [ref=f2e100]:
            - 'link "Eleanor Burke eleanor.burke@example.com +1-541-441-9402 Company: 15f484b3-e9e7-44ce-bd60-c6f287e4300d" [ref=f2e101] [cursor=pointer]':
              - /url: /contacts/b9979367-4e21-44b2-a191-8ec7eb9d35c1
              - generic [ref=f2e102]:
                - generic [ref=f2e103]: Eleanor Burke
                - generic [ref=f2e104]: eleanor.burke@example.com
                - generic [ref=f2e105]: +1-541-441-9402
                - generic [ref=f2e106]: "Company: 15f484b3-e9e7-44ce-bd60-c6f287e4300d"
          - listitem [ref=f2e107]:
            - 'link "John Johnson john.johnson@example.com +1-774-906-6309 Company: 1096c2ef-773c-4b75-8b59-c5cdf72c8e76" [ref=f2e108] [cursor=pointer]':
              - /url: /contacts/1d5dede7-e8b8-44dc-b989-30425d2d1f81
              - generic [ref=f2e109]:
                - generic [ref=f2e110]: John Johnson
                - generic [ref=f2e111]: john.johnson@example.com
                - generic [ref=f2e112]: +1-774-906-6309
                - generic [ref=f2e113]: "Company: 1096c2ef-773c-4b75-8b59-c5cdf72c8e76"
          - listitem [ref=f2e114]:
            - link "Brian Hayes brian.hayes@example.com +1-949-242-6581" [ref=f2e115] [cursor=pointer]:
              - /url: /contacts/436be3d9-2363-4352-b984-47e0bd22ae51
              - generic [ref=f2e116]:
                - generic [ref=f2e117]: Brian Hayes
                - generic [ref=f2e118]: brian.hayes@example.com
                - generic [ref=f2e119]: +1-949-242-6581
          - listitem [ref=f2e120]:
            - link "Thomas Brown thomas.brown@example.com +1-781-539-3134" [ref=f2e121] [cursor=pointer]:
              - /url: /contacts/fe6c34d5-8f1a-45e7-80a4-52ee37b01d49
              - generic [ref=f2e122]:
                - generic [ref=f2e123]: Thomas Brown
                - generic [ref=f2e124]: thomas.brown@example.com
                - generic [ref=f2e125]: +1-781-539-3134
          - listitem [ref=f2e126]:
            - link "Melissa Lopez melissa.lopez@example.com +1-847-800-8790" [ref=f2e127] [cursor=pointer]:
              - /url: /contacts/a020252f-f66b-4b8c-8633-4ce27fd6e68d
              - generic [ref=f2e128]:
                - generic [ref=f2e129]: Melissa Lopez
                - generic [ref=f2e130]: melissa.lopez@example.com
                - generic [ref=f2e131]: +1-847-800-8790
          - listitem [ref=f2e132]:
            - link "Laura Ward laura.ward@example.com +1-443-245-4017" [ref=f2e133] [cursor=pointer]:
              - /url: /contacts/1dfeafb6-a0c3-4988-aa11-4c8b3955f3c0
              - generic [ref=f2e134]:
                - generic [ref=f2e135]: Laura Ward
                - generic [ref=f2e136]: laura.ward@example.com
                - generic [ref=f2e137]: +1-443-245-4017
```