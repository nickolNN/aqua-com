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
            - link "Digital Systems Media 662 Oak 460, Arlington 5275 www.digitalsystems.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/bc8afea7-2340-4c94-b8af-5f6d2ab8ed55
              - generic [ref=f2e75]:
                - text: Digital Systems
                - generic [ref=f2e76]: Media
                - generic [ref=f2e77]: 662 Oak 460, Arlington 5275
                - generic [ref=f2e78]: www.digitalsystems.com
          - listitem [ref=f2e79]:
            - link "Global Partners Healthcare 815 Oak 838, Springfield 5371 www.globalpartners.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/2a27943b-0316-4da9-8e4e-25273bc68817
              - generic [ref=f2e81]:
                - text: Global Partners
                - generic [ref=f2e82]: Healthcare
                - generic [ref=f2e83]: 815 Oak 838, Springfield 5371
                - generic [ref=f2e84]: www.globalpartners.com
          - listitem [ref=f2e85]:
            - link "Digital Holdings Healthcare 832 Elm 32, Portland 5384 www.digitalholdings.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/e7aa44d3-fce1-4391-b992-86f417cf4257
              - generic [ref=f2e87]:
                - text: Digital Holdings
                - generic [ref=f2e88]: Healthcare
                - generic [ref=f2e89]: 832 Elm 32, Portland 5384
                - generic [ref=f2e90]: www.digitalholdings.com
          - listitem [ref=f2e91]:
            - link "Tech Systems Finance 865 Pine 803, Madison 1976 www.techsystems.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/733bbb85-78bc-452c-9cc9-f7c68d27bbc9
              - generic [ref=f2e93]:
                - text: Tech Systems
                - generic [ref=f2e94]: Finance
                - generic [ref=f2e95]: 865 Pine 803, Madison 1976
                - generic [ref=f2e96]: www.techsystems.com
          - listitem [ref=f2e97]:
            - link "Digital Systems Technology 517 Broadway 434, Madison 9674 www.digitalsystems.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/1e410998-753d-4137-b382-e03414ce79a0
              - generic [ref=f2e99]:
                - text: Digital Systems
                - generic [ref=f2e100]: Technology
                - generic [ref=f2e101]: 517 Broadway 434, Madison 9674
                - generic [ref=f2e102]: www.digitalsystems.com
          - listitem [ref=f2e103]:
            - link "Rapid Holdings Healthcare 786 Broadway 873, Arlington 2762 www.rapidholdings.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/175e903e-74e3-44e5-965e-b298d0041162
              - generic [ref=f2e105]:
                - text: Rapid Holdings
                - generic [ref=f2e106]: Healthcare
                - generic [ref=f2e107]: 786 Broadway 873, Arlington 2762
                - generic [ref=f2e108]: www.rapidholdings.com
          - listitem [ref=f2e109]:
            - link "Digital Group Manufacturing 527 First 863, Madison 7788 www.digitalgroup.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/9717b28b-2b24-4d92-9e6d-c369c6566fe8
              - generic [ref=f2e111]:
                - text: Digital Group
                - generic [ref=f2e112]: Manufacturing
                - generic [ref=f2e113]: 527 First 863, Madison 7788
                - generic [ref=f2e114]: www.digitalgroup.com
          - listitem [ref=f2e115]:
            - link "Rapid Partners Consulting 250 Main 286, Portland 6254 www.rapidpartners.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/24ce8ba8-26b9-4871-94b4-ed891cf13c80
              - generic [ref=f2e117]:
                - text: Rapid Partners
                - generic [ref=f2e118]: Consulting
                - generic [ref=f2e119]: 250 Main 286, Portland 6254
                - generic [ref=f2e120]: www.rapidpartners.com
          - listitem [ref=f2e121]:
            - link "Prime Partners Education 702 Elm 870, Madison 5637 www.primepartners.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/4a23d4cb-3f90-4e86-9cca-511234eb7a06
              - generic [ref=f2e123]:
                - text: Prime Partners
                - generic [ref=f2e124]: Education
                - generic [ref=f2e125]: 702 Elm 870, Madison 5637
                - generic [ref=f2e126]: www.primepartners.com
          - listitem [ref=f2e127]:
            - link "Smart Labs Media 961 Main 790, Madison 3683 www.smartlabs.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/371c2575-4993-4c8a-b5a4-913361f3990c
              - generic [ref=f2e129]:
                - text: Smart Labs
                - generic [ref=f2e130]: Media
                - generic [ref=f2e131]: 961 Main 790, Madison 3683
                - generic [ref=f2e132]: www.smartlabs.com
```