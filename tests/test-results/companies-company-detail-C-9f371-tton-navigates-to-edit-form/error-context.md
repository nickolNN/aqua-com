# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-detail.spec.ts >> Company Detail Tests >> edit company button navigates to edit form
- Location: tests/e2e/companies/company-detail.spec.ts:57:3

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
            - link "Digital Labs Telecommunications 410 First 533, Arlington 5895 www.digitallabs.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/10e2579a-371e-4c73-9143-5af0e943c967
              - generic [ref=f2e75]:
                - text: Digital Labs
                - generic [ref=f2e76]: Telecommunications
                - generic [ref=f2e77]: 410 First 533, Arlington 5895
                - generic [ref=f2e78]: www.digitallabs.com
          - listitem [ref=f2e79]:
            - link "Smart Solutions Technology 427 Oak 953, Salem 2226 www.smartsolutions.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/a806a70c-0fa5-4ed1-8778-3000193d7a71
              - generic [ref=f2e81]:
                - text: Smart Solutions
                - generic [ref=f2e82]: Technology
                - generic [ref=f2e83]: 427 Oak 953, Salem 2226
                - generic [ref=f2e84]: www.smartsolutions.com
          - listitem [ref=f2e85]:
            - link "Global Labs Healthcare 425 Elm 44, Madison 1585 www.globallabs.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/224604cd-ddb9-4fc5-8b8b-c6323dd1f378
              - generic [ref=f2e87]:
                - text: Global Labs
                - generic [ref=f2e88]: Healthcare
                - generic [ref=f2e89]: 425 Elm 44, Madison 1585
                - generic [ref=f2e90]: www.globallabs.com
          - listitem [ref=f2e91]:
            - link "Next Partners Telecommunications 583 Broadway 283, Arlington 3025 www.nextpartners.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/13d9a764-300a-4d08-96c8-1510d45f7fcf
              - generic [ref=f2e93]:
                - text: Next Partners
                - generic [ref=f2e94]: Telecommunications
                - generic [ref=f2e95]: 583 Broadway 283, Arlington 3025
                - generic [ref=f2e96]: www.nextpartners.com
          - listitem [ref=f2e97]:
            - link "Tech Partners Finance 494 Oak 859, Salem 1486 www.techpartners.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/c984d66f-78d3-47cc-a05b-c74502832e97
              - generic [ref=f2e99]:
                - text: Tech Partners
                - generic [ref=f2e100]: Finance
                - generic [ref=f2e101]: 494 Oak 859, Salem 1486
                - generic [ref=f2e102]: www.techpartners.com
          - listitem [ref=f2e103]:
            - link "Tech Solutions Retail 122 Elm 402, Madison 4257 www.techsolutions.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/7473b0ae-fb2b-439a-843d-7606948fa2e5
              - generic [ref=f2e105]:
                - text: Tech Solutions
                - generic [ref=f2e106]: Retail
                - generic [ref=f2e107]: 122 Elm 402, Madison 4257
                - generic [ref=f2e108]: www.techsolutions.com
          - listitem [ref=f2e109]:
            - link "Alpha Ventures Retail 951 First 415, Arlington 9710 www.alphaventures.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/901506c6-b44e-4949-9ab7-4e304dd53d53
              - generic [ref=f2e111]:
                - text: Alpha Ventures
                - generic [ref=f2e112]: Retail
                - generic [ref=f2e113]: 951 First 415, Arlington 9710
                - generic [ref=f2e114]: www.alphaventures.com
          - listitem [ref=f2e115]:
            - link "Alpha Group Finance 268 Pine 726, Salem 9439 www.alphagroup.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/e5c48e20-f171-403a-9d30-00e53d8b667e
              - generic [ref=f2e117]:
                - text: Alpha Group
                - generic [ref=f2e118]: Finance
                - generic [ref=f2e119]: 268 Pine 726, Salem 9439
                - generic [ref=f2e120]: www.alphagroup.com
          - listitem [ref=f2e121]:
            - link "Digital Holdings Media 781 Broadway 144, Madison 1927 www.digitalholdings.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/3602767d-94de-4b92-bd68-3a66298adf2b
              - generic [ref=f2e123]:
                - text: Digital Holdings
                - generic [ref=f2e124]: Media
                - generic [ref=f2e125]: 781 Broadway 144, Madison 1927
                - generic [ref=f2e126]: www.digitalholdings.com
          - listitem [ref=f2e127]:
            - link "Tech Holdings Telecommunications 225 Market 383, Salem 3051 www.techholdings.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/e8c15409-4304-48ac-a4b0-776da897535b
              - generic [ref=f2e129]:
                - text: Tech Holdings
                - generic [ref=f2e130]: Telecommunications
                - generic [ref=f2e131]: 225 Market 383, Salem 3051
                - generic [ref=f2e132]: www.techholdings.com
```