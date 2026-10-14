# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-list.spec.ts >> Contact List Tests >> contact card is clickable
- Location: tests/e2e/contacts/contact-list.spec.ts:37:3

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
            - link "Rachel Cox rachel.cox@example.com +1-928-630-8888" [ref=f2e74] [cursor=pointer]:
              - /url: /contacts/fec661fc-5c5c-4ff2-89fe-cfdeaebc0322
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Rachel Cox
                - generic [ref=f2e77]: rachel.cox@example.com
                - generic [ref=f2e78]: +1-928-630-8888
          - listitem [ref=f2e79]:
            - 'link "Charles Wells charles.wells@example.com +1-603-479-7133 Company: e8b611b4-bc90-4436-be3d-73e931adf757" [ref=f2e80] [cursor=pointer]':
              - /url: /contacts/cc6d182e-c3a6-46e8-a287-4a8385d071c8
              - generic [ref=f2e81]:
                - generic [ref=f2e82]: Charles Wells
                - generic [ref=f2e83]: charles.wells@example.com
                - generic [ref=f2e84]: +1-603-479-7133
                - generic [ref=f2e85]: "Company: e8b611b4-bc90-4436-be3d-73e931adf757"
          - listitem [ref=f2e86]:
            - link "Michael Torres michael.torres@example.com +1-921-498-1751" [ref=f2e87] [cursor=pointer]:
              - /url: /contacts/a65a499f-8d4c-4381-bfbe-b7c7d16684eb
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: Michael Torres
                - generic [ref=f2e90]: michael.torres@example.com
                - generic [ref=f2e91]: +1-921-498-1751
          - listitem [ref=f2e92]:
            - 'link "Jerry Wilson jerry.wilson@example.com +1-892-309-7767 Company: 0a742972-76e5-49a3-8dad-17f9a4fa6e07" [ref=f2e93] [cursor=pointer]':
              - /url: /contacts/d1561db9-2555-4bfe-a545-216150a3c0e1
              - generic [ref=f2e94]:
                - generic [ref=f2e95]: Jerry Wilson
                - generic [ref=f2e96]: jerry.wilson@example.com
                - generic [ref=f2e97]: +1-892-309-7767
                - generic [ref=f2e98]: "Company: 0a742972-76e5-49a3-8dad-17f9a4fa6e07"
          - listitem [ref=f2e99]:
            - 'link "Michelle Hernandez michelle.hernandez@example.com +1-508-632-3954 Company: a7c6882e-45ea-4bf3-8f37-ba4684b9cdd8" [ref=f2e100] [cursor=pointer]':
              - /url: /contacts/ff0becf7-780a-4581-a25e-63c9d86f67a6
              - generic [ref=f2e101]:
                - generic [ref=f2e102]: Michelle Hernandez
                - generic [ref=f2e103]: michelle.hernandez@example.com
                - generic [ref=f2e104]: +1-508-632-3954
                - generic [ref=f2e105]: "Company: a7c6882e-45ea-4bf3-8f37-ba4684b9cdd8"
          - listitem [ref=f2e106]:
            - link "Joshua Wells joshua.wells@example.com +1-264-449-7603" [ref=f2e107] [cursor=pointer]:
              - /url: /contacts/6cd9e4c0-4a90-4b6a-9465-b6d95006b5fc
              - generic [ref=f2e108]:
                - generic [ref=f2e109]: Joshua Wells
                - generic [ref=f2e110]: joshua.wells@example.com
                - generic [ref=f2e111]: +1-264-449-7603
          - listitem [ref=f2e112]:
            - 'link "Amy Hughes amy.hughes@example.com +1-672-603-1919 Company: 5dc3129f-5f0d-43c0-af17-5c6723fb9e9b" [ref=f2e113] [cursor=pointer]':
              - /url: /contacts/3814b231-ad6e-4339-91cd-ec3d983a0245
              - generic [ref=f2e114]:
                - generic [ref=f2e115]: Amy Hughes
                - generic [ref=f2e116]: amy.hughes@example.com
                - generic [ref=f2e117]: +1-672-603-1919
                - generic [ref=f2e118]: "Company: 5dc3129f-5f0d-43c0-af17-5c6723fb9e9b"
          - listitem [ref=f2e119]:
            - 'link "Emily Hayes emily.hayes@example.com +1-895-512-9067 Company: 697c4dcf-4f5c-47e4-864b-0e1544905644" [ref=f2e120] [cursor=pointer]':
              - /url: /contacts/ddcb54cb-617d-46c6-9db0-13464fa4de32
              - generic [ref=f2e121]:
                - generic [ref=f2e122]: Emily Hayes
                - generic [ref=f2e123]: emily.hayes@example.com
                - generic [ref=f2e124]: +1-895-512-9067
                - generic [ref=f2e125]: "Company: 697c4dcf-4f5c-47e4-864b-0e1544905644"
          - listitem [ref=f2e126]:
            - link "Douglas Jackson douglas.jackson@example.com +1-498-379-5388" [ref=f2e127] [cursor=pointer]:
              - /url: /contacts/c1d0fa95-608a-402e-98ac-738cfadfc02a
              - generic [ref=f2e128]:
                - generic [ref=f2e129]: Douglas Jackson
                - generic [ref=f2e130]: douglas.jackson@example.com
                - generic [ref=f2e131]: +1-498-379-5388
          - listitem [ref=f2e132]:
            - 'link "George Bowman george.bowman@example.com +1-521-638-5098 Company: e1fd1c41-1b32-4c00-97fd-7dc6cbbc2733" [ref=f2e133] [cursor=pointer]':
              - /url: /contacts/237ddaf2-471e-4ff7-96c4-427665d0deed
              - generic [ref=f2e134]:
                - generic [ref=f2e135]: George Bowman
                - generic [ref=f2e136]: george.bowman@example.com
                - generic [ref=f2e137]: +1-521-638-5098
                - generic [ref=f2e138]: "Company: e1fd1c41-1b32-4c00-97fd-7dc6cbbc2733"
```