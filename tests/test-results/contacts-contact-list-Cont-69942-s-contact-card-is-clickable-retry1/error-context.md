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
            - 'link "Amber Lawson amber.lawson@example.com +1-676-211-6731 Company: 86563b6f-a0b4-41ff-8668-a4c2eb630fbe" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/773b33cc-5dcf-4231-a643-934a7f9861cc
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Amber Lawson
                - generic [ref=f2e77]: amber.lawson@example.com
                - generic [ref=f2e78]: +1-676-211-6731
                - generic [ref=f2e79]: "Company: 86563b6f-a0b4-41ff-8668-a4c2eb630fbe"
          - listitem [ref=f2e80]:
            - 'link "Joshua Cole joshua.cole@example.com +1-496-620-1193 Company: f5563eb5-b291-4336-9f60-ca88773413f9" [ref=f2e81] [cursor=pointer]':
              - /url: /contacts/4ac22157-b829-411b-bdcf-519fc0e6b141
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: Joshua Cole
                - generic [ref=f2e84]: joshua.cole@example.com
                - generic [ref=f2e85]: +1-496-620-1193
                - generic [ref=f2e86]: "Company: f5563eb5-b291-4336-9f60-ca88773413f9"
          - listitem [ref=f2e87]:
            - 'link "Linda Kelly linda.kelly@example.com +1-444-628-4690 Company: 64d25140-2862-4a2d-ad2a-122d8bd0f23a" [ref=f2e88] [cursor=pointer]':
              - /url: /contacts/48718e4b-f730-47ba-b348-01730080d8a2
              - generic [ref=f2e89]:
                - generic [ref=f2e90]: Linda Kelly
                - generic [ref=f2e91]: linda.kelly@example.com
                - generic [ref=f2e92]: +1-444-628-4690
                - generic [ref=f2e93]: "Company: 64d25140-2862-4a2d-ad2a-122d8bd0f23a"
          - listitem [ref=f2e94]:
            - 'link "Melissa Curtis melissa.curtis@example.com +1-860-288-4964 Company: 29b08420-8e9c-4194-b9f9-ea7f59570736" [ref=f2e95] [cursor=pointer]':
              - /url: /contacts/8744f137-1936-468b-b14a-31306b95e627
              - generic [ref=f2e96]:
                - generic [ref=f2e97]: Melissa Curtis
                - generic [ref=f2e98]: melissa.curtis@example.com
                - generic [ref=f2e99]: +1-860-288-4964
                - generic [ref=f2e100]: "Company: 29b08420-8e9c-4194-b9f9-ea7f59570736"
          - listitem [ref=f2e101]:
            - link "Andrew Richardson andrew.richardson@example.com +1-810-412-7487" [ref=f2e102] [cursor=pointer]:
              - /url: /contacts/c608d7fc-ee83-4116-8563-b00219cd6133
              - generic [ref=f2e103]:
                - generic [ref=f2e104]: Andrew Richardson
                - generic [ref=f2e105]: andrew.richardson@example.com
                - generic [ref=f2e106]: +1-810-412-7487
          - listitem [ref=f2e107]:
            - 'link "Andrew Harrison andrew.harrison@example.com +1-248-994-6095 Company: e340343f-e24b-430f-b9c7-53b89f9b55cc" [ref=f2e108] [cursor=pointer]':
              - /url: /contacts/13f9264e-dcb4-4931-95b3-74ab4a22a57c
              - generic [ref=f2e109]:
                - generic [ref=f2e110]: Andrew Harrison
                - generic [ref=f2e111]: andrew.harrison@example.com
                - generic [ref=f2e112]: +1-248-994-6095
                - generic [ref=f2e113]: "Company: e340343f-e24b-430f-b9c7-53b89f9b55cc"
          - listitem [ref=f2e114]:
            - 'link "Sarah Hayes sarah.hayes@example.com +1-829-610-2250 Company: 94daa227-777d-4ff3-bd2e-32203dbfba12" [ref=f2e115] [cursor=pointer]':
              - /url: /contacts/c51fc53e-487f-4877-b7ca-3cdedb17fdab
              - generic [ref=f2e116]:
                - generic [ref=f2e117]: Sarah Hayes
                - generic [ref=f2e118]: sarah.hayes@example.com
                - generic [ref=f2e119]: +1-829-610-2250
                - generic [ref=f2e120]: "Company: 94daa227-777d-4ff3-bd2e-32203dbfba12"
          - listitem [ref=f2e121]:
            - link "Peter Diaz peter.diaz@example.com +1-547-209-1220" [ref=f2e122] [cursor=pointer]:
              - /url: /contacts/d740d28e-387a-468f-a5a8-035402c3d2d1
              - generic [ref=f2e123]:
                - generic [ref=f2e124]: Peter Diaz
                - generic [ref=f2e125]: peter.diaz@example.com
                - generic [ref=f2e126]: +1-547-209-1220
          - listitem [ref=f2e127]:
            - link "Steven Perez steven.perez@example.com +1-734-997-8921" [ref=f2e128] [cursor=pointer]:
              - /url: /contacts/fc16c51e-d802-4db6-9909-ac5154368bc6
              - generic [ref=f2e129]:
                - generic [ref=f2e130]: Steven Perez
                - generic [ref=f2e131]: steven.perez@example.com
                - generic [ref=f2e132]: +1-734-997-8921
          - listitem [ref=f2e133]:
            - link "Michelle Ortiz michelle.ortiz@example.com +1-401-695-4261" [ref=f2e134] [cursor=pointer]:
              - /url: /contacts/17d4a2ca-d78e-461d-b19e-a32c553bdbde
              - generic [ref=f2e135]:
                - generic [ref=f2e136]: Michelle Ortiz
                - generic [ref=f2e137]: michelle.ortiz@example.com
                - generic [ref=f2e138]: +1-401-695-4261
```