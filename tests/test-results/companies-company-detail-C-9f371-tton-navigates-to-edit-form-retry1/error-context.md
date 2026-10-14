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
            - link "Global Solutions Real Estate 265 Broadway 989, Salem 9789 www.globalsolutions.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/482762c1-a0e9-4a37-924a-449091df5639
              - generic [ref=f2e75]:
                - text: Global Solutions
                - generic [ref=f2e76]: Real Estate
                - generic [ref=f2e77]: 265 Broadway 989, Salem 9789
                - generic [ref=f2e78]: www.globalsolutions.com
          - listitem [ref=f2e79]:
            - link "Tech Systems Retail 613 Market 848, Arlington 7200 www.techsystems.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/a37e3aba-d044-4b57-b496-8dff4556a6cb
              - generic [ref=f2e81]:
                - text: Tech Systems
                - generic [ref=f2e82]: Retail
                - generic [ref=f2e83]: 613 Market 848, Arlington 7200
                - generic [ref=f2e84]: www.techsystems.com
          - listitem [ref=f2e85]:
            - link "Next Solutions Manufacturing 813 Pine 584, Springfield 4647 www.nextsolutions.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/dfb7f404-c27e-4346-8ee3-0914de5f365e
              - generic [ref=f2e87]:
                - text: Next Solutions
                - generic [ref=f2e88]: Manufacturing
                - generic [ref=f2e89]: 813 Pine 584, Springfield 4647
                - generic [ref=f2e90]: www.nextsolutions.com
          - listitem [ref=f2e91]:
            - link "Digital Partners Telecommunications 784 Pine 652, Arlington 3813 www.digitalpartners.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/364ec2a0-cd9c-4140-bd9d-50d8928d3c34
              - generic [ref=f2e93]:
                - text: Digital Partners
                - generic [ref=f2e94]: Telecommunications
                - generic [ref=f2e95]: 784 Pine 652, Arlington 3813
                - generic [ref=f2e96]: www.digitalpartners.com
          - listitem [ref=f2e97]:
            - link "Tech Labs Telecommunications 158 Market 615, Madison 4469 www.techlabs.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/3c71fa83-29d2-42ed-8e2c-2fe2a15c5e6e
              - generic [ref=f2e99]:
                - text: Tech Labs
                - generic [ref=f2e100]: Telecommunications
                - generic [ref=f2e101]: 158 Market 615, Madison 4469
                - generic [ref=f2e102]: www.techlabs.com
          - listitem [ref=f2e103]:
            - link "Smart Enterprises Consulting 176 First 794, Madison 1148 www.smartenterprises.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/c989a876-c499-43f3-8f9d-71c452839704
              - generic [ref=f2e105]:
                - text: Smart Enterprises
                - generic [ref=f2e106]: Consulting
                - generic [ref=f2e107]: 176 First 794, Madison 1148
                - generic [ref=f2e108]: www.smartenterprises.com
          - listitem [ref=f2e109]:
            - link "Next Group Manufacturing 683 First 117, Arlington 5417 www.nextgroup.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/8b670a02-f936-41cd-ad30-cafaf8c22174
              - generic [ref=f2e111]:
                - text: Next Group
                - generic [ref=f2e112]: Manufacturing
                - generic [ref=f2e113]: 683 First 117, Arlington 5417
                - generic [ref=f2e114]: www.nextgroup.com
          - listitem [ref=f2e115]:
            - link "Digital Holdings Manufacturing 381 Oak 688, Springfield 1278 www.digitalholdings.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/af7d03e6-c17d-4106-89db-1b181e4f3767
              - generic [ref=f2e117]:
                - text: Digital Holdings
                - generic [ref=f2e118]: Manufacturing
                - generic [ref=f2e119]: 381 Oak 688, Springfield 1278
                - generic [ref=f2e120]: www.digitalholdings.com
          - listitem [ref=f2e121]:
            - link "Rapid Systems Manufacturing 326 Elm 65, Salem 5855 www.rapidsystems.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/806784be-2eaf-4423-8d78-b745c1e957ae
              - generic [ref=f2e123]:
                - text: Rapid Systems
                - generic [ref=f2e124]: Manufacturing
                - generic [ref=f2e125]: 326 Elm 65, Salem 5855
                - generic [ref=f2e126]: www.rapidsystems.com
          - listitem [ref=f2e127]:
            - link "Smart Holdings Education 865 Elm 624, Arlington 5292 www.smartholdings.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/32fe2824-5f4c-4298-82c5-272c23dad5de
              - generic [ref=f2e129]:
                - text: Smart Holdings
                - generic [ref=f2e130]: Education
                - generic [ref=f2e131]: 865 Elm 624, Arlington 5292
                - generic [ref=f2e132]: www.smartholdings.com
```