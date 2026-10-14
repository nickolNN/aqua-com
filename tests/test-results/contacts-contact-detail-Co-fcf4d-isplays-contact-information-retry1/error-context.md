# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-detail.spec.ts >> Contact Detail Tests >> contact detail displays contact information
- Location: tests/e2e/contacts/contact-detail.spec.ts:18:3

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
            - link "Deborah Wagner deborah.wagner@example.com +1-781-822-1987" [ref=f2e74] [cursor=pointer]:
              - /url: /contacts/12755f64-9b65-4060-a063-291598387220
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Deborah Wagner
                - generic [ref=f2e77]: deborah.wagner@example.com
                - generic [ref=f2e78]: +1-781-822-1987
          - listitem [ref=f2e79]:
            - 'link "Patricia Hunter patricia.hunter@example.com +1-918-737-8517 Company: 95463cbf-4b62-4746-85a4-760c2d942fd3" [ref=f2e80] [cursor=pointer]':
              - /url: /contacts/98b38681-bcf7-46c1-95cd-a60e89000800
              - generic [ref=f2e81]:
                - generic [ref=f2e82]: Patricia Hunter
                - generic [ref=f2e83]: patricia.hunter@example.com
                - generic [ref=f2e84]: +1-918-737-8517
                - generic [ref=f2e85]: "Company: 95463cbf-4b62-4746-85a4-760c2d942fd3"
          - listitem [ref=f2e86]:
            - 'link "Andrew Burke andrew.burke@example.com +1-615-464-5313 Company: 18b27491-9476-4a08-b6e1-7f55f41896b7" [ref=f2e87] [cursor=pointer]':
              - /url: /contacts/bb2a8f2e-11ca-4562-80bf-bc1baf56622f
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: Andrew Burke
                - generic [ref=f2e90]: andrew.burke@example.com
                - generic [ref=f2e91]: +1-615-464-5313
                - generic [ref=f2e92]: "Company: 18b27491-9476-4a08-b6e1-7f55f41896b7"
          - listitem [ref=f2e93]:
            - link "Christopher Brown christopher.brown@example.com +1-589-218-8239" [ref=f2e94] [cursor=pointer]:
              - /url: /contacts/8781d09e-bd3b-4d21-a140-a368443278ac
              - generic [ref=f2e95]:
                - generic [ref=f2e96]: Christopher Brown
                - generic [ref=f2e97]: christopher.brown@example.com
                - generic [ref=f2e98]: +1-589-218-8239
          - listitem [ref=f2e99]:
            - link "Stephanie Bradley stephanie.bradley@example.com +1-388-989-6592" [ref=f2e100] [cursor=pointer]:
              - /url: /contacts/c0635829-8a3d-45ca-8a90-2294123da5e5
              - generic [ref=f2e101]:
                - generic [ref=f2e102]: Stephanie Bradley
                - generic [ref=f2e103]: stephanie.bradley@example.com
                - generic [ref=f2e104]: +1-388-989-6592
          - listitem [ref=f2e105]:
            - 'link "Jeffrey Gibson jeffrey.gibson@example.com +1-254-628-8276 Company: b177194c-a1e7-4da3-a185-f39a950729fe" [ref=f2e106] [cursor=pointer]':
              - /url: /contacts/775abb70-6677-4f6b-bf96-e6f62850fdcf
              - generic [ref=f2e107]:
                - generic [ref=f2e108]: Jeffrey Gibson
                - generic [ref=f2e109]: jeffrey.gibson@example.com
                - generic [ref=f2e110]: +1-254-628-8276
                - generic [ref=f2e111]: "Company: b177194c-a1e7-4da3-a185-f39a950729fe"
          - listitem [ref=f2e112]:
            - link "Michelle Fisher michelle.fisher@example.com +1-808-418-1902" [ref=f2e113] [cursor=pointer]:
              - /url: /contacts/9a18223c-82da-47ea-9c13-28f09c307628
              - generic [ref=f2e114]:
                - generic [ref=f2e115]: Michelle Fisher
                - generic [ref=f2e116]: michelle.fisher@example.com
                - generic [ref=f2e117]: +1-808-418-1902
          - listitem [ref=f2e118]:
            - link "Kathleen Rodriguez kathleen.rodriguez@example.com +1-649-669-6991" [ref=f2e119] [cursor=pointer]:
              - /url: /contacts/5b084da8-bbfc-451f-bad1-06cdede8be7f
              - generic [ref=f2e120]:
                - generic [ref=f2e121]: Kathleen Rodriguez
                - generic [ref=f2e122]: kathleen.rodriguez@example.com
                - generic [ref=f2e123]: +1-649-669-6991
          - listitem [ref=f2e124]:
            - 'link "Elizabeth Brooks elizabeth.brooks@example.com +1-521-347-7864 Company: 46273ee3-52de-43d8-9669-816661bcae62" [ref=f2e125] [cursor=pointer]':
              - /url: /contacts/968becac-4bec-44c4-ba6a-eb218aaa3a16
              - generic [ref=f2e126]:
                - generic [ref=f2e127]: Elizabeth Brooks
                - generic [ref=f2e128]: elizabeth.brooks@example.com
                - generic [ref=f2e129]: +1-521-347-7864
                - generic [ref=f2e130]: "Company: 46273ee3-52de-43d8-9669-816661bcae62"
          - listitem [ref=f2e131]:
            - 'link "Patricia Ellis patricia.ellis@example.com +1-292-954-1837 Company: d11ed790-f574-45b2-8ac8-90bba83283c9" [ref=f2e132] [cursor=pointer]':
              - /url: /contacts/940e1fa6-38be-4d69-9793-d89a23d8dda1
              - generic [ref=f2e133]:
                - generic [ref=f2e134]: Patricia Ellis
                - generic [ref=f2e135]: patricia.ellis@example.com
                - generic [ref=f2e136]: +1-292-954-1837
                - generic [ref=f2e137]: "Company: d11ed790-f574-45b2-8ac8-90bba83283c9"
```