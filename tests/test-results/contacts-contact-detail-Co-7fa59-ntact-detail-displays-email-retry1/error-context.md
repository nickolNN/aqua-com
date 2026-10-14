# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-detail.spec.ts >> Contact Detail Tests >> contact detail displays email
- Location: tests/e2e/contacts/contact-detail.spec.ts:27:3

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
            - 'link "Mark Young mark.young@example.com +1-844-384-1939 Company: 43de2912-a7b1-4139-817f-604df836005a" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/2c519b54-f7a7-4c9e-b846-fcf3cacc53dc
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Mark Young
                - generic [ref=f2e77]: mark.young@example.com
                - generic [ref=f2e78]: +1-844-384-1939
                - generic [ref=f2e79]: "Company: 43de2912-a7b1-4139-817f-604df836005a"
          - listitem [ref=f2e80]:
            - 'link "Diane Johnson diane.johnson@example.com +1-702-587-8916 Company: 3dd413ae-e636-4162-bac6-444f409e55c3" [ref=f2e81] [cursor=pointer]':
              - /url: /contacts/c9e74cf5-261b-41e6-be27-4cb88b07278f
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: Diane Johnson
                - generic [ref=f2e84]: diane.johnson@example.com
                - generic [ref=f2e85]: +1-702-587-8916
                - generic [ref=f2e86]: "Company: 3dd413ae-e636-4162-bac6-444f409e55c3"
          - listitem [ref=f2e87]:
            - 'link "Daniel Rivera daniel.rivera@example.com +1-544-909-6168 Company: 8910bf85-7d78-41b2-9f6e-1a14d9bd1b43" [ref=f2e88] [cursor=pointer]':
              - /url: /contacts/1060108e-533a-4b18-939f-772e94a5be04
              - generic [ref=f2e89]:
                - generic [ref=f2e90]: Daniel Rivera
                - generic [ref=f2e91]: daniel.rivera@example.com
                - generic [ref=f2e92]: +1-544-909-6168
                - generic [ref=f2e93]: "Company: 8910bf85-7d78-41b2-9f6e-1a14d9bd1b43"
          - listitem [ref=f2e94]:
            - 'link "Michael Jackson michael.jackson@example.com +1-466-748-6374 Company: eaf75812-b5ef-44dc-ab5f-e8ccc1095685" [ref=f2e95] [cursor=pointer]':
              - /url: /contacts/df34e06b-443c-4a21-ac95-b070a799c54b
              - generic [ref=f2e96]:
                - generic [ref=f2e97]: Michael Jackson
                - generic [ref=f2e98]: michael.jackson@example.com
                - generic [ref=f2e99]: +1-466-748-6374
                - generic [ref=f2e100]: "Company: eaf75812-b5ef-44dc-ab5f-e8ccc1095685"
          - listitem [ref=f2e101]:
            - 'link "Amber Rivera amber.rivera@example.com +1-690-272-2609 Company: c32bec9d-41a1-4bb1-8fff-24c1b0dc0a97" [ref=f2e102] [cursor=pointer]':
              - /url: /contacts/9cf5653b-dc32-422a-939b-afb65cd42c46
              - generic [ref=f2e103]:
                - generic [ref=f2e104]: Amber Rivera
                - generic [ref=f2e105]: amber.rivera@example.com
                - generic [ref=f2e106]: +1-690-272-2609
                - generic [ref=f2e107]: "Company: c32bec9d-41a1-4bb1-8fff-24c1b0dc0a97"
          - listitem [ref=f2e108]:
            - link "Megan Bailey megan.bailey@example.com +1-405-350-2186" [ref=f2e109] [cursor=pointer]:
              - /url: /contacts/e089062b-65dc-4893-881f-9acb51243909
              - generic [ref=f2e110]:
                - generic [ref=f2e111]: Megan Bailey
                - generic [ref=f2e112]: megan.bailey@example.com
                - generic [ref=f2e113]: +1-405-350-2186
          - listitem [ref=f2e114]:
            - link "Michael Jordan michael.jordan@example.com +1-979-718-4674" [ref=f2e115] [cursor=pointer]:
              - /url: /contacts/cac3f25d-7b8d-4cd6-bae2-caca12d69173
              - generic [ref=f2e116]:
                - generic [ref=f2e117]: Michael Jordan
                - generic [ref=f2e118]: michael.jordan@example.com
                - generic [ref=f2e119]: +1-979-718-4674
          - listitem [ref=f2e120]:
            - link "Samantha Wells samantha.wells@example.com +1-353-769-2842" [ref=f2e121] [cursor=pointer]:
              - /url: /contacts/227a6e1a-399d-4bce-9e82-fe31ba327384
              - generic [ref=f2e122]:
                - generic [ref=f2e123]: Samantha Wells
                - generic [ref=f2e124]: samantha.wells@example.com
                - generic [ref=f2e125]: +1-353-769-2842
          - listitem [ref=f2e126]:
            - 'link "Kathleen Myers kathleen.myers@example.com +1-646-647-3038 Company: 0f93ae3e-19d0-4486-87ad-4ce1ebaaff9c" [ref=f2e127] [cursor=pointer]':
              - /url: /contacts/da534e65-a148-4397-a827-0feafb72fa61
              - generic [ref=f2e128]:
                - generic [ref=f2e129]: Kathleen Myers
                - generic [ref=f2e130]: kathleen.myers@example.com
                - generic [ref=f2e131]: +1-646-647-3038
                - generic [ref=f2e132]: "Company: 0f93ae3e-19d0-4486-87ad-4ce1ebaaff9c"
          - listitem [ref=f2e133]:
            - 'link "Ronald Hernandez ronald.hernandez@example.com +1-928-671-7469 Company: c1c29a60-0d8b-4a65-b666-cc4c225d97ff" [ref=f2e134] [cursor=pointer]':
              - /url: /contacts/16094559-1ce3-4976-af02-8f96f5d3a81f
              - generic [ref=f2e135]:
                - generic [ref=f2e136]: Ronald Hernandez
                - generic [ref=f2e137]: ronald.hernandez@example.com
                - generic [ref=f2e138]: +1-928-671-7469
                - generic [ref=f2e139]: "Company: c1c29a60-0d8b-4a65-b666-cc4c225d97ff"
```