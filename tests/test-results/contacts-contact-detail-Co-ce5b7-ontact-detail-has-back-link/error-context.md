# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-detail.spec.ts >> Contact Detail Tests >> contact detail has back link
- Location: tests/e2e/contacts/contact-detail.spec.ts:60:3

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
          - heading "Contacts" [level=1] [ref=f2e64]
          - link "Create Contact" [ref=f2e65] [cursor=pointer]:
            - /url: /contacts/new
        - generic [ref=f2e66]:
          - textbox "Search contacts..." [ref=f2e67]
          - button "Quick Add" [ref=f2e69]
        - list [ref=f2e72]:
          - listitem [ref=f2e73]:
            - 'link "Betty Ellis betty.ellis@example.com +1-415-498-3973 Company: e8f0b0ea-9a08-452a-9d58-5da4f3429394" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/22cf8413-c7ad-4fe3-92a0-ce259d934350
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Betty Ellis
                - generic [ref=f2e77]: betty.ellis@example.com
                - generic [ref=f2e78]: +1-415-498-3973
                - generic [ref=f2e79]: "Company: e8f0b0ea-9a08-452a-9d58-5da4f3429394"
          - listitem [ref=f2e80]:
            - link "Amy Reyes amy.reyes@example.com +1-405-701-8518" [ref=f2e81] [cursor=pointer]:
              - /url: /contacts/59137084-5108-48a5-9c00-af08caaac20a
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: Amy Reyes
                - generic [ref=f2e84]: amy.reyes@example.com
                - generic [ref=f2e85]: +1-405-701-8518
          - listitem [ref=f2e86]:
            - 'link "Eleanor Henderson eleanor.henderson@example.com +1-632-814-7426 Company: b86b6a65-98ab-4aee-899d-890e73655faa" [ref=f2e87] [cursor=pointer]':
              - /url: /contacts/e9928315-4761-4528-a051-e78fcadb0cd4
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: Eleanor Henderson
                - generic [ref=f2e90]: eleanor.henderson@example.com
                - generic [ref=f2e91]: +1-632-814-7426
                - generic [ref=f2e92]: "Company: b86b6a65-98ab-4aee-899d-890e73655faa"
          - listitem [ref=f2e93]:
            - link "Christopher Torres christopher.torres@example.com +1-696-678-6135" [ref=f2e94] [cursor=pointer]:
              - /url: /contacts/6a32e8dc-8444-4876-90d5-ccf4696de798
              - generic [ref=f2e95]:
                - generic [ref=f2e96]: Christopher Torres
                - generic [ref=f2e97]: christopher.torres@example.com
                - generic [ref=f2e98]: +1-696-678-6135
          - listitem [ref=f2e99]:
            - link "Jeffrey Mendoza jeffrey.mendoza@example.com +1-264-777-8956" [ref=f2e100] [cursor=pointer]:
              - /url: /contacts/fa2c2697-a565-4b0a-b4e1-e5d8fbc29be9
              - generic [ref=f2e101]:
                - generic [ref=f2e102]: Jeffrey Mendoza
                - generic [ref=f2e103]: jeffrey.mendoza@example.com
                - generic [ref=f2e104]: +1-264-777-8956
          - listitem [ref=f2e105]:
            - link "Daniel Howard daniel.howard@example.com +1-541-571-8244" [ref=f2e106] [cursor=pointer]:
              - /url: /contacts/91954f01-02e9-4d9d-ad26-b134e1372dc4
              - generic [ref=f2e107]:
                - generic [ref=f2e108]: Daniel Howard
                - generic [ref=f2e109]: daniel.howard@example.com
                - generic [ref=f2e110]: +1-541-571-8244
          - listitem [ref=f2e111]:
            - 'link "Kimberly Cole kimberly.cole@example.com +1-219-828-2888 Company: 5d2c9ef0-c3ec-4554-8fa9-454a0bdb90d3" [ref=f2e112] [cursor=pointer]':
              - /url: /contacts/5a2d3846-1600-48c1-ace9-f305f1d7f8bc
              - generic [ref=f2e113]:
                - generic [ref=f2e114]: Kimberly Cole
                - generic [ref=f2e115]: kimberly.cole@example.com
                - generic [ref=f2e116]: +1-219-828-2888
                - generic [ref=f2e117]: "Company: 5d2c9ef0-c3ec-4554-8fa9-454a0bdb90d3"
          - listitem [ref=f2e118]:
            - link "Angela Hernandez angela.hernandez@example.com +1-309-713-7025" [ref=f2e119] [cursor=pointer]:
              - /url: /contacts/57c1777b-7a8f-41d9-9886-999c3d5eafcc
              - generic [ref=f2e120]:
                - generic [ref=f2e121]: Angela Hernandez
                - generic [ref=f2e122]: angela.hernandez@example.com
                - generic [ref=f2e123]: +1-309-713-7025
          - listitem [ref=f2e124]:
            - 'link "Harold Lewis harold.lewis@example.com +1-672-486-1869 Company: 856bdb58-6933-4db3-8688-e919af6affad" [ref=f2e125] [cursor=pointer]':
              - /url: /contacts/d74474b2-e78a-45a3-a77b-0d563ec52d76
              - generic [ref=f2e126]:
                - generic [ref=f2e127]: Harold Lewis
                - generic [ref=f2e128]: harold.lewis@example.com
                - generic [ref=f2e129]: +1-672-486-1869
                - generic [ref=f2e130]: "Company: 856bdb58-6933-4db3-8688-e919af6affad"
          - listitem [ref=f2e131]:
            - 'link "Ronald Jackson ronald.jackson@example.com +1-496-710-7107 Company: 34a27d5c-ce2a-45f7-898f-80ed8038e32e" [ref=f2e132] [cursor=pointer]':
              - /url: /contacts/9b170865-bde8-4a83-be2a-fe54771fe4be
              - generic [ref=f2e133]:
                - generic [ref=f2e134]: Ronald Jackson
                - generic [ref=f2e135]: ronald.jackson@example.com
                - generic [ref=f2e136]: +1-496-710-7107
                - generic [ref=f2e137]: "Company: 34a27d5c-ce2a-45f7-898f-80ed8038e32e"
```