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
            - 'link "Eleanor Harrison eleanor.harrison@example.com +1-641-328-6106 Company: 8e8d5e61-ba06-4a1e-896c-e6065031683b" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/9d984700-d73d-4a0e-8e44-1d17e972e7a7
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Eleanor Harrison
                - generic [ref=f2e77]: eleanor.harrison@example.com
                - generic [ref=f2e78]: +1-641-328-6106
                - generic [ref=f2e79]: "Company: 8e8d5e61-ba06-4a1e-896c-e6065031683b"
          - listitem [ref=f2e80]:
            - link "Daniel Miller daniel.miller@example.com +1-880-440-2818" [ref=f2e81] [cursor=pointer]:
              - /url: /contacts/95415d9e-0d55-451e-94b9-e4a66af3454e
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: Daniel Miller
                - generic [ref=f2e84]: daniel.miller@example.com
                - generic [ref=f2e85]: +1-880-440-2818
          - listitem [ref=f2e86]:
            - link "Michelle Davidson michelle.davidson@example.com +1-202-423-8317" [ref=f2e87] [cursor=pointer]:
              - /url: /contacts/bc47c93d-a52c-40b1-8a77-4a52ce1bd9ad
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: Michelle Davidson
                - generic [ref=f2e90]: michelle.davidson@example.com
                - generic [ref=f2e91]: +1-202-423-8317
          - listitem [ref=f2e92]:
            - 'link "Rachel Hernandez rachel.hernandez@example.com +1-732-483-7556 Company: 9e450547-5c03-42a9-81b6-2d5565ca67b7" [ref=f2e93] [cursor=pointer]':
              - /url: /contacts/e425a8d0-16c3-4f1e-b79e-83d205cee8f2
              - generic [ref=f2e94]:
                - generic [ref=f2e95]: Rachel Hernandez
                - generic [ref=f2e96]: rachel.hernandez@example.com
                - generic [ref=f2e97]: +1-732-483-7556
                - generic [ref=f2e98]: "Company: 9e450547-5c03-42a9-81b6-2d5565ca67b7"
          - listitem [ref=f2e99]:
            - 'link "Angela Bailey angela.bailey@example.com +1-363-259-9925 Company: 5c9b3ec2-a14a-44a7-930b-912314e3d788" [ref=f2e100] [cursor=pointer]':
              - /url: /contacts/e2f2f09e-de34-43da-9998-92e3f7b58be7
              - generic [ref=f2e101]:
                - generic [ref=f2e102]: Angela Bailey
                - generic [ref=f2e103]: angela.bailey@example.com
                - generic [ref=f2e104]: +1-363-259-9925
                - generic [ref=f2e105]: "Company: 5c9b3ec2-a14a-44a7-930b-912314e3d788"
          - listitem [ref=f2e106]:
            - link "Diane Harrison diane.harrison@example.com +1-411-246-8187" [ref=f2e107] [cursor=pointer]:
              - /url: /contacts/b1fea8a2-f645-4b05-83ff-0e67c7ca6508
              - generic [ref=f2e108]:
                - generic [ref=f2e109]: Diane Harrison
                - generic [ref=f2e110]: diane.harrison@example.com
                - generic [ref=f2e111]: +1-411-246-8187
          - listitem [ref=f2e112]:
            - 'link "Christopher Scott christopher.scott@example.com +1-851-332-3037 Company: 1843cdb6-8fe6-4754-b36e-ea4251128249" [ref=f2e113] [cursor=pointer]':
              - /url: /contacts/875dd916-2379-43af-b21d-e5297e413454
              - generic [ref=f2e114]:
                - generic [ref=f2e115]: Christopher Scott
                - generic [ref=f2e116]: christopher.scott@example.com
                - generic [ref=f2e117]: +1-851-332-3037
                - generic [ref=f2e118]: "Company: 1843cdb6-8fe6-4754-b36e-ea4251128249"
          - listitem [ref=f2e119]:
            - link "James Hayes james.hayes@example.com +1-746-867-4237" [ref=f2e120] [cursor=pointer]:
              - /url: /contacts/c0cc47fa-ad58-4f36-a12e-d0975b319c1d
              - generic [ref=f2e121]:
                - generic [ref=f2e122]: James Hayes
                - generic [ref=f2e123]: james.hayes@example.com
                - generic [ref=f2e124]: +1-746-867-4237
          - listitem [ref=f2e125]:
            - 'link "Michelle Brown michelle.brown@example.com +1-471-736-7275 Company: 0f0faa5d-28a1-44fc-a387-6215af01bbe3" [ref=f2e126] [cursor=pointer]':
              - /url: /contacts/9aebbff4-4ce4-42d6-afab-42ac220a7f73
              - generic [ref=f2e127]:
                - generic [ref=f2e128]: Michelle Brown
                - generic [ref=f2e129]: michelle.brown@example.com
                - generic [ref=f2e130]: +1-471-736-7275
                - generic [ref=f2e131]: "Company: 0f0faa5d-28a1-44fc-a387-6215af01bbe3"
          - listitem [ref=f2e132]:
            - 'link "Kathleen Gibson kathleen.gibson@example.com +1-785-949-1326 Company: a386d720-5439-482c-8790-f530ed38fa9f" [ref=f2e133] [cursor=pointer]':
              - /url: /contacts/7746a635-3f5f-4675-8785-12857d452775
              - generic [ref=f2e134]:
                - generic [ref=f2e135]: Kathleen Gibson
                - generic [ref=f2e136]: kathleen.gibson@example.com
                - generic [ref=f2e137]: +1-785-949-1326
                - generic [ref=f2e138]: "Company: a386d720-5439-482c-8790-f530ed38fa9f"
```