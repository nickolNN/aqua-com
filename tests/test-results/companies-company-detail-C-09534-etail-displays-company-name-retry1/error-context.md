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
            - link "Prime Holdings Healthcare 808 First 15, Portland 5322 www.primeholdings.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/39430972-0a5c-4984-be67-d164fb0df159
              - generic [ref=f2e75]:
                - text: Prime Holdings
                - generic [ref=f2e76]: Healthcare
                - generic [ref=f2e77]: 808 First 15, Portland 5322
                - generic [ref=f2e78]: www.primeholdings.com
          - listitem [ref=f2e79]:
            - link "Tech Systems Consulting 466 Oak 915, Salem 8624 www.techsystems.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/18506e76-77f2-436b-a5b7-ef5f2b3eae2d
              - generic [ref=f2e81]:
                - text: Tech Systems
                - generic [ref=f2e82]: Consulting
                - generic [ref=f2e83]: 466 Oak 915, Salem 8624
                - generic [ref=f2e84]: www.techsystems.com
          - listitem [ref=f2e85]:
            - link "Next Holdings Real Estate 867 First 640, Arlington 3778 www.nextholdings.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/e049cfe7-baab-48cc-81bd-6900326b2b0a
              - generic [ref=f2e87]:
                - text: Next Holdings
                - generic [ref=f2e88]: Real Estate
                - generic [ref=f2e89]: 867 First 640, Arlington 3778
                - generic [ref=f2e90]: www.nextholdings.com
          - listitem [ref=f2e91]:
            - link "Alpha Labs Retail 681 Elm 43, Portland 6694 www.alphalabs.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/a5031633-c1e1-48de-91a7-1e9a021f8b78
              - generic [ref=f2e93]:
                - text: Alpha Labs
                - generic [ref=f2e94]: Retail
                - generic [ref=f2e95]: 681 Elm 43, Portland 6694
                - generic [ref=f2e96]: www.alphalabs.com
          - listitem [ref=f2e97]:
            - link "Smart Ventures Manufacturing 714 Elm 447, Portland 1446 www.smartventures.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/acd6a02f-0a36-4c63-83d0-88c4107eb43f
              - generic [ref=f2e99]:
                - text: Smart Ventures
                - generic [ref=f2e100]: Manufacturing
                - generic [ref=f2e101]: 714 Elm 447, Portland 1446
                - generic [ref=f2e102]: www.smartventures.com
          - listitem [ref=f2e103]:
            - link "Global Labs Healthcare 324 Main 934, Portland 9061 www.globallabs.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/477d72e3-444a-4dee-b277-8ccace5a4c1b
              - generic [ref=f2e105]:
                - text: Global Labs
                - generic [ref=f2e106]: Healthcare
                - generic [ref=f2e107]: 324 Main 934, Portland 9061
                - generic [ref=f2e108]: www.globallabs.com
          - listitem [ref=f2e109]:
            - link "Digital Solutions Healthcare 19 Market 670, Arlington 5036 www.digitalsolutions.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/b19b6934-9fa4-40e9-b812-600f2c0135c8
              - generic [ref=f2e111]:
                - text: Digital Solutions
                - generic [ref=f2e112]: Healthcare
                - generic [ref=f2e113]: 19 Market 670, Arlington 5036
                - generic [ref=f2e114]: www.digitalsolutions.com
          - listitem [ref=f2e115]:
            - link "Global Systems Healthcare 560 Elm 955, Madison 9652 www.globalsystems.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/9a69c20e-dade-4ef0-8d3c-724195cbb88b
              - generic [ref=f2e117]:
                - text: Global Systems
                - generic [ref=f2e118]: Healthcare
                - generic [ref=f2e119]: 560 Elm 955, Madison 9652
                - generic [ref=f2e120]: www.globalsystems.com
          - listitem [ref=f2e121]:
            - link "Next Ventures Media 884 First 398, Springfield 1624 www.nextventures.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/6eca5792-d938-4c60-b901-1e47961601cc
              - generic [ref=f2e123]:
                - text: Next Ventures
                - generic [ref=f2e124]: Media
                - generic [ref=f2e125]: 884 First 398, Springfield 1624
                - generic [ref=f2e126]: www.nextventures.com
          - listitem [ref=f2e127]:
            - link "Digital Solutions Consulting 767 First 171, Portland 9886 www.digitalsolutions.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/fcfcc7b4-8b4f-4d57-96d1-350ef77d4b31
              - generic [ref=f2e129]:
                - text: Digital Solutions
                - generic [ref=f2e130]: Consulting
                - generic [ref=f2e131]: 767 First 171, Portland 9886
                - generic [ref=f2e132]: www.digitalsolutions.com
```