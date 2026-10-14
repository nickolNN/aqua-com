# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-detail.spec.ts >> Company Detail Tests >> company detail view loads correctly
- Location: tests/e2e/companies/company-detail.spec.ts:9:3

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
            - link "Global Partners Technology 994 Market 427, Salem 7201 www.globalpartners.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/a6c41700-3afb-4a60-b422-8ddfb9d26182
              - generic [ref=f2e75]:
                - text: Global Partners
                - generic [ref=f2e76]: Technology
                - generic [ref=f2e77]: 994 Market 427, Salem 7201
                - generic [ref=f2e78]: www.globalpartners.com
          - listitem [ref=f2e79]:
            - link "Rapid Enterprises Media 879 Oak 84, Portland 6471 www.rapidenterprises.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/e4414fa4-c203-4097-8125-a626a580dc12
              - generic [ref=f2e81]:
                - text: Rapid Enterprises
                - generic [ref=f2e82]: Media
                - generic [ref=f2e83]: 879 Oak 84, Portland 6471
                - generic [ref=f2e84]: www.rapidenterprises.com
          - listitem [ref=f2e85]:
            - link "Alpha Solutions Media 279 Pine 10, Madison 6291 www.alphasolutions.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/caa1f9fd-075b-465f-87ef-ab8f389a25b8
              - generic [ref=f2e87]:
                - text: Alpha Solutions
                - generic [ref=f2e88]: Media
                - generic [ref=f2e89]: 279 Pine 10, Madison 6291
                - generic [ref=f2e90]: www.alphasolutions.com
          - listitem [ref=f2e91]:
            - link "Next Ventures Healthcare 742 Broadway 973, Arlington 7521 www.nextventures.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/c13f3642-95b7-4c30-afcc-e37bb2bea343
              - generic [ref=f2e93]:
                - text: Next Ventures
                - generic [ref=f2e94]: Healthcare
                - generic [ref=f2e95]: 742 Broadway 973, Arlington 7521
                - generic [ref=f2e96]: www.nextventures.com
          - listitem [ref=f2e97]:
            - link "Tech Holdings Retail 909 Main 363, Arlington 6436 www.techholdings.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/fa091d6a-d0f6-4b73-8ef9-95266f7ba695
              - generic [ref=f2e99]:
                - text: Tech Holdings
                - generic [ref=f2e100]: Retail
                - generic [ref=f2e101]: 909 Main 363, Arlington 6436
                - generic [ref=f2e102]: www.techholdings.com
          - listitem [ref=f2e103]:
            - link "Smart Holdings Education 272 Main 798, Arlington 2913 www.smartholdings.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/4234000b-ba49-4711-a53b-381e1a3571ef
              - generic [ref=f2e105]:
                - text: Smart Holdings
                - generic [ref=f2e106]: Education
                - generic [ref=f2e107]: 272 Main 798, Arlington 2913
                - generic [ref=f2e108]: www.smartholdings.com
          - listitem [ref=f2e109]:
            - link "Smart Enterprises Healthcare 196 Market 593, Portland 7610 www.smartenterprises.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/a998f306-9e69-48db-8969-5ec57225a57a
              - generic [ref=f2e111]:
                - text: Smart Enterprises
                - generic [ref=f2e112]: Healthcare
                - generic [ref=f2e113]: 196 Market 593, Portland 7610
                - generic [ref=f2e114]: www.smartenterprises.com
          - listitem [ref=f2e115]:
            - link "Digital Labs Finance 708 Broadway 826, Portland 9715 www.digitallabs.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/e881a641-3e2e-41ac-9d2b-8a3ef1c66af0
              - generic [ref=f2e117]:
                - text: Digital Labs
                - generic [ref=f2e118]: Finance
                - generic [ref=f2e119]: 708 Broadway 826, Portland 9715
                - generic [ref=f2e120]: www.digitallabs.com
          - listitem [ref=f2e121]:
            - link "Digital Labs Telecommunications 446 Elm 694, Springfield 5562 www.digitallabs.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/3e303054-b341-4732-8637-09c450d8d202
              - generic [ref=f2e123]:
                - text: Digital Labs
                - generic [ref=f2e124]: Telecommunications
                - generic [ref=f2e125]: 446 Elm 694, Springfield 5562
                - generic [ref=f2e126]: www.digitallabs.com
          - listitem [ref=f2e127]:
            - link "Smart Group Real Estate 344 Elm 160, Salem 2972 www.smartgroup.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/8d3177d9-1b20-4ab1-8f09-e1c2053384fb
              - generic [ref=f2e129]:
                - text: Smart Group
                - generic [ref=f2e130]: Real Estate
                - generic [ref=f2e131]: 344 Elm 160, Salem 2972
                - generic [ref=f2e132]: www.smartgroup.com
```