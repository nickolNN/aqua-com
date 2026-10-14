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
            - link "Alpha Enterprises Media 565 Pine 132, Madison 7967 www.alphaenterprises.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/603971f2-f042-488d-86d4-5c79b08f19d7
              - generic [ref=f2e75]:
                - text: Alpha Enterprises
                - generic [ref=f2e76]: Media
                - generic [ref=f2e77]: 565 Pine 132, Madison 7967
                - generic [ref=f2e78]: www.alphaenterprises.com
          - listitem [ref=f2e79]:
            - link "Alpha Partners Consulting 807 Oak 314, Arlington 3273 www.alphapartners.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/f91efb82-e987-413e-8dcd-43f3542a617d
              - generic [ref=f2e81]:
                - text: Alpha Partners
                - generic [ref=f2e82]: Consulting
                - generic [ref=f2e83]: 807 Oak 314, Arlington 3273
                - generic [ref=f2e84]: www.alphapartners.com
          - listitem [ref=f2e85]:
            - link "Global Holdings Telecommunications 205 Market 622, Springfield 2399 www.globalholdings.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/ac7160a5-9b70-4161-88d1-1bd19f8c6a2c
              - generic [ref=f2e87]:
                - text: Global Holdings
                - generic [ref=f2e88]: Telecommunications
                - generic [ref=f2e89]: 205 Market 622, Springfield 2399
                - generic [ref=f2e90]: www.globalholdings.com
          - listitem [ref=f2e91]:
            - link "Tech Systems Healthcare 981 Market 941, Madison 2232 www.techsystems.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/1494e8a4-8755-4ae4-b189-a43259550d26
              - generic [ref=f2e93]:
                - text: Tech Systems
                - generic [ref=f2e94]: Healthcare
                - generic [ref=f2e95]: 981 Market 941, Madison 2232
                - generic [ref=f2e96]: www.techsystems.com
          - listitem [ref=f2e97]:
            - link "Global Systems Healthcare 915 First 342, Springfield 8376 www.globalsystems.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/a6fcfa11-ded1-4895-9c02-bb5986fc44b5
              - generic [ref=f2e99]:
                - text: Global Systems
                - generic [ref=f2e100]: Healthcare
                - generic [ref=f2e101]: 915 First 342, Springfield 8376
                - generic [ref=f2e102]: www.globalsystems.com
          - listitem [ref=f2e103]:
            - link "Alpha Systems Healthcare 692 Pine 705, Springfield 7694 www.alphasystems.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/39c2b776-e66e-4687-abdf-1806016681cb
              - generic [ref=f2e105]:
                - text: Alpha Systems
                - generic [ref=f2e106]: Healthcare
                - generic [ref=f2e107]: 692 Pine 705, Springfield 7694
                - generic [ref=f2e108]: www.alphasystems.com
          - listitem [ref=f2e109]:
            - link "Global Solutions Healthcare 236 Main 264, Springfield 9344 www.globalsolutions.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/e109a1d8-ffd7-4663-b854-71c1579ad452
              - generic [ref=f2e111]:
                - text: Global Solutions
                - generic [ref=f2e112]: Healthcare
                - generic [ref=f2e113]: 236 Main 264, Springfield 9344
                - generic [ref=f2e114]: www.globalsolutions.com
          - listitem [ref=f2e115]:
            - link "Alpha Labs Technology 843 First 138, Madison 7702 www.alphalabs.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/934a59a6-25d6-4824-b775-d76e6c1be3f0
              - generic [ref=f2e117]:
                - text: Alpha Labs
                - generic [ref=f2e118]: Technology
                - generic [ref=f2e119]: 843 First 138, Madison 7702
                - generic [ref=f2e120]: www.alphalabs.com
          - listitem [ref=f2e121]:
            - link "Smart Ventures Real Estate 666 Main 470, Springfield 8321 www.smartventures.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/f8a24268-daa1-4136-ab82-e347b07d75df
              - generic [ref=f2e123]:
                - text: Smart Ventures
                - generic [ref=f2e124]: Real Estate
                - generic [ref=f2e125]: 666 Main 470, Springfield 8321
                - generic [ref=f2e126]: www.smartventures.com
          - listitem [ref=f2e127]:
            - link "Smart Labs Education 907 Pine 779, Madison 7149 www.smartlabs.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/206766c6-036c-4f5d-83d4-4aa7666d1385
              - generic [ref=f2e129]:
                - text: Smart Labs
                - generic [ref=f2e130]: Education
                - generic [ref=f2e131]: 907 Pine 779, Madison 7149
                - generic [ref=f2e132]: www.smartlabs.com
```