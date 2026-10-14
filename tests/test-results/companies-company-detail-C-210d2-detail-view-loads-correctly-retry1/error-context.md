# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: companies/company-detail.spec.ts >> Company Detail Tests >> company detail view loads correctly
- Location: tests/e2e/companies/company-detail.spec.ts:9:3

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
            - link "Global Ventures Media 967 First 87, Portland 3560 www.globalventures.com" [ref=f2e74] [cursor=pointer]:
              - /url: /companies/84118d04-ef88-4b1b-a9e7-86280766d703
              - generic [ref=f2e75]:
                - text: Global Ventures
                - generic [ref=f2e76]: Media
                - generic [ref=f2e77]: 967 First 87, Portland 3560
                - generic [ref=f2e78]: www.globalventures.com
          - listitem [ref=f2e79]:
            - link "Digital Labs Finance 597 Pine 533, Arlington 5628 www.digitallabs.com" [ref=f2e80] [cursor=pointer]:
              - /url: /companies/c1b74460-b40a-4f99-8775-5644eecbcf92
              - generic [ref=f2e81]:
                - text: Digital Labs
                - generic [ref=f2e82]: Finance
                - generic [ref=f2e83]: 597 Pine 533, Arlington 5628
                - generic [ref=f2e84]: www.digitallabs.com
          - listitem [ref=f2e85]:
            - link "Rapid Partners Telecommunications 29 Oak 402, Springfield 7525 www.rapidpartners.com" [ref=f2e86] [cursor=pointer]:
              - /url: /companies/5e1b47a7-501b-4eca-be9a-64ce2ccd8531
              - generic [ref=f2e87]:
                - text: Rapid Partners
                - generic [ref=f2e88]: Telecommunications
                - generic [ref=f2e89]: 29 Oak 402, Springfield 7525
                - generic [ref=f2e90]: www.rapidpartners.com
          - listitem [ref=f2e91]:
            - link "Digital Systems Manufacturing 757 Main 305, Madison 1580 www.digitalsystems.com" [ref=f2e92] [cursor=pointer]:
              - /url: /companies/f1fa01ee-5cef-40a7-8619-c8d42fa042f4
              - generic [ref=f2e93]:
                - text: Digital Systems
                - generic [ref=f2e94]: Manufacturing
                - generic [ref=f2e95]: 757 Main 305, Madison 1580
                - generic [ref=f2e96]: www.digitalsystems.com
          - listitem [ref=f2e97]:
            - link "Rapid Labs Healthcare 857 Broadway 74, Springfield 7786 www.rapidlabs.com" [ref=f2e98] [cursor=pointer]:
              - /url: /companies/ff63a9f9-f68d-4c01-aec5-913bb5b5f08a
              - generic [ref=f2e99]:
                - text: Rapid Labs
                - generic [ref=f2e100]: Healthcare
                - generic [ref=f2e101]: 857 Broadway 74, Springfield 7786
                - generic [ref=f2e102]: www.rapidlabs.com
          - listitem [ref=f2e103]:
            - link "Rapid Systems Telecommunications 600 Main 173, Madison 2777 www.rapidsystems.com" [ref=f2e104] [cursor=pointer]:
              - /url: /companies/57088519-6303-49ef-bd26-3dbf3ac0c300
              - generic [ref=f2e105]:
                - text: Rapid Systems
                - generic [ref=f2e106]: Telecommunications
                - generic [ref=f2e107]: 600 Main 173, Madison 2777
                - generic [ref=f2e108]: www.rapidsystems.com
          - listitem [ref=f2e109]:
            - link "Next Enterprises Retail 182 Oak 403, Salem 6116 www.nextenterprises.com" [ref=f2e110] [cursor=pointer]:
              - /url: /companies/0be91e55-850a-4e94-903e-287c17e9f8d1
              - generic [ref=f2e111]:
                - text: Next Enterprises
                - generic [ref=f2e112]: Retail
                - generic [ref=f2e113]: 182 Oak 403, Salem 6116
                - generic [ref=f2e114]: www.nextenterprises.com
          - listitem [ref=f2e115]:
            - link "Digital Partners Manufacturing 181 Main 282, Portland 8312 www.digitalpartners.com" [ref=f2e116] [cursor=pointer]:
              - /url: /companies/93cc6b8d-1021-4361-b91b-536ea813c398
              - generic [ref=f2e117]:
                - text: Digital Partners
                - generic [ref=f2e118]: Manufacturing
                - generic [ref=f2e119]: 181 Main 282, Portland 8312
                - generic [ref=f2e120]: www.digitalpartners.com
          - listitem [ref=f2e121]:
            - link "Prime Holdings Real Estate 842 Oak 201, Arlington 1738 www.primeholdings.com" [ref=f2e122] [cursor=pointer]:
              - /url: /companies/0968aa05-9e7e-4e0a-a748-f01c96c09a8b
              - generic [ref=f2e123]:
                - text: Prime Holdings
                - generic [ref=f2e124]: Real Estate
                - generic [ref=f2e125]: 842 Oak 201, Arlington 1738
                - generic [ref=f2e126]: www.primeholdings.com
          - listitem [ref=f2e127]:
            - link "Prime Group Finance 729 Market 848, Portland 7684 www.primegroup.com" [ref=f2e128] [cursor=pointer]:
              - /url: /companies/cd89184d-b77c-4129-ba34-5eb8742b9d55
              - generic [ref=f2e129]:
                - text: Prime Group
                - generic [ref=f2e130]: Finance
                - generic [ref=f2e131]: 729 Market 848, Portland 7684
                - generic [ref=f2e132]: www.primegroup.com
```