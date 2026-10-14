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
            - link "Global Ventures Healthcare 127 Market 534, Salem 8283 www.globalventures.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/7d98ec49-e84d-41f9-802e-102c76ede5d3
              - generic [ref=f2e75]:
                - text: Global Ventures
                - generic [ref=f2e76]: Healthcare
                - generic [ref=f2e77]: 127 Market 534, Salem 8283
                - generic [ref=f2e78]: www.globalventures.com
          - listitem [ref=f2e79]:
            - link "Next Partners Finance 184 Main 460, Arlington 4416 www.nextpartners.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/3842bfc3-e70f-4407-a879-b3a5f0a57444
              - generic [ref=f2e81]:
                - text: Next Partners
                - generic [ref=f2e82]: Finance
                - generic [ref=f2e83]: 184 Main 460, Arlington 4416
                - generic [ref=f2e84]: www.nextpartners.com
          - listitem [ref=f2e85]:
            - link "Tech Enterprises Telecommunications 688 Pine 924, Springfield 9309 www.techenterprises.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/c658648c-e021-413f-a2d3-e2129ce2351e
              - generic [ref=f2e87]:
                - text: Tech Enterprises
                - generic [ref=f2e88]: Telecommunications
                - generic [ref=f2e89]: 688 Pine 924, Springfield 9309
                - generic [ref=f2e90]: www.techenterprises.com
          - listitem [ref=f2e91]:
            - link "Prime Enterprises Finance 628 Broadway 193, Madison 2599 www.primeenterprises.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/ff9c30a0-72f2-41c9-a32f-a6dc07ed3f80
              - generic [ref=f2e93]:
                - text: Prime Enterprises
                - generic [ref=f2e94]: Finance
                - generic [ref=f2e95]: 628 Broadway 193, Madison 2599
                - generic [ref=f2e96]: www.primeenterprises.com
          - listitem [ref=f2e97]:
            - link "Alpha Systems Real Estate 442 Pine 545, Madison 5487 www.alphasystems.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/5cb72448-6b01-4481-9555-1f0303de06f6
              - generic [ref=f2e99]:
                - text: Alpha Systems
                - generic [ref=f2e100]: Real Estate
                - generic [ref=f2e101]: 442 Pine 545, Madison 5487
                - generic [ref=f2e102]: www.alphasystems.com
          - listitem [ref=f2e103]:
            - link "Tech Solutions Retail 703 Pine 201, Arlington 1069 www.techsolutions.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/4d4a5c58-b5cd-4a16-81a2-bd88cedb14c9
              - generic [ref=f2e105]:
                - text: Tech Solutions
                - generic [ref=f2e106]: Retail
                - generic [ref=f2e107]: 703 Pine 201, Arlington 1069
                - generic [ref=f2e108]: www.techsolutions.com
          - listitem [ref=f2e109]:
            - link "Next Labs Technology 622 Market 888, Salem 9038 www.nextlabs.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/d0c26236-1661-45cd-bbfe-197996bf4485
              - generic [ref=f2e111]:
                - text: Next Labs
                - generic [ref=f2e112]: Technology
                - generic [ref=f2e113]: 622 Market 888, Salem 9038
                - generic [ref=f2e114]: www.nextlabs.com
          - listitem [ref=f2e115]:
            - link "Global Partners Real Estate 498 Broadway 615, Springfield 3587 www.globalpartners.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/59e7162b-3901-4b10-afea-ae764fef8569
              - generic [ref=f2e117]:
                - text: Global Partners
                - generic [ref=f2e118]: Real Estate
                - generic [ref=f2e119]: 498 Broadway 615, Springfield 3587
                - generic [ref=f2e120]: www.globalpartners.com
          - listitem [ref=f2e121]:
            - link "Next Systems Media 765 Main 63, Arlington 6352 www.nextsystems.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/7737d475-d345-4685-9da4-f7007b27cced
              - generic [ref=f2e123]:
                - text: Next Systems
                - generic [ref=f2e124]: Media
                - generic [ref=f2e125]: 765 Main 63, Arlington 6352
                - generic [ref=f2e126]: www.nextsystems.com
          - listitem [ref=f2e127]:
            - link "Alpha Enterprises Media 421 Broadway 533, Portland 2917 www.alphaenterprises.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/2f616012-0fc3-48da-87e8-559c9cad3595
              - generic [ref=f2e129]:
                - text: Alpha Enterprises
                - generic [ref=f2e130]: Media
                - generic [ref=f2e131]: 421 Broadway 533, Portland 2917
                - generic [ref=f2e132]: www.alphaenterprises.com
```