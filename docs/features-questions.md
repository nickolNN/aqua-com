# Aqua CRM - Feature Discovery Plan

## Goal

Ask the user targeted questions about each feature area of Aqua CRM to capture requirements, preferences, and design decisions before implementation.

## Instructions for Use

For each section below, mark your preferences using checkboxes `[x]` for selected options and `[ ]` for unselected ones. Use the short-answer fields for open-ended input. Confirm choices after completing all sections.

---

## 1. Company & Contact Management

- [ ] **Multiple companies per contact**: Should contacts support multiple companies (past/present)? Typical use cases:
  - [ ] Track contacts who have worked at multiple companies
  - [ ] Associate contacts with both current and former employers
  - [ ] Other (describe): ______________________

- [ ] **Contact roles/titles**: Should contacts have roles such as "Decision Maker", "Technical Contact", "CFO"?
  - [ ] Yes — include predefined roles
  - [ ] Yes — custom roles only
  - [ ] No

- [ ] **Contact tags/labels**: Should contacts have tags for categorization?
  - [ ] Yes — free-form tags (e.g., "warm lead", "enterprise")
  - [ ] Yes — predefined tag categories
  - [ ] No

- [ ] **Custom company fields**: Should companies support custom fields? What kind?
  - [ ] Yes — text fields (industry, website, etc.)
  - [ ] Yes — dropdown/select fields (company size, industry tier)
  - [ ] Yes — numeric/date fields (founded year, annual revenue)
  - [ ] No custom fields needed

- [ ] **Primary contact designation**: Should contacts have a "primary" designation (e.g., main contact for a company)?
  - [ ] Yes
  - [ ] No

- [ ] **Custom contact fields**: Should contacts support custom fields?
  - [ ] Yes — text fields (bio, notes, custom info)
  - [ ] Yes — dropdown/select fields (source, status)
  - [ ] Yes — date fields (birthday, hire date)
  - [ ] No custom fields needed

- [ ] **Data model relationships**: Should contacts link to multiple companies over time? Should companies have a primary contact by default?
  - Short answer: ______________________

---

## 2. Task Management

- [ ] **Subtasks / nested tasks**: Should tasks support subtasks within parent tasks?
  - [ ] Yes — full hierarchical subtask support
  - [ ] Yes — limited (one level of subtasks)
  - [ ] No

- [ ] **Task tags/labels**: Should tasks support tags or labels?
  - [ ] Yes — free-form tags
  - [ ] Yes — predefined tag categories
  - [ ] No

- [ ] **Custom task fields**: Should tasks support custom fields beyond the standard ones?
  - [ ] Yes — text fields
  - [ ] Yes — dropdown/select fields
  - [ ] Yes — numeric/date fields
  - [ ] No custom fields needed

- [ ] **Task priority**: Should tasks use priority levels? Which ones?
  - [ ] Yes — low / medium / high / urgent
  - [ ] Yes — custom priority levels
  - [ ] No

- [ ] **Task dependencies**: Should tasks support dependencies (predecessors/successors)?
  - [ ] Yes — predecessor/successor blocking relationships
  - [ ] No

- [ ] **Due dates**: Should tasks support due dates and scheduling?
  - [ ] Yes — due dates required
  - [ ] Yes — optional due dates only
  - [ ] No

- [ ] **Task lists**: Should the app support multiple task lists or boards (e.g., Kanban, list views)?
  - [ ] Yes — Kanban board style (drag-and-drop between columns)
  - [ ] Yes — list/table view with filters
  - [ ] Yes — both
  - [ ] No

- [ ] **Task notifications**: Should users receive notifications for task events (assigned, due date approaching, completed)?
  - [ ] Yes — email notifications
  - [ ] Yes — in-app notifications only
  - [ ] Yes — both email and in-app
  - [ ] No notifications needed

- [ ] **Task status**: Should tasks use predefined statuses? Which ones?
  - [ ] Yes — todo / in-progress / done / blocked
  - [ ] Yes — custom statuses
  - [ ] No

**Short-answer — additional task features needed**: ______________________

---

## 3. Activity Tracking

- [ ] **Activity attachments**: Should activities support attachments (files, documents)?
  - [ ] Yes — support common file types (PDF, images, docs)
  - [ ] No

- [ ] **Cost tracking**: Should activities support cost tracking (money/time spent)?
  - [ ] Yes — monetary cost per activity
  - [ ] Yes — time spent per activity
  - [ ] Yes — both monetary cost and time tracking
  - [ ] No

- [ ] **Automatic linking**: Should activities be linked to specific contacts and/or companies automatically when a task is completed?
  - [ ] Yes — auto-link on task completion
  - [ ] No — manual linking only

- [ ] **Activity types**: Which activity types should be supported?
  - [ ] Call
  - [ ] Email
  - [ ] Meeting
  - [ ] Note
  - [ ] Custom types (specify): ______________________

- [ ] **Timeline views**: Should activities be displayed on a timeline for each contact/company?
  - [ ] Yes — chronological timeline view
  - [ ] No

- [ ] **Activity logging**: Should activities be logged automatically from integrations (e.g., email sent through Gmail)?
  - [ ] Yes — automatic capture from integrations
  - [ ] No

**Short-answer — additional activity features needed**: ______________________

---

## 4. API & Authentication

- [ ] **API type**: Should the API support GraphQL in addition to REST, or REST only?
  - [ ] REST only
  - [ ] REST + GraphQL
  - [ ] GraphQL only

- [ ] **Authentication methods**: Which authentication methods should be supported?
  - [ ] JWT (JSON Web Tokens)
  - [ ] OAuth 2.0
  - [ ] API keys
  - [ ] Session-based
  - [ ] Combination: ______________________

- [ ] **Webhook notifications**: Should the API support webhook notifications when events occur (e.g., task created, contact updated)?
  - [ ] Yes — webhooks for all major events
  - [ ] Yes — webhooks for selected events only
  - [ ] No

- [ ] **Bulk operations**: Should the API support bulk operations (create/update/delete multiple items)?
  - [ ] Yes — bulk create
  - [ ] Yes — bulk update
  - [ ] Yes — bulk delete
  - [ ] Yes — all bulk operations
  - [ ] No bulk operations needed

- [ ] **API rate limiting**: Should the API have rate limiting?
  - [ ] Yes — per-user rate limits
  - [ ] No rate limiting

**Short-answer — API documentation format (OpenAPI/Swagger / other)**: ______________________

---

## 5. Dashboard & Reports

- [ ] **Dashboard widgets**: Should the app support customizable dashboard widgets?
  - [ ] Yes — drag-and-drop widgets
  - [ ] Yes — predefined widgets only
  - [ ] Yes — both
  - [ ] No

- [ ] **Charts & metrics**: Should dashboards include charts and metrics? What metrics?
  - [ ] Tasks overview (count by status)
  - [ ] Activity summary (calls, emails, meetings)
  - [ ] Contact statistics
  - [ ] Custom metrics (specify): ______________________
  - [ ] No charts needed

- [ ] **Real-time updates**: Should dashboard data update in real-time?
  - [ ] Yes — real-time updates required
  - [ ] No — refresh on page load is sufficient
  - [ ] No real-time needed

- [ ] **Customizable layouts**: Should users customize their dashboard layout?
  - [ ] Yes — fully customizable layouts
  - [ ] Yes — preset layouts only
  - [ ] No

- [ ] **Reports**: Should the app support report generation (PDF, export)?
  - [ ] Yes — report generation with export options
  - [ ] No

**Short-answer — specific dashboard/report content needed**: ______________________

---

## 6. Search, Filter & Navigation

- [ ] **Full-text search**: Should the app support full-text search across contacts, companies, tasks, and activities?
  - [ ] Yes — global search bar
  - [ ] No

- [ ] **Advanced filters**: Should users be able to filter contacts/tasks/activities by multiple criteria (date range, tags, status, custom fields)?
  - [ ] Yes — multi-criteria filters
  - [ ] No

- [ ] **Saved filters**: Should users be able to save and reuse filters?
  - [ ] Yes — saved filters/favorites
  - [ ] No

**Short-answer — search/filter priority (most important)**: ______________________

---

## 7. Notifications & User Management

- [ ] **Notification channels**: Which notification channels should be supported?
  - [ ] Email notifications
  - [ ] In-app notifications only
  - [ ] Push notifications
  - [ ] Slack/Discord integration
  - [ ] Other: ______________________

- [ ] **User roles & permissions (RBAC)**: Should the app support role-based access control?
  - [ ] Yes — predefined roles (Admin, Manager, User)
  - [ ] Yes — custom roles with granular permissions
  - [ ] No — simple access control

- [ ] **User roles needed**: What roles are required?
  - [ ] Admin (full access)
  - [ ] Manager (read/write for most resources)
  - [ ] User (read/write for assigned items)
  - [ ] Viewer (read-only)
  - [ ] Custom roles: ______________________

- [ ] **Audit logging**: Should the app track who changed what and when?
  - [ ] Yes — full audit trail
  - [ ] Yes — partial audit trail (selected events only)
  - [ ] No

- [ ] **User management**: Should the app support user invites, registration, and self-management?
  - [ ] Yes — invite-based user management
  - [ ] No — users managed externally

**Short-answer — notification preferences and role definitions**: ______________________

---

## 8. Integrations & Extensibility

- [ ] **Email integration**: Should the app support sending emails from the app and syncing sent emails as activities?
  - [ ] Yes — send emails from CRM
  - [ ] Yes — sync Gmail/Outlook emails
  - [ ] Both

- [ ] **Calendar integration**: Should the app support calendar events and scheduling?
  - [ ] Yes — calendar event sync (Google Calendar, Outlook)
  - [ ] Yes — scheduling links (e.g., Calendly)
  - [ ] No

- [ ] **Data import**: Should the app support importing data from CSV/Excel?
  - [ ] Yes — import contacts
  - [ ] Yes — import companies
  - [ ] Yes — import tasks/activities
  - [ ] No import needed

- [ ] **Data export**: Should the app support exporting data (CSV, Excel, PDF)?
  - [ ] Yes — export contacts/companies/tasks
  - [ ] No export needed

- [ ] **Third-party integrations**: Should the app support third-party integrations (Slack, Zapier, etc.)?
  - [ ] Yes — Slack integration
  - [ ] Yes — Zapier integration
  - [ ] Yes — webhook-based integrations
  - [ ] No third-party integrations

**Short-answer — priority integrations**: ______________________

---

## 9. UI/UX

- [ ] **Frontend framework**: Should the frontend use Vue.js or React?
  - [ ] Vue.js (with Vuex)
  - [ ] React (with Redux/Context)
  - [ ] Other: ______________________

- [ ] **Drag-and-drop**: Should the UI support drag-and-drop for task management (e.g., Kanban board)?
  - [ ] Yes — Kanban board with drag-and-drop
  - [ ] Yes — drag-and-drop for file uploads
  - [ ] No drag-and-drop

- [ ] **Dark mode**: Should the UI support dark mode?
  - [ ] Yes — dark mode toggle
  - [ ] No

- [ ] **Internationalization (i18n)**: Should the app support multiple languages?
  - [ ] Yes — specify languages: ______________________
  - [ ] No

- [ ] **Responsive design**: Should the app work on mobile devices?
  - [ ] Yes — full responsive design required
  - [ ] No — desktop-only

**Short-answer — additional UI/UX preferences**: ______________________

---

## Summary & Confirmation

| Section | Completed | Notes |
|---------|-----------|-------|
| Company & Contact Management | [ ] | ______________________ |
| Task Management | [ ] | ______________________ |
| Activity Tracking | [ ] | ______________________ |
| API & Authentication | [ ] | ______________________ |
| Dashboard & Reports | [ ] | ______________________ |
| Search, Filter & Navigation | [ ] | ______________________ |
| Notifications & User Management | [ ] | ______________________ |
| Integrations & Extensibility | [ ] | ______________________ |
| UI/UX | [ ] | ______________________ |

**Additional requirements or priorities**: ______________________

**Confirm all selections**: [ ] I confirm these choices and requirements.

---

## Execution Plan

1. Present all questions grouped by category
2. Wait for user responses
3. Summarize responses and confirm requirements
4. Update documentation with captured requirements
