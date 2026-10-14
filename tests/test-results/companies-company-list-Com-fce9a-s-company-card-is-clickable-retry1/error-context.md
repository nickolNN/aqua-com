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
            - link "Alpha Solutions Telecommunications 87 Pine 612, Springfield 1796 www.alphasolutions.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/5be772e7-a83c-401f-8ae1-0a7655d48235
              - generic [ref=f2e75]:
                - text: Alpha Solutions
                - generic [ref=f2e76]: Telecommunications
                - generic [ref=f2e77]: 87 Pine 612, Springfield 1796
                - generic [ref=f2e78]: www.alphasolutions.com
          - listitem [ref=f2e79]:
            - link "Smart Partners Healthcare 835 Main 448, Springfield 7193 www.smartpartners.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/2538a665-6db6-4126-a4c7-23b0740b6ea5
              - generic [ref=f2e81]:
                - text: Smart Partners
                - generic [ref=f2e82]: Healthcare
                - generic [ref=f2e83]: 835 Main 448, Springfield 7193
                - generic [ref=f2e84]: www.smartpartners.com
          - listitem [ref=f2e85]:
            - link "Alpha Labs Media 561 First 928, Springfield 4718 www.alphalabs.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/818b24cd-5de1-416c-b976-1c97a5d9a97b
              - generic [ref=f2e87]:
                - text: Alpha Labs
                - generic [ref=f2e88]: Media
                - generic [ref=f2e89]: 561 First 928, Springfield 4718
                - generic [ref=f2e90]: www.alphalabs.com
          - listitem [ref=f2e91]:
            - link "Alpha Holdings Healthcare 752 Market 724, Madison 2802 www.alphaholdings.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/13ff7cce-e00e-41ed-8761-26cbc5d58f9a
              - generic [ref=f2e93]:
                - text: Alpha Holdings
                - generic [ref=f2e94]: Healthcare
                - generic [ref=f2e95]: 752 Market 724, Madison 2802
                - generic [ref=f2e96]: www.alphaholdings.com
          - listitem [ref=f2e97]:
            - link "Digital Partners Telecommunications 791 Pine 209, Arlington 1804 www.digitalpartners.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/69e0a9a3-f214-47f1-bce3-394966dde2cd
              - generic [ref=f2e99]:
                - text: Digital Partners
                - generic [ref=f2e100]: Telecommunications
                - generic [ref=f2e101]: 791 Pine 209, Arlington 1804
                - generic [ref=f2e102]: www.digitalpartners.com
          - listitem [ref=f2e103]:
            - link "Rapid Solutions Finance 560 First 336, Madison 3441 www.rapidsolutions.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/a37ba880-8355-4027-8ca8-dbedbefe4111
              - generic [ref=f2e105]:
                - text: Rapid Solutions
                - generic [ref=f2e106]: Finance
                - generic [ref=f2e107]: 560 First 336, Madison 3441
                - generic [ref=f2e108]: www.rapidsolutions.com
          - listitem [ref=f2e109]:
            - link "Digital Labs Retail 76 Pine 882, Portland 7269 www.digitallabs.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/29990062-f191-46b7-aed5-ac909f6e9176
              - generic [ref=f2e111]:
                - text: Digital Labs
                - generic [ref=f2e112]: Retail
                - generic [ref=f2e113]: 76 Pine 882, Portland 7269
                - generic [ref=f2e114]: www.digitallabs.com
          - listitem [ref=f2e115]:
            - link "Global Systems Healthcare 140 First 335, Portland 7567 www.globalsystems.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/d3732822-c6af-48c9-b509-fa2f8b0193dc
              - generic [ref=f2e117]:
                - text: Global Systems
                - generic [ref=f2e118]: Healthcare
                - generic [ref=f2e119]: 140 First 335, Portland 7567
                - generic [ref=f2e120]: www.globalsystems.com
          - listitem [ref=f2e121]:
            - link "Prime Partners Manufacturing 301 Market 883, Madison 9960 www.primepartners.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/e719eb45-ec73-4061-a0c3-d198bfa30399
              - generic [ref=f2e123]:
                - text: Prime Partners
                - generic [ref=f2e124]: Manufacturing
                - generic [ref=f2e125]: 301 Market 883, Madison 9960
                - generic [ref=f2e126]: www.primepartners.com
          - listitem [ref=f2e127]:
            - link "Prime Group Media 765 First 100, Arlington 2805 www.primegroup.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/e07d9c3d-432a-4aa4-8828-6ca381733e76
              - generic [ref=f2e129]:
                - text: Prime Group
                - generic [ref=f2e130]: Media
                - generic [ref=f2e131]: 765 First 100, Arlington 2805
                - generic [ref=f2e132]: www.primegroup.com
```