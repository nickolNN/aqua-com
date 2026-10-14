# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-detail.spec.ts >> Company Detail Tests >> company detail displays company address
- Location: tests/e2e/companies/company-detail.spec.ts:37:3

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
            - link "Prime Ventures Retail 389 First 374, Madison 8828 www.primeventures.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/388bb1fa-73a1-4ad7-b396-f7f295a6a6c0
              - generic [ref=f2e75]:
                - text: Prime Ventures
                - generic [ref=f2e76]: Retail
                - generic [ref=f2e77]: 389 First 374, Madison 8828
                - generic [ref=f2e78]: www.primeventures.com
          - listitem [ref=f2e79]:
            - link "Alpha Ventures Retail 265 Oak 910, Portland 4028 www.alphaventures.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/dd67cb71-a8ab-47a8-9d93-f1eb1db7d64c
              - generic [ref=f2e81]:
                - text: Alpha Ventures
                - generic [ref=f2e82]: Retail
                - generic [ref=f2e83]: 265 Oak 910, Portland 4028
                - generic [ref=f2e84]: www.alphaventures.com
          - listitem [ref=f2e85]:
            - link "Digital Holdings Finance 682 Main 715, Springfield 7739 www.digitalholdings.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/45c27673-65c8-429a-8fba-f6b2e4908d5f
              - generic [ref=f2e87]:
                - text: Digital Holdings
                - generic [ref=f2e88]: Finance
                - generic [ref=f2e89]: 682 Main 715, Springfield 7739
                - generic [ref=f2e90]: www.digitalholdings.com
          - listitem [ref=f2e91]:
            - link "Rapid Holdings Finance 751 Oak 712, Salem 9516 www.rapidholdings.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/9ad3964d-f359-4314-89a5-c2541b6bc797
              - generic [ref=f2e93]:
                - text: Rapid Holdings
                - generic [ref=f2e94]: Finance
                - generic [ref=f2e95]: 751 Oak 712, Salem 9516
                - generic [ref=f2e96]: www.rapidholdings.com
          - listitem [ref=f2e97]:
            - link "Alpha Group Media 729 Oak 290, Salem 2373 www.alphagroup.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/4f0ab391-2f20-447a-8c75-43284150af60
              - generic [ref=f2e99]:
                - text: Alpha Group
                - generic [ref=f2e100]: Media
                - generic [ref=f2e101]: 729 Oak 290, Salem 2373
                - generic [ref=f2e102]: www.alphagroup.com
          - listitem [ref=f2e103]:
            - link "Tech Holdings Real Estate 471 First 202, Salem 1765 www.techholdings.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/e669fc8a-da52-4923-a094-48ef87b75e82
              - generic [ref=f2e105]:
                - text: Tech Holdings
                - generic [ref=f2e106]: Real Estate
                - generic [ref=f2e107]: 471 First 202, Salem 1765
                - generic [ref=f2e108]: www.techholdings.com
          - listitem [ref=f2e109]:
            - link "Smart Systems Manufacturing 203 Oak 728, Springfield 2925 www.smartsystems.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/9f17df08-f5b3-41e4-88e4-86d8828c6225
              - generic [ref=f2e111]:
                - text: Smart Systems
                - generic [ref=f2e112]: Manufacturing
                - generic [ref=f2e113]: 203 Oak 728, Springfield 2925
                - generic [ref=f2e114]: www.smartsystems.com
          - listitem [ref=f2e115]:
            - link "Global Enterprises Healthcare 315 Main 687, Portland 9349 www.globalenterprises.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/25cc9af8-acd8-46a0-833b-95a6a9b318a8
              - generic [ref=f2e117]:
                - text: Global Enterprises
                - generic [ref=f2e118]: Healthcare
                - generic [ref=f2e119]: 315 Main 687, Portland 9349
                - generic [ref=f2e120]: www.globalenterprises.com
          - listitem [ref=f2e121]:
            - link "Prime Solutions Retail 104 Oak 314, Arlington 9502 www.primesolutions.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/4d8caf11-d8c7-4158-8887-b5b08bfe8b1d
              - generic [ref=f2e123]:
                - text: Prime Solutions
                - generic [ref=f2e124]: Retail
                - generic [ref=f2e125]: 104 Oak 314, Arlington 9502
                - generic [ref=f2e126]: www.primesolutions.com
          - listitem [ref=f2e127]:
            - link "Smart Solutions Consulting 75 Market 145, Madison 8035 www.smartsolutions.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/e12e6ed1-28aa-4ae6-851f-fc989af80a1a
              - generic [ref=f2e129]:
                - text: Smart Solutions
                - generic [ref=f2e130]: Consulting
                - generic [ref=f2e131]: 75 Market 145, Madison 8035
                - generic [ref=f2e132]: www.smartsolutions.com
```