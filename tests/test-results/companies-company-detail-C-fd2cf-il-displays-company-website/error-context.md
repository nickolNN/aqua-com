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
            - link "Tech Ventures Manufacturing 726 Broadway 48, Springfield 2956 www.techventures.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/d6c41973-6924-46c9-83b8-18be21d82d7a
              - generic [ref=f2e75]:
                - text: Tech Ventures
                - generic [ref=f2e76]: Manufacturing
                - generic [ref=f2e77]: 726 Broadway 48, Springfield 2956
                - generic [ref=f2e78]: www.techventures.com
          - listitem [ref=f2e79]:
            - link "Digital Enterprises Manufacturing 864 Market 402, Salem 2144 www.digitalenterprises.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/11010a65-1186-40ad-bc49-1c942e9b152c
              - generic [ref=f2e81]:
                - text: Digital Enterprises
                - generic [ref=f2e82]: Manufacturing
                - generic [ref=f2e83]: 864 Market 402, Salem 2144
                - generic [ref=f2e84]: www.digitalenterprises.com
          - listitem [ref=f2e85]:
            - link "Alpha Enterprises Real Estate 897 Broadway 231, Salem 2175 www.alphaenterprises.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/eebeefc8-66c7-458f-a39d-c4026249b545
              - generic [ref=f2e87]:
                - text: Alpha Enterprises
                - generic [ref=f2e88]: Real Estate
                - generic [ref=f2e89]: 897 Broadway 231, Salem 2175
                - generic [ref=f2e90]: www.alphaenterprises.com
          - listitem [ref=f2e91]:
            - link "Smart Ventures Education 705 Elm 116, Springfield 3831 www.smartventures.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/28b9f756-188d-4969-b9ae-f70875ecd153
              - generic [ref=f2e93]:
                - text: Smart Ventures
                - generic [ref=f2e94]: Education
                - generic [ref=f2e95]: 705 Elm 116, Springfield 3831
                - generic [ref=f2e96]: www.smartventures.com
          - listitem [ref=f2e97]:
            - link "Alpha Solutions Technology 135 First 629, Portland 1496 www.alphasolutions.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/6d13c64f-a019-49e4-85aa-aef106557b67
              - generic [ref=f2e99]:
                - text: Alpha Solutions
                - generic [ref=f2e100]: Technology
                - generic [ref=f2e101]: 135 First 629, Portland 1496
                - generic [ref=f2e102]: www.alphasolutions.com
          - listitem [ref=f2e103]:
            - link "Prime Labs Healthcare 322 First 858, Salem 6172 www.primelabs.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/ab484112-135d-4e50-95d2-1dc71500bee7
              - generic [ref=f2e105]:
                - text: Prime Labs
                - generic [ref=f2e106]: Healthcare
                - generic [ref=f2e107]: 322 First 858, Salem 6172
                - generic [ref=f2e108]: www.primelabs.com
          - listitem [ref=f2e109]:
            - link "Digital Systems Healthcare 32 Broadway 678, Salem 5412 www.digitalsystems.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/60a77e1a-f6f4-44a8-9d4e-a47c8d483483
              - generic [ref=f2e111]:
                - text: Digital Systems
                - generic [ref=f2e112]: Healthcare
                - generic [ref=f2e113]: 32 Broadway 678, Salem 5412
                - generic [ref=f2e114]: www.digitalsystems.com
          - listitem [ref=f2e115]:
            - link "Prime Partners Telecommunications 227 Oak 250, Portland 1317 www.primepartners.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/e19da5e7-b942-4bad-b375-b7fdabc37a25
              - generic [ref=f2e117]:
                - text: Prime Partners
                - generic [ref=f2e118]: Telecommunications
                - generic [ref=f2e119]: 227 Oak 250, Portland 1317
                - generic [ref=f2e120]: www.primepartners.com
          - listitem [ref=f2e121]:
            - link "Digital Group Telecommunications 2 Market 761, Springfield 5275 www.digitalgroup.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/ddc37432-0e3d-4f2d-998a-c4c35cabd386
              - generic [ref=f2e123]:
                - text: Digital Group
                - generic [ref=f2e124]: Telecommunications
                - generic [ref=f2e125]: 2 Market 761, Springfield 5275
                - generic [ref=f2e126]: www.digitalgroup.com
          - listitem [ref=f2e127]:
            - link "Alpha Systems Technology 353 Main 95, Springfield 5464 www.alphasystems.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/19d36291-21aa-4a7b-8fba-7a1236778e95
              - generic [ref=f2e129]:
                - text: Alpha Systems
                - generic [ref=f2e130]: Technology
                - generic [ref=f2e131]: 353 Main 95, Springfield 5464
                - generic [ref=f2e132]: www.alphasystems.com
```