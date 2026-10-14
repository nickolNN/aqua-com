# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-list.spec.ts >> Company List Tests >> company card is clickable
- Location: tests/e2e/companies/company-list.spec.ts:37:3

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
            - link "Global Systems Finance 151 Pine 800, Arlington 3872 www.globalsystems.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/42971b99-ef18-4321-b4b1-97ad66811df7
              - generic [ref=f2e75]:
                - text: Global Systems
                - generic [ref=f2e76]: Finance
                - generic [ref=f2e77]: 151 Pine 800, Arlington 3872
                - generic [ref=f2e78]: www.globalsystems.com
          - listitem [ref=f2e79]:
            - link "Smart Solutions Retail 176 Broadway 27, Madison 2854 www.smartsolutions.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/e4b68393-2a64-4b88-b49f-0218885e3a8a
              - generic [ref=f2e81]:
                - text: Smart Solutions
                - generic [ref=f2e82]: Retail
                - generic [ref=f2e83]: 176 Broadway 27, Madison 2854
                - generic [ref=f2e84]: www.smartsolutions.com
          - listitem [ref=f2e85]:
            - link "Alpha Enterprises Retail 766 First 355, Arlington 4624 www.alphaenterprises.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/432b65f8-347f-4a38-876a-d81e778220ee
              - generic [ref=f2e87]:
                - text: Alpha Enterprises
                - generic [ref=f2e88]: Retail
                - generic [ref=f2e89]: 766 First 355, Arlington 4624
                - generic [ref=f2e90]: www.alphaenterprises.com
          - listitem [ref=f2e91]:
            - link "Next Holdings Real Estate 678 Oak 934, Madison 5597 www.nextholdings.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/8f6fd2b8-bad0-4083-80f8-ff634b11aa70
              - generic [ref=f2e93]:
                - text: Next Holdings
                - generic [ref=f2e94]: Real Estate
                - generic [ref=f2e95]: 678 Oak 934, Madison 5597
                - generic [ref=f2e96]: www.nextholdings.com
          - listitem [ref=f2e97]:
            - link "Global Solutions Retail 530 Elm 81, Madison 3818 www.globalsolutions.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/5fe240ee-df8a-4c2c-91b4-d1faa6520e54
              - generic [ref=f2e99]:
                - text: Global Solutions
                - generic [ref=f2e100]: Retail
                - generic [ref=f2e101]: 530 Elm 81, Madison 3818
                - generic [ref=f2e102]: www.globalsolutions.com
          - listitem [ref=f2e103]:
            - link "Tech Enterprises Healthcare 991 Elm 537, Springfield 3467 www.techenterprises.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/e6ca6f9f-4700-45b4-93b5-39474750a1a8
              - generic [ref=f2e105]:
                - text: Tech Enterprises
                - generic [ref=f2e106]: Healthcare
                - generic [ref=f2e107]: 991 Elm 537, Springfield 3467
                - generic [ref=f2e108]: www.techenterprises.com
          - listitem [ref=f2e109]:
            - link "Rapid Systems Consulting 229 Broadway 416, Arlington 2951 www.rapidsystems.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/5e0f6c85-4a15-445d-b1e9-85efb26ed25e
              - generic [ref=f2e111]:
                - text: Rapid Systems
                - generic [ref=f2e112]: Consulting
                - generic [ref=f2e113]: 229 Broadway 416, Arlington 2951
                - generic [ref=f2e114]: www.rapidsystems.com
          - listitem [ref=f2e115]:
            - link "Digital Ventures Retail 646 Elm 241, Arlington 7460 www.digitalventures.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/63ccb99a-42c2-4d8d-8d82-b20c3fec2ce7
              - generic [ref=f2e117]:
                - text: Digital Ventures
                - generic [ref=f2e118]: Retail
                - generic [ref=f2e119]: 646 Elm 241, Arlington 7460
                - generic [ref=f2e120]: www.digitalventures.com
          - listitem [ref=f2e121]:
            - link "Smart Partners Real Estate 413 Market 287, Portland 4471 www.smartpartners.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/f97c12cf-bb26-4585-9a46-1947992fa066
              - generic [ref=f2e123]:
                - text: Smart Partners
                - generic [ref=f2e124]: Real Estate
                - generic [ref=f2e125]: 413 Market 287, Portland 4471
                - generic [ref=f2e126]: www.smartpartners.com
          - listitem [ref=f2e127]:
            - link "Digital Solutions Telecommunications 883 Market 44, Arlington 6353 www.digitalsolutions.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/d598f491-f728-4627-8f19-d300e94627b6
              - generic [ref=f2e129]:
                - text: Digital Solutions
                - generic [ref=f2e130]: Telecommunications
                - generic [ref=f2e131]: 883 Market 44, Arlington 6353
                - generic [ref=f2e132]: www.digitalsolutions.com
```