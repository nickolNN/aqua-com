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
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Description of the error",
    "details": []
  }
}
```

## Authentication

- Use JWT tokens via Authorization header: `Authorization: Bearer <token>`
- Implement role-based access control (RBAC)
- Token expiration configurable via environment variables

## API Endpoints

API endpoints follow REST conventions and are grouped by resource:

- `/api/v1/tasks` - Task management
- `/api/v1/contacts` - Contact management
- `/api/v1/companies` - Company management
- `/api/v1/activities` - Activity tracking
- `/api/v1/auth` - Authentication
