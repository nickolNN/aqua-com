# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-detail.spec.ts >> Company Detail Tests >> company detail has back link
- Location: tests/e2e/companies/company-detail.spec.ts:70:3

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
            - link "Digital Group Manufacturing 274 Oak 88, Arlington 7203 www.digitalgroup.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/3cd9a78f-bfa2-449b-9877-91f86af2b5c0
              - generic [ref=f2e75]:
                - text: Digital Group
                - generic [ref=f2e76]: Manufacturing
                - generic [ref=f2e77]: 274 Oak 88, Arlington 7203
                - generic [ref=f2e78]: www.digitalgroup.com
          - listitem [ref=f2e79]:
            - link "Alpha Group Technology 250 Oak 673, Madison 1886 www.alphagroup.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/8ca7d77d-0b67-4afc-9356-07e1a81c1cbb
              - generic [ref=f2e81]:
                - text: Alpha Group
                - generic [ref=f2e82]: Technology
                - generic [ref=f2e83]: 250 Oak 673, Madison 1886
                - generic [ref=f2e84]: www.alphagroup.com
          - listitem [ref=f2e85]:
            - link "Alpha Partners Healthcare 79 Main 185, Springfield 9972 www.alphapartners.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/35d01f31-0271-470a-90d5-aaefc0105f3a
              - generic [ref=f2e87]:
                - text: Alpha Partners
                - generic [ref=f2e88]: Healthcare
                - generic [ref=f2e89]: 79 Main 185, Springfield 9972
                - generic [ref=f2e90]: www.alphapartners.com
          - listitem [ref=f2e91]:
            - link "Smart Labs Consulting 489 Elm 507, Salem 4475 www.smartlabs.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/b01b4bcb-3892-4f45-9e83-f069449d1b9d
              - generic [ref=f2e93]:
                - text: Smart Labs
                - generic [ref=f2e94]: Consulting
                - generic [ref=f2e95]: 489 Elm 507, Salem 4475
                - generic [ref=f2e96]: www.smartlabs.com
          - listitem [ref=f2e97]:
            - link "Next Holdings Telecommunications 820 Oak 989, Portland 3169 www.nextholdings.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/90dc126e-9ac0-42bf-9fd7-dbce0c1b2415
              - generic [ref=f2e99]:
                - text: Next Holdings
                - generic [ref=f2e100]: Telecommunications
                - generic [ref=f2e101]: 820 Oak 989, Portland 3169
                - generic [ref=f2e102]: www.nextholdings.com
          - listitem [ref=f2e103]:
            - link "Next Ventures Finance 729 Main 152, Springfield 4318 www.nextventures.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/db6fd237-3ef2-445a-8e0e-b8e4bee94091
              - generic [ref=f2e105]:
                - text: Next Ventures
                - generic [ref=f2e106]: Finance
                - generic [ref=f2e107]: 729 Main 152, Springfield 4318
                - generic [ref=f2e108]: www.nextventures.com
          - listitem [ref=f2e109]:
            - link "Global Holdings Consulting 395 Market 108, Arlington 5746 www.globalholdings.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/6bc758ed-77d3-4b4d-a9bb-c576fc70f0b7
              - generic [ref=f2e111]:
                - text: Global Holdings
                - generic [ref=f2e112]: Consulting
                - generic [ref=f2e113]: 395 Market 108, Arlington 5746
                - generic [ref=f2e114]: www.globalholdings.com
          - listitem [ref=f2e115]:
            - link "Global Enterprises Consulting 397 First 477, Portland 8664 www.globalenterprises.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/e7026b2e-1295-4989-a930-1bd992600ca3
              - generic [ref=f2e117]:
                - text: Global Enterprises
                - generic [ref=f2e118]: Consulting
                - generic [ref=f2e119]: 397 First 477, Portland 8664
                - generic [ref=f2e120]: www.globalenterprises.com
          - listitem [ref=f2e121]:
            - link "Digital Enterprises Education 560 Pine 805, Portland 6287 www.digitalenterprises.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/d9b2e9df-a4f0-42f9-8548-e8186d184b07
              - generic [ref=f2e123]:
                - text: Digital Enterprises
                - generic [ref=f2e124]: Education
                - generic [ref=f2e125]: 560 Pine 805, Portland 6287
                - generic [ref=f2e126]: www.digitalenterprises.com
          - listitem [ref=f2e127]:
            - link "Next Enterprises Finance 600 Pine 655, Arlington 4336 www.nextenterprises.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/abafd5a4-9ae9-4157-9ae6-017905594828
              - generic [ref=f2e129]:
                - text: Next Enterprises
                - generic [ref=f2e130]: Finance
                - generic [ref=f2e131]: 600 Pine 655, Arlington 4336
                - generic [ref=f2e132]: www.nextenterprises.com
```