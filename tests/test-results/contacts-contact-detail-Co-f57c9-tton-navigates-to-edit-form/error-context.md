# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-detail.spec.ts >> Contact Detail Tests >> edit contact button navigates to edit form
- Location: tests/e2e/contacts/contact-detail.spec.ts:47:3

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
            - link "Mary Hayes mary.hayes@example.com +1-458-639-2334" [ref=f2e74] [cursor=pointer]:
              - /url: /contacts/ca5d1c78-7e7c-4f22-8b88-4cdcb8d5eb3a
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Mary Hayes
                - generic [ref=f2e77]: mary.hayes@example.com
                - generic [ref=f2e78]: +1-458-639-2334
          - listitem [ref=f2e79]:
            - 'link "Susan Fleming susan.fleming@example.com +1-591-884-3318 Company: 7304fc88-2b3e-4f28-bf9b-d67e6425f7f0" [ref=f2e80] [cursor=pointer]':
              - /url: /contacts/062bac65-3587-4423-b8bd-032eed0eb3f0
              - generic [ref=f2e81]:
                - generic [ref=f2e82]: Susan Fleming
                - generic [ref=f2e83]: susan.fleming@example.com
                - generic [ref=f2e84]: +1-591-884-3318
                - generic [ref=f2e85]: "Company: 7304fc88-2b3e-4f28-bf9b-d67e6425f7f0"
          - listitem [ref=f2e86]:
            - 'link "Nancy King nancy.king@example.com +1-701-601-4489 Company: 06f55b31-de32-4ef6-8bc9-42710a1815b5" [ref=f2e87] [cursor=pointer]':
              - /url: /contacts/47fb694c-0c43-4afc-a03c-a283fe96a2cf
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: Nancy King
                - generic [ref=f2e90]: nancy.king@example.com
                - generic [ref=f2e91]: +1-701-601-4489
                - generic [ref=f2e92]: "Company: 06f55b31-de32-4ef6-8bc9-42710a1815b5"
          - listitem [ref=f2e93]:
            - link "Kevin Wells kevin.wells@example.com +1-914-280-5204" [ref=f2e94] [cursor=pointer]:
              - /url: /contacts/6b14601e-87b1-408b-9d9f-97d92d906cd2
              - generic [ref=f2e95]:
                - generic [ref=f2e96]: Kevin Wells
                - generic [ref=f2e97]: kevin.wells@example.com
                - generic [ref=f2e98]: +1-914-280-5204
          - listitem [ref=f2e99]:
            - 'link "Charles Morris charles.morris@example.com +1-716-231-3790 Company: aa2d765a-f7f5-44ce-960a-dd343e707b87" [ref=f2e100] [cursor=pointer]':
              - /url: /contacts/900d9580-87ed-4ad7-b75e-f29656fbe548
              - generic [ref=f2e101]:
                - generic [ref=f2e102]: Charles Morris
                - generic [ref=f2e103]: charles.morris@example.com
                - generic [ref=f2e104]: +1-716-231-3790
                - generic [ref=f2e105]: "Company: aa2d765a-f7f5-44ce-960a-dd343e707b87"
          - listitem [ref=f2e106]:
            - link "Douglas Perez douglas.perez@example.com +1-519-263-8700" [ref=f2e107] [cursor=pointer]:
              - /url: /contacts/11f2da7f-faf7-423b-8cec-f76e25a834ba
              - generic [ref=f2e108]:
                - generic [ref=f2e109]: Douglas Perez
                - generic [ref=f2e110]: douglas.perez@example.com
                - generic [ref=f2e111]: +1-519-263-8700
          - listitem [ref=f2e112]:
            - 'link "David Hughes david.hughes@example.com +1-648-857-7696 Company: dcdff07e-6ee5-4eff-b25d-371c61971af6" [ref=f2e113] [cursor=pointer]':
              - /url: /contacts/730cfd5d-41e4-4466-8429-05540792e18b
              - generic [ref=f2e114]:
                - generic [ref=f2e115]: David Hughes
                - generic [ref=f2e116]: david.hughes@example.com
                - generic [ref=f2e117]: +1-648-857-7696
                - generic [ref=f2e118]: "Company: dcdff07e-6ee5-4eff-b25d-371c61971af6"
          - listitem [ref=f2e119]:
            - 'link "Thomas Cole thomas.cole@example.com +1-212-688-6267 Company: 69119a0c-9e84-4e85-90fa-0d2acc17ecd7" [ref=f2e120] [cursor=pointer]':
              - /url: /contacts/40ba5f29-f8eb-4dae-b66e-2815802f60b5
              - generic [ref=f2e121]:
                - generic [ref=f2e122]: Thomas Cole
                - generic [ref=f2e123]: thomas.cole@example.com
                - generic [ref=f2e124]: +1-212-688-6267
                - generic [ref=f2e125]: "Company: 69119a0c-9e84-4e85-90fa-0d2acc17ecd7"
          - listitem [ref=f2e126]:
            - link "Susan Owens susan.owens@example.com +1-786-858-5093" [ref=f2e127] [cursor=pointer]:
              - /url: /contacts/6e771edc-d394-474f-a0dd-f1611f3237fc
              - generic [ref=f2e128]:
                - generic [ref=f2e129]: Susan Owens
                - generic [ref=f2e130]: susan.owens@example.com
                - generic [ref=f2e131]: +1-786-858-5093
          - listitem [ref=f2e132]:
            - 'link "Laura Thompson laura.thompson@example.com +1-410-799-1303 Company: a2a4dd19-456b-4e0c-b677-57cb716cfa43" [ref=f2e133] [cursor=pointer]':
              - /url: /contacts/02b59043-457e-407d-9aba-dbf0e596a702
              - generic [ref=f2e134]:
                - generic [ref=f2e135]: Laura Thompson
                - generic [ref=f2e136]: laura.thompson@example.com
                - generic [ref=f2e137]: +1-410-799-1303
                - generic [ref=f2e138]: "Company: a2a4dd19-456b-4e0c-b677-57cb716cfa43"
```