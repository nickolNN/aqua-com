# API Conventions

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

## Error Format

```json
{
  "success": false,
  "data": null,
  "error": "Description of the error"
}
```

## Authentication

- Use JWT tokens via Authorization header: `Authorization: Bearer <token>`
- Implement role-based access control (RBAC)
- Token expiration configurable via environment variables

## API Endpoints

All endpoints are served under the `/api` base (see `src/api/baseApi.ts`) and follow REST conventions, grouped by resource:

- `/api/tasks` - Task management (list, create)
- `/api/tasks/:id` - Get, update, delete a task
- `/api/tasks/:id/status` - Update task status (optional `position` for Kanban placement)
- `/api/tasks/:id/dependencies` - Task dependencies
- `/api/contacts` - Contact management
- `/api/companies` - Company management
- `/api/activities` - Activity tracking
- `/api/auth/login`, `/api/auth/register`, `/api/auth/logout`, `/api/auth/password-reset` - Authentication
