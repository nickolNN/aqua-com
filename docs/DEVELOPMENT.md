# Aqua CRM - Development Guide

## Overview

This document provides detailed development guidelines for Aqua CRM, covering local setup, running the app, testing, and building.

## Local Setup

### Prerequisites

- Go (v1.22+)
- Node.js (v20+)
- PostgreSQL (v14+)
- Redis (for caching)
- Docker & Docker Compose (for local environment)
- pnpm

### Installation Steps

1. Clone the repository
2. Install frontend dependencies: `pnpm install`
3. Copy environment variables: `cp .env.example .env`

### Environment Variables

See `.env.example` for available options. Key variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key-here` |
| `VITE_API_URL` | API server URL | `http://localhost:3000` |
| `NODE_ENV` | Environment name | `development` |

## Running the Application

### Start Development Server

```bash
# Start frontend (React + Redux + RTK Query)
pnpm dev
```

This will start the frontend dev server with mock data via MSW.

### Build for Production

```bash
# Build frontend
pnpm build
```

## Testing

### Run Frontend Tests

```bash
pnpm test
```

### Run Tests with Coverage

```bash
pnpm test -- --coverage
```

### Testing Conventions

- Write unit tests for utilities and hooks
- Write component tests using React Testing Library
- Write integration tests for API endpoints with MSW
- Aim for high coverage on core features (tasks, contacts, activities)
- Use React Testing Library for frontend component tests

## Database Migrations

The database migrations are managed by the backend (Go + GORM). After starting the backend, migrations are available through the API.

### Running Migrations

```bash
# Run migrations via backend API
curl -X POST http://localhost:3000/api/migrations
```

### Seeding

```bash
# Seed data via backend API
curl -X POST http://localhost:3000/api/seed
```

## Linting & Formatting

### Frontend Linting

```bash
pnpm lint
```

### Auto-fix Lint Issues

```bash
pnpm lint:fix
```

## Development Workflow

### Branch Naming

- Feature branches: `feature/<description>`
- Bug fix branches: `fix/<description>`
- Release branches: `release/<version>`

### Commit Conventions

Use conventional commits: `<type>(<scope>): <description>`

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example: `feat(tasks): add task dependency tracking`

### Pull Request Process

1. Create feature branch from `main`
2. Make changes and commit with conventional commits
3. Open Pull Request with description of changes
4. Request review from team members
5. Ensure all Jenkins checks pass
6. Merge after approvals

### Code Review Checklist

- [ ] Code follows naming conventions
- **All tests pass**
- **No linting errors** (ESLint + TypeScript)
- **API responses follow standard format**
- **Input validation on all endpoints**
- **Security considerations addressed** (XSS, CSRF)
- **Documentation updated**

## Project Structure

### Frontend Structure

```
src/
├── api/                 # API layer (RTK Query endpoints)
├── components/          # React components
│   ├── ui/              # Reusable UI primitives
│   ├── layout/        # Layout components (Sidebar, Header)
│   ├── tasks/         # Task-specific components
│   ├── activity/      # Activity-specific components
│   └── search/        # Search components
├── hooks/             # Custom React hooks
├── i18n/              # Internationalization
├── lib/               # Utility libraries
├── mock-data/         # Mock data generators and schemas
├── mock-msw/          # MSW handlers for intercepting API calls
├── router/            # React Router configuration
├── store/             # Redux store configuration
├── stores/            # Redux slices (individual domain slices)
├── styles/            # Tailwind CSS styles
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── views/             # Page-level view components
├── main.tsx           # Application entry point
└── index.html         # HTML entry point
```

**Store vs Stores**: `src/store/` contains Redux store configuration (index.ts, store.ts), while `src/stores/` contains individual Redux slices (tasksSlice.ts, contactsSlice.ts, etc.).

## API Documentation

### API Endpoints

API endpoints follow REST conventions and are grouped by resource:

- `/api/v1/tasks` - Task management
- `/api/v1/contacts` - Contact management
- `/api/v1/companies` - Company management
- `/api/v1/activities` - Activity tracking
- `/api/v1/auth` - Authentication

### Authentication

- JWT tokens are used for authentication
- Use `Authorization: Bearer <token>` header
- Implement role-based access control (RBAC)
- Token expiration is configurable via environment variables

### Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

### Error Format

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

## Development Environment

### Docker Compose

Use Docker Compose for local environment setup:

```bash
docker compose up -d
```

This will start:
- PostgreSQL database
- Redis cache

### CI/CD (Jenkins)

Jenkins pipeline runs the following checks on each commit:

1. Frontend build
2. Frontend tests
3. ESLint checks

## Contributing

### Adding a New Feature

1. Create feature branch from `main`
2. Implement feature following conventions
3. Write tests
4. Update documentation
5. Submit pull request

### Adding a New Database Migration

1. Run migration generator
2. Write migration
3. Test locally with migration runner
4. Ensure migration is reversible

## Troubleshooting

### Common Issues

- **Database connection errors**: Verify DATABASE_URL is correct and backend is running
- **Redis connection errors**: Verify REDIS_URL is correct and Redis is running
- **Tests failing**: Check test logs for specific failures
- **Linting errors**: Run `pnpm lint:fix` to auto-fix lint issues
- **Build errors**: Ensure all dependencies are installed (`pnpm install`)
