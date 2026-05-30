# Aqua CRM - Feature Documentation

## Overview
This document provides detailed feature documentation for Aqua CRM, covering all core features, architecture, and development guidelines.

---

## Feature: Task Management

### Task Model
A task represents a unit of work that needs to be completed.

**Fields:**
- `id`: Unique identifier (UUID)
- `title`: String (required)
- `description`: String (optional)
- `status`: Enum (`todo`, `in-progress`, `done`, `blocked`)
- `priority`: Enum (`low`, `medium`, `high`, `urgent`)
- `due_date`: DateTime (optional)
- `assigned_to`: Reference to Contact/User (optional)
- `created_at`: DateTime (auto-generated)
- `updated_at`: DateTime (auto-generated)
- `created_by`: Reference to Contact/User (auto-generated)

### Task Dependencies
Tasks can have dependencies on other tasks via predecessor/successor relationships.

**Fields:**
- `predecessor_task_id`: Reference to task
- `successor_task_id`: Reference to task
- `dependency_type`: Enum (`finish-to-start`, `start-to-start`, `finish-to-finish`, `start-to-finish`)

### API Endpoints
```
GET    /api/tasks              # List tasks (with filters, pagination)
GET    /api/tasks/:id          # Get single task
POST   /api/tasks              # Create task
PUT    /api/tasks/:id          # Update task
DELETE /api/tasks/:id          # Delete task
POST   /api/tasks/:id/assign   # Assign task to user
POST   /api/tasks/:id/dependencies  # Add dependency
```

### Filtering & Sorting
```
GET /api/tasks?status=in-progress&priority=high&sort=-created_at&page=1&limit=20
```

---

## Feature: Activity Tracking

### Activity Model
An activity represents any interaction with a contact or company.

**Fields:**
- `id`: Unique identifier (UUID)
- `type`: Enum (`call`, `email`, `meeting`, `note`, `task`, `custom`)
- `title`: String (required)
- `description`: String (optional)
- `contact_id`: Reference to Contact (optional)
- `company_id`: Reference to Company (optional)
- `date`: DateTime (required)
- `duration`: Integer (minutes, optional)
- `created_by`: Reference to User (auto-generated)
- `created_at`: DateTime (auto-generated)

### Activity Timeline
Activities can be viewed on a timeline per contact or company.

**API Endpoints:**
```
GET    /api/contacts/:id/timeline    # Get timeline for contact
GET    /api/companies/:id/timeline   # Get timeline for company
POST   /api/activities               # Create activity
PUT    /api/activities/:id           # Update activity
DELETE /api/activities/:id           # Delete activity
```

### Automatic Activity Capture
When tasks are completed, linked activities can be automatically generated.

**Configuration:**
- Enable automatic capture via project settings
- Map task completions to activity creation
- Custom activity types supported

---

## Feature: Contacts & Companies

### Contact Model
A contact represents a person associated with a company.

**Fields:**
- `id`: Unique identifier (UUID)
- `first_name`: String (required)
- `last_name`: String (required)
- `email`: String (required, unique)
- `phone`: String (optional)
- `company_id`: Reference to Company (optional)
- `tags`: Array of strings (optional)
- `custom_fields`: JSON (optional)
- `created_at`: DateTime (auto-generated)
- `updated_at`: DateTime (auto-generated)

### Company Model
A company represents an organization.

**Fields:**
- `id`: Unique identifier (UUID)
- `name`: String (required)
- `website`: String (optional)
- `industry`: String (optional)
- `address`: String (optional)
- `custom_fields`: JSON (optional)
- `created_at`: DateTime (auto-generated)
- `updated_at`: DateTime (auto-generated)

### Relationships
- A contact belongs to zero or one company.
- A company has many contacts.
- Activities can be linked to contacts and/or companies.
- Tasks can be associated with contacts or companies via their activities.

### API Endpoints
```
GET    /api/contacts            # List contacts
GET    /api/contacts/:id         # Get contact
POST   /api/contacts            # Create contact
PUT    /api/contacts/:id         # Update contact
DELETE /api/contacts/:id         # Delete contact

GET    /api/companies            # List companies
GET    /api/companies/:id        # Get company
POST   /api/companies            # Create company
PUT    /api/companies/:id        # Update company
DELETE /api/companies/:id        # Delete company
```

---

## Architecture Overview

### API Layer
- RESTful endpoints following standard conventions
- JSON request/response format
- Authentication via JWT tokens (Bearer token)
- Pagination, filtering, and sorting supported on list endpoints

### Data Model
- Relational database recommended (PostgreSQL, MySQL)
- Use migrations for schema management
- Index commonly queried fields (contacts.name, tasks.status, activities.type)

### Frontend
- Recommended: React with TypeScript
- State management: Vuex (if Vue) or Redux (if React)
- Component architecture: Compose small, reusable components
- API client: Use a centralized axios instance with interceptors

### Backend
- Recommended: Node.js/Express or similar
- Use environment variables for configuration
- Implement CORS properly for frontend/backend separation

---

## Development Guidelines

### Code Style
- Use consistent naming conventions:
  - Files: `kebab-case`
  - Variables/functions: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Types/interfaces: `PascalCase`
- Use TypeScript interfaces for all data models
- Document function parameters with JSDoc

### Testing
- Unit tests for models and utility functions
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- Run `npm test` before committing

### Git Workflow
1. Create feature branch from `main`
2. Make changes and commit with conventional commits
3. Open Pull Request with description of changes
4. Request review from team members
5. Merge after approvals and CI pass

### API Response Format
All API responses follow a consistent format:
```json
{
  "success": true,
  "data": {},
  "error": null
}
```

For errors:
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Description of the error",
    "details": []
  }
}
```

### Pagination
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

---

## Security
- Use HTTPS for all endpoints
- Implement rate limiting on API endpoints
- Validate and sanitize all input
- Use parameterized queries to prevent SQL injection
- Implement CSRF protection for state-changing requests

---

## Extending Features
- Custom fields: Use a JSON field for extensible data on contacts, companies, and tasks
- Custom activity types: Add new enum values as needed
- Integration hooks: Use webhooks for external integrations
