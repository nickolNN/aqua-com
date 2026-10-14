# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/contact-detail.spec.ts >> Contact Detail Tests >> contact detail displays phone
- Location: tests/e2e/contacts/contact-detail.spec.ts:37:3

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
            - 'link "Harold Fleming harold.fleming@example.com +1-608-869-2942 Company: d031f50d-894c-4852-a9dc-14c0599d908d" [ref=f2e74] [cursor=pointer]':
              - /url: /contacts/cb850070-2670-4d62-b417-da09952fa37b
              - generic [ref=f2e75]:
                - generic [ref=f2e76]: Harold Fleming
                - generic [ref=f2e77]: harold.fleming@example.com
                - generic [ref=f2e78]: +1-608-869-2942
                - generic [ref=f2e79]: "Company: d031f50d-894c-4852-a9dc-14c0599d908d"
          - listitem [ref=f2e80]:
            - link "William Jackson william.jackson@example.com +1-387-579-6635" [ref=f2e81] [cursor=pointer]:
              - /url: /contacts/305ad06c-574c-42da-917b-4ccf76eed7f5
              - generic [ref=f2e82]:
                - generic [ref=f2e83]: William Jackson
                - generic [ref=f2e84]: william.jackson@example.com
                - generic [ref=f2e85]: +1-387-579-6635
          - listitem [ref=f2e86]:
            - link "Cynthia Graham cynthia.graham@example.com +1-780-869-6134" [ref=f2e87] [cursor=pointer]:
              - /url: /contacts/650ab8aa-8512-44a2-a174-5ee7ac86aa53
              - generic [ref=f2e88]:
                - generic [ref=f2e89]: Cynthia Graham
                - generic [ref=f2e90]: cynthia.graham@example.com
                - generic [ref=f2e91]: +1-780-869-6134
          - listitem [ref=f2e92]:
            - link "Mark Thomas mark.thomas@example.com +1-960-950-2144" [ref=f2e93] [cursor=pointer]:
              - /url: /contacts/5bc0ab68-7b3f-49df-8c38-fcd0d9c90208
              - generic [ref=f2e94]:
                - generic [ref=f2e95]: Mark Thomas
                - generic [ref=f2e96]: mark.thomas@example.com
                - generic [ref=f2e97]: +1-960-950-2144
          - listitem [ref=f2e98]:
            - link "Ronald Hayes ronald.hayes@example.com +1-207-867-4937" [ref=f2e99] [cursor=pointer]:
              - /url: /contacts/f8afb844-ca8a-4abe-825e-5f581dc83db4
              - generic [ref=f2e100]:
                - generic [ref=f2e101]: Ronald Hayes
                - generic [ref=f2e102]: ronald.hayes@example.com
                - generic [ref=f2e103]: +1-207-867-4937
          - listitem [ref=f2e104]:
            - 'link "Nathan Reyes nathan.reyes@example.com +1-773-788-7643 Company: 516e89e5-acdd-4718-970f-52a276dfa1c3" [ref=f2e105] [cursor=pointer]':
              - /url: /contacts/2586188e-a59c-4190-adda-970ee952af9d
              - generic [ref=f2e106]:
                - generic [ref=f2e107]: Nathan Reyes
                - generic [ref=f2e108]: nathan.reyes@example.com
                - generic [ref=f2e109]: +1-773-788-7643
                - generic [ref=f2e110]: "Company: 516e89e5-acdd-4718-970f-52a276dfa1c3"
          - listitem [ref=f2e111]:
            - link "Harold Gonzalez harold.gonzalez@example.com +1-605-461-7999" [ref=f2e112] [cursor=pointer]:
              - /url: /contacts/ff33788d-476c-4f66-88ae-39b73b8410a9
              - generic [ref=f2e113]:
                - generic [ref=f2e114]: Harold Gonzalez
                - generic [ref=f2e115]: harold.gonzalez@example.com
                - generic [ref=f2e116]: +1-605-461-7999
          - listitem [ref=f2e117]:
            - link "Jason Thompson jason.thompson@example.com +1-663-275-1866" [ref=f2e118] [cursor=pointer]:
              - /url: /contacts/f44abf5a-34cb-4b7b-abc7-6426373d78d4
              - generic [ref=f2e119]:
                - generic [ref=f2e120]: Jason Thompson
                - generic [ref=f2e121]: jason.thompson@example.com
                - generic [ref=f2e122]: +1-663-275-1866
          - listitem [ref=f2e123]:
            - 'link "Carl Bailey carl.bailey@example.com +1-706-503-6363 Company: 45e5daef-afa0-41e7-a521-d96b4cdf23f3" [ref=f2e124] [cursor=pointer]':
              - /url: /contacts/738255c1-5838-4358-9000-1db49d5cdf60
              - generic [ref=f2e125]:
                - generic [ref=f2e126]: Carl Bailey
                - generic [ref=f2e127]: carl.bailey@example.com
                - generic [ref=f2e128]: +1-706-503-6363
                - generic [ref=f2e129]: "Company: 45e5daef-afa0-41e7-a521-d96b4cdf23f3"
          - listitem [ref=f2e130]:
            - link "Joshua Lewis joshua.lewis@example.com +1-486-510-4642" [ref=f2e131] [cursor=pointer]:
              - /url: /contacts/598d3835-373c-42a8-879b-1a4610d610e2
              - generic [ref=f2e132]:
                - generic [ref=f2e133]: Joshua Lewis
                - generic [ref=f2e134]: joshua.lewis@example.com
                - generic [ref=f2e135]: +1-486-510-4642
```