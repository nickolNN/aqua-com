# Aqua CRM - Features Specification

## Overview

This document captures the feature specifications for Aqua CRM based on user requirements.

---

## 1. Company & Contact Management

### Company Management
- **Single-company focus**: CRM is designed for a single company; no custom company fields needed
- **Custom fields**: Supported — text fields (industry, website, etc.)

### Contact Management
- **Multi-company support**: Contacts can be associated with multiple companies (past/present)
- **Primary contact**: Yes — contacts have a primary designation
- **Contact roles**: Custom roles only (e.g., Decision Maker, Technical Contact, CFO — user-defined)
- **Contact tags**: No tags system
- **Custom contact fields**: Yes — text fields (bio, notes, custom information)
- **Data model**: Contacts link to multiple companies over time

---

## 2. Task Management

### Core Features
- **Subtasks**: Limited — one level of subtasks within parent tasks
- **Tags**: Free-form tags on tasks
- **Custom fields**: Text fields only
- **Priority levels**: Low / Medium / High / Urgent
- **Dependencies**: Yes — predecessor/successor blocking relationships between tasks
- **Statuses**: todo / in-progress / done / blocked
- **Due dates**: Optional (not required)

### Views
- **Kanban board**: Drag-and-drop board view for task management

### Notifications
- **Task events**: Email + in-app notifications (assignment, due date approaching, completion)

---

## 3. Activity Tracking

### Activity Types
- Call
- Email
- Meeting
- Note

### Features
- **Attachments**: Support common file types (PDF, images, documents)
- **Cost tracking**: Time spent per activity
- **Auto-linking**: Activities auto-linked to contacts/companies on task completion
- **Timeline views**: Chronological timeline per contact and company
- **Automatic logging**: Activities auto-captured from integrations (e.g., email sync)

---

## 4. API & Authentication

### API
- **Type**: REST only
- **Bulk operations**: Full bulk support (create, update, delete)
- **Rate limiting**: Per-user rate limits

### Authentication
- **Method**: JWT (JSON Web Tokens) with bcrypt for password hashing
- **Webhooks**: All major events (task created, contact updated, etc.)
- **API documentation**: OpenAPI/Swagger specification

### Security
- **RBAC**: Role-based access control
- **Audit logging**: Partial audit trail (selected events)

---

## 5. Dashboard & Reports

### Dashboard
- **Layout**: Preset layouts (predefined)
- **Real-time updates**: Yes — real-time data updates
- **Metrics**:
  - Tasks overview (count by status)
  - Activity summary (calls, emails, meetings)
  - Contact statistics

### Reports
- **Report generation**: Yes — with export options (PDF, CSV)

---

## 6. Search, Filter & Navigation

### Search
- **Full-text search**: Global search bar across contacts, companies, tasks, and activities

### Filters
- **Advanced filtering**: Multi-criteria filters (date range, tags, status, custom fields)
- **Saved filters**: Yes — users can save and reuse filters

---

## 7. Notifications & User Management

### Notification Channels
- Email notifications
- In-app notifications

### User Roles & Permissions
- **RBAC**: Custom roles with granular permissions
- **Role types**: Admin, Manager, User, Viewer (customizable)
- **User management**: Invite-based — users invited via email
- **Audit logging**: Partial audit trail (selected events tracked)

---

## 8. Integrations & Extensibility

### Integrations
- **Email integration**: Send emails from CRM + sync sent emails from Gmail/Outlook
- **Calendar integration**: Calendar event sync (Google Calendar, Outlook)
- **Data import**: Full import support (contacts, companies, tasks)
- **Data export**: Export contacts, companies, tasks (CSV, Excel, PDF)
- **Third-party**: Webhook-based integrations
- **Zapier**: Supported

### Sync Features
- Automatic activity capture from email integrations
- Automatic linking of activities to contacts/companies

---

## 9. UI/UX

### Design
- **Framework**: Vue.js 3 (with Vuex) — see Architecture for details
- **Design style**: Modern, minimalistic design
- **Dark mode**: Yes — toggle between light and dark themes
- **Internationalization**: Yes — support for multiple languages
- **Responsive design**: Yes — full responsive design for mobile devices
- **Drag-and-drop**: Kanban board + drag-and-drop for file uploads

---

## Summary

| Section | Status |
|---------|--------|
| Company & Contact Management | Confirmed |
| Task Management | Confirmed |
| Activity Tracking | Confirmed |
| API & Authentication | Confirmed |
| Dashboard & Reports | Confirmed |
| Search, Filter & Navigation | Confirmed |
| Notifications & User Management | Confirmed |
| Integrations & Extensibility | Confirmed |
| UI/UX | Confirmed |
