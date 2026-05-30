# Aqua CRM - Agent Instructions & Project Documentation

## Project Overview
Aqua CRM is a customer relationship management system with a focus on task management, activity tracking, contacts, and companies. The project is designed to be stack-agnostic, with documentation providing examples for common frameworks (React/Node).

## Core Features

### Task Management
- Create, update, and track tasks
- Task statuses (e.g., `todo`, `in-progress`, `done`, `blocked`)
- Task priorities (e.g., `low`, `medium`, `high`, `urgent`)
- Task dependencies (predecessors/successors)
- Due date tracking
- Assignment to contacts/users

### Activity Tracking
- Log activities (calls, emails, meetings, notes)
- Timeline views for visualizing activity
- Automatic activity capture from integrations
- Activity types: `call`, `email`, `meeting`, `note`, `task`, `custom`
- Timestamps and categorization

### Contacts & Companies
- Contact database with rich profiles
- Company organization and grouping
- Relationship mapping (contacts ↔ companies)
- Custom fields support

## Project Structure

```
aqua-crm/
├── AGENTS.md          # This file - agent instructions & project docs
├── docs/
│   ├── FEATURES.md    # Detailed feature documentation
│   └── ARCHITECTURE.md # Architecture overview
└── src/
    ├── backend/       # Backend code (API, models, services)
    └── frontend/      # Frontend code (components, views, stores)
```

## Development Conventions

### Git Conventions
- Use feature branches: `feature/<description>` or `fix/<description>`
- Conventional commits: `<type>(<scope>): <description>`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Branch protection on `main`

### Testing
- Run tests before committing: `npm test` (or equivalent)
- Aim for high coverage on core features (tasks, contacts, activities)

### Code Style
- Follow consistent naming conventions (kebab-case for files, camelCase for variables)
- Use TypeScript for type safety where possible
- Document API endpoints and components

## Commands & Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run tests |
| `npm run build` | Build project |
| `npm run lint` | Lint code |
| `npm run serve` | Start dev server |

## Architecture Guidelines
- Use RESTful or GraphQL APIs for backend communication
- Follow separation of concerns (models, views, controllers)
- Keep components modular and reusable
- Use environment variables for configuration
- Document API responses with OpenAPI/Swagger

## API Conventions
- Use standard HTTP status codes
- Return JSON responses with consistent structure:
  ```json
  {
    "success": true,
    "data": {},
    "error": null
  }
  ```
- Use pagination for list endpoints
- Use filters and sorting query parameters
