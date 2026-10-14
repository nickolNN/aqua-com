# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-detail.spec.ts >> Company Detail Tests >> company detail displays company name
- Location: tests/e2e/companies/company-detail.spec.ts:18:3

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
            - link "Tech Enterprises Technology 898 Pine 165, Portland 4159 www.techenterprises.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/da44c770-a3ec-44d1-b4ea-bf29fcab15e8
              - generic [ref=f2e75]:
                - text: Tech Enterprises
                - generic [ref=f2e76]: Technology
                - generic [ref=f2e77]: 898 Pine 165, Portland 4159
                - generic [ref=f2e78]: www.techenterprises.com
          - listitem [ref=f2e79]:
            - link "Digital Group Technology 148 Elm 801, Arlington 4155 www.digitalgroup.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/5977b58f-c824-4517-a5c3-4a923c108d5b
              - generic [ref=f2e81]:
                - text: Digital Group
                - generic [ref=f2e82]: Technology
                - generic [ref=f2e83]: 148 Elm 801, Arlington 4155
                - generic [ref=f2e84]: www.digitalgroup.com
          - listitem [ref=f2e85]:
            - link "Tech Ventures Technology 330 First 556, Salem 8314 www.techventures.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/dd2b3a6a-5290-484b-9da4-d3d6c9f7474e
              - generic [ref=f2e87]:
                - text: Tech Ventures
                - generic [ref=f2e88]: Technology
                - generic [ref=f2e89]: 330 First 556, Salem 8314
                - generic [ref=f2e90]: www.techventures.com
          - listitem [ref=f2e91]:
            - link "Rapid Labs Consulting 218 Elm 736, Portland 1044 www.rapidlabs.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/c8cdae54-4d56-4c4b-9caf-f282b474f532
              - generic [ref=f2e93]:
                - text: Rapid Labs
                - generic [ref=f2e94]: Consulting
                - generic [ref=f2e95]: 218 Elm 736, Portland 1044
                - generic [ref=f2e96]: www.rapidlabs.com
          - listitem [ref=f2e97]:
            - link "Digital Partners Consulting 236 Elm 680, Salem 5773 www.digitalpartners.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/9e58b49f-de37-4fb1-8942-b69f6b00f253
              - generic [ref=f2e99]:
                - text: Digital Partners
                - generic [ref=f2e100]: Consulting
                - generic [ref=f2e101]: 236 Elm 680, Salem 5773
                - generic [ref=f2e102]: www.digitalpartners.com
          - listitem [ref=f2e103]:
            - link "Digital Holdings Manufacturing 499 Oak 525, Salem 2099 www.digitalholdings.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/6054697e-d08d-4b3b-b03d-afb41cf8dd09
              - generic [ref=f2e105]:
                - text: Digital Holdings
                - generic [ref=f2e106]: Manufacturing
                - generic [ref=f2e107]: 499 Oak 525, Salem 2099
                - generic [ref=f2e108]: www.digitalholdings.com
          - listitem [ref=f2e109]:
            - link "Global Labs Real Estate 338 First 932, Portland 8782 www.globallabs.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/502c5c64-1cde-4cb6-b55c-c3b56d8d5257
              - generic [ref=f2e111]:
                - text: Global Labs
                - generic [ref=f2e112]: Real Estate
                - generic [ref=f2e113]: 338 First 932, Portland 8782
                - generic [ref=f2e114]: www.globallabs.com
          - listitem [ref=f2e115]:
            - link "Digital Holdings Telecommunications 392 Pine 490, Salem 4661 www.digitalholdings.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/c38a15d0-28bb-4e7b-9b62-a4376c83406f
              - generic [ref=f2e117]:
                - text: Digital Holdings
                - generic [ref=f2e118]: Telecommunications
                - generic [ref=f2e119]: 392 Pine 490, Salem 4661
                - generic [ref=f2e120]: www.digitalholdings.com
          - listitem [ref=f2e121]:
            - link "Smart Partners Real Estate 711 First 232, Springfield 9685 www.smartpartners.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/8c1a179e-12a7-4ea5-9b4c-f01999af77f6
              - generic [ref=f2e123]:
                - text: Smart Partners
                - generic [ref=f2e124]: Real Estate
                - generic [ref=f2e125]: 711 First 232, Springfield 9685
                - generic [ref=f2e126]: www.smartpartners.com
          - listitem [ref=f2e127]:
            - link "Tech Enterprises Consulting 738 Market 359, Springfield 4904 www.techenterprises.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/7939ce17-b7cf-49c8-9de6-1a44fbc493d4
              - generic [ref=f2e129]:
                - text: Tech Enterprises
                - generic [ref=f2e130]: Consulting
                - generic [ref=f2e131]: 738 Market 359, Springfield 4904
                - generic [ref=f2e132]: www.techenterprises.com
```