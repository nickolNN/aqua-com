# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-detail.spec.ts >> Company Detail Tests >> company detail displays company industry
- Location: tests/e2e/companies/company-detail.spec.ts:27:3

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
          - heading "Companies" [level=1] [ref=f2e64]
          - link "Create Company" [ref=f2e65] [cursor=pointer]:
            - /url: /companies/new
        - generic [ref=f2e66]:
          - textbox "Search companies..." [ref=f2e67]
          - button "Quick Add" [ref=f2e69]
        - list [ref=f2e72]:
          - listitem [ref=f2e73]:
            - link "Rapid Labs Education 613 Pine 636, Springfield 7925 www.rapidlabs.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/b9ecf83d-485c-402a-8088-f36bbd5bee59
              - generic [ref=f2e75]:
                - text: Rapid Labs
                - generic [ref=f2e76]: Education
                - generic [ref=f2e77]: 613 Pine 636, Springfield 7925
                - generic [ref=f2e78]: www.rapidlabs.com
          - listitem [ref=f2e79]:
            - link "Global Solutions Retail 900 First 289, Arlington 6938 www.globalsolutions.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/d8756f3d-de8e-4897-8412-260d897c0a3e
              - generic [ref=f2e81]:
                - text: Global Solutions
                - generic [ref=f2e82]: Retail
                - generic [ref=f2e83]: 900 First 289, Arlington 6938
                - generic [ref=f2e84]: www.globalsolutions.com
          - listitem [ref=f2e85]:
            - link "Prime Ventures Retail 254 Market 374, Salem 4308 www.primeventures.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/7461b932-a88e-430d-8643-5a46a9f4daf9
              - generic [ref=f2e87]:
                - text: Prime Ventures
                - generic [ref=f2e88]: Retail
                - generic [ref=f2e89]: 254 Market 374, Salem 4308
                - generic [ref=f2e90]: www.primeventures.com
          - listitem [ref=f2e91]:
            - link "Prime Systems Manufacturing 119 Pine 592, Portland 8032 www.primesystems.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/f960998a-0e78-4b3b-9ee2-134f2e5e01db
              - generic [ref=f2e93]:
                - text: Prime Systems
                - generic [ref=f2e94]: Manufacturing
                - generic [ref=f2e95]: 119 Pine 592, Portland 8032
                - generic [ref=f2e96]: www.primesystems.com
          - listitem [ref=f2e97]:
            - link "Prime Solutions Manufacturing 877 Market 525, Arlington 9198 www.primesolutions.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/c34112d1-7d7b-496c-b783-11152aad18c3
              - generic [ref=f2e99]:
                - text: Prime Solutions
                - generic [ref=f2e100]: Manufacturing
                - generic [ref=f2e101]: 877 Market 525, Arlington 9198
                - generic [ref=f2e102]: www.primesolutions.com
          - listitem [ref=f2e103]:
            - link "Next Solutions Media 420 Broadway 282, Madison 1484 www.nextsolutions.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/dc31e0c7-107b-43b9-8275-0fe2815f76e5
              - generic [ref=f2e105]:
                - text: Next Solutions
                - generic [ref=f2e106]: Media
                - generic [ref=f2e107]: 420 Broadway 282, Madison 1484
                - generic [ref=f2e108]: www.nextsolutions.com
          - listitem [ref=f2e109]:
            - link "Rapid Labs Technology 148 Market 541, Arlington 1261 www.rapidlabs.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/298dc964-0dec-45fa-af21-50275a737b4a
              - generic [ref=f2e111]:
                - text: Rapid Labs
                - generic [ref=f2e112]: Technology
                - generic [ref=f2e113]: 148 Market 541, Arlington 1261
                - generic [ref=f2e114]: www.rapidlabs.com
          - listitem [ref=f2e115]:
            - link "Next Group Manufacturing 479 Elm 386, Madison 9390 www.nextgroup.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/79a1f52b-4306-451c-bd4a-81933f190d18
              - generic [ref=f2e117]:
                - text: Next Group
                - generic [ref=f2e118]: Manufacturing
                - generic [ref=f2e119]: 479 Elm 386, Madison 9390
                - generic [ref=f2e120]: www.nextgroup.com
          - listitem [ref=f2e121]:
            - link "Alpha Partners Real Estate 542 First 509, Arlington 9037 www.alphapartners.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/3b311852-d355-401a-b104-63466dff0bb1
              - generic [ref=f2e123]:
                - text: Alpha Partners
                - generic [ref=f2e124]: Real Estate
                - generic [ref=f2e125]: 542 First 509, Arlington 9037
                - generic [ref=f2e126]: www.alphapartners.com
          - listitem [ref=f2e127]:
            - link "Rapid Systems Telecommunications 868 Pine 130, Salem 7708 www.rapidsystems.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/e44aa646-3453-4224-ae33-a47211892afb
              - generic [ref=f2e129]:
                - text: Rapid Systems
                - generic [ref=f2e130]: Telecommunications
                - generic [ref=f2e131]: 868 Pine 130, Salem 7708
                - generic [ref=f2e132]: www.rapidsystems.com
```