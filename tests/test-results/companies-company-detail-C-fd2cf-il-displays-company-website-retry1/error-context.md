# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-detail.spec.ts >> Company Detail Tests >> company detail displays company website
- Location: tests/e2e/companies/company-detail.spec.ts:47:3

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
            - link "Next Group Real Estate 553 Elm 554, Salem 1909 www.nextgroup.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/c04d567b-3160-430b-ac1d-38db9b9af365
              - generic [ref=f2e75]:
                - text: Next Group
                - generic [ref=f2e76]: Real Estate
                - generic [ref=f2e77]: 553 Elm 554, Salem 1909
                - generic [ref=f2e78]: www.nextgroup.com
          - listitem [ref=f2e79]:
            - link "Rapid Ventures Telecommunications 710 Broadway 397, Portland 6830 www.rapidventures.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/b9f95eb0-47f5-4e79-800b-20afd649fce2
              - generic [ref=f2e81]:
                - text: Rapid Ventures
                - generic [ref=f2e82]: Telecommunications
                - generic [ref=f2e83]: 710 Broadway 397, Portland 6830
                - generic [ref=f2e84]: www.rapidventures.com
          - listitem [ref=f2e85]:
            - link "Prime Solutions Education 252 First 91, Springfield 4444 www.primesolutions.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/b340c50b-d553-4864-ad94-65b43d71b61e
              - generic [ref=f2e87]:
                - text: Prime Solutions
                - generic [ref=f2e88]: Education
                - generic [ref=f2e89]: 252 First 91, Springfield 4444
                - generic [ref=f2e90]: www.primesolutions.com
          - listitem [ref=f2e91]:
            - link "Tech Labs Telecommunications 270 Broadway 549, Portland 2566 www.techlabs.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/aac40a88-2a97-4d2d-99b0-681566a79ad1
              - generic [ref=f2e93]:
                - text: Tech Labs
                - generic [ref=f2e94]: Telecommunications
                - generic [ref=f2e95]: 270 Broadway 549, Portland 2566
                - generic [ref=f2e96]: www.techlabs.com
          - listitem [ref=f2e97]:
            - link "Rapid Enterprises Education 543 First 678, Salem 9901 www.rapidenterprises.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/874e49a0-7983-47e3-9bc8-7b1d0683a56a
              - generic [ref=f2e99]:
                - text: Rapid Enterprises
                - generic [ref=f2e100]: Education
                - generic [ref=f2e101]: 543 First 678, Salem 9901
                - generic [ref=f2e102]: www.rapidenterprises.com
          - listitem [ref=f2e103]:
            - link "Rapid Ventures Retail 814 Elm 553, Salem 8164 www.rapidventures.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/561fbb0f-021f-41a4-a667-e2ecad9c5e06
              - generic [ref=f2e105]:
                - text: Rapid Ventures
                - generic [ref=f2e106]: Retail
                - generic [ref=f2e107]: 814 Elm 553, Salem 8164
                - generic [ref=f2e108]: www.rapidventures.com
          - listitem [ref=f2e109]:
            - link "Alpha Group Manufacturing 690 Oak 693, Springfield 1909 www.alphagroup.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/e4659b63-1895-4cb5-be24-7e7e9ec1b050
              - generic [ref=f2e111]:
                - text: Alpha Group
                - generic [ref=f2e112]: Manufacturing
                - generic [ref=f2e113]: 690 Oak 693, Springfield 1909
                - generic [ref=f2e114]: www.alphagroup.com
          - listitem [ref=f2e115]:
            - link "Digital Solutions Telecommunications 462 Pine 238, Madison 7289 www.digitalsolutions.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/6319180f-e84d-4140-8aff-84c16b745a72
              - generic [ref=f2e117]:
                - text: Digital Solutions
                - generic [ref=f2e118]: Telecommunications
                - generic [ref=f2e119]: 462 Pine 238, Madison 7289
                - generic [ref=f2e120]: www.digitalsolutions.com
          - listitem [ref=f2e121]:
            - link "Tech Solutions Education 323 Pine 484, Arlington 2538 www.techsolutions.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/2f3748fa-b454-4be2-95c9-4da690650e6a
              - generic [ref=f2e123]:
                - text: Tech Solutions
                - generic [ref=f2e124]: Education
                - generic [ref=f2e125]: 323 Pine 484, Arlington 2538
                - generic [ref=f2e126]: www.techsolutions.com
          - listitem [ref=f2e127]:
            - link "Smart Ventures Healthcare 782 Market 871, Madison 2851 www.smartventures.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/9c60991e-cf07-437b-b332-c5bfc6c6826e
              - generic [ref=f2e129]:
                - text: Smart Ventures
                - generic [ref=f2e130]: Healthcare
                - generic [ref=f2e131]: 782 Market 871, Madison 2851
                - generic [ref=f2e132]: www.smartventures.com
```