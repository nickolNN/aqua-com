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
2. Install backend dependencies: `go mod tidy`
3. Install frontend dependencies: `pnpm install`
4. Copy environment variables: `cp .env.example .env`
5. Configure `.env` with your database credentials
6. Run migrations: `go run src/backend/cmd/migrate`
7. Seed the database (optional): `go run src/backend/cmd/seed`
8. Start Redis: `docker compose up redis -d`

### Environment Variables

See `.env.example` for available options. Key variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `postgresql://user:pass@localhost:5432/aqua_crm` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key-here` |
| `API_HOST` | API server host | `localhost` |
| `API_PORT` | API server port | `3000` |
| `NODE_ENV` | Environment name | `development` |

## Running the Application

### Start Development Server

```bash
# Start backend (Go + Gin)
cd src/backend && go run src/main.go

# Start frontend (React + Redux + React Query)
cd src/frontend && pnpm dev
```

This will start both the backend API and frontend dev server.

### Build for Production

```bash
# Build backend
go build -o bin/server src/main.go

# Build frontend
cd src/frontend && pnpm build
```

## Testing

### Run Backend Tests

```bash
cd src/backend && go test ./...
```

### Run Frontend Tests

```bash
cd src/frontend && pnpm test
```

### Run Tests with Coverage

```bash
cd src/backend && go test -cover ./...
cd src/frontend && pnpm test -- --coverage
```

### Testing Conventions

- Write unit tests for models and utility functions
- Write integration tests for API endpoints
- Write end-to-end tests for critical user flows (task creation, contact management)
- Aim for high coverage on core features (tasks, contacts, activities)
- Use Go testing package for backend tests (table-driven tests preferred)
- Use React Testing Library for frontend component tests

## Database Migrations

### Generate Migration

```bash
cd src/backend && go run src/cmd/migrate-generate main.go
```

### Run Migrations

```bash
cd src/backend && go run src/cmd/migrate/main.go up
```

### Seeding

```bash
cd src/backend && go run src/cmd/seed/main.go
```

## Linting & Formatting

### Backend (Go)

```bash
cd src/backend && golangci-lint run
```

### Frontend (React)

```bash
cd src/frontend && pnpm lint
```

### Auto-fix Lint Issues

```bash
cd src/frontend && pnpm lint:fix
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
- [ ] All tests pass (Go + frontend)
- [ ] No linting errors (golangci-lint + frontend ESLint)
- [ ] API responses follow standard format
- [ ] Input validation on all endpoints
- [ ] Database migrations are reversible
- [ ] Security considerations addressed (SQL injection, XSS, CSRF)
- [ ] Documentation updated

## Project Structure

### Backend Structure

```
src/backend/
├── src/
│   ├── config/          # Configuration files
│   ├── routes/          # API route definitions (Gin routes)
│   ├── controllers/     # Request handlers (Gin handlers)
│   ├── services/        # Business logic
│   ├── models/          # Data models (GORM models)
│   ├── repositories/    # Data access layer
│   ├── middleware/      # Gin middleware
│   ├── migrations/      # Database migrations
│   ├── seeds/           # Database seeding
│   └── main.go          # Entry point
├── tests/               # Backend tests (Go)
├── go.mod               # Go module dependencies
└── go.sum               # Go checksums
```

### Frontend Structure

```
src/frontend/
├── src/
│   ├── components/      # React components (shadcn/ui)
│   ├── views/           # Page components
│   ├── stores/          # Redux store (Redux Toolkit)
│   ├── api/             # API client (React Query)
│   ├── styles/          # Tailwind CSS styles
│   ├── App.tsx          # App entry point
│   └── main.tsx         # React entry point
├── tests/               # Frontend tests (Jest + React Testing Library)
├── package.json         # Frontend dependencies
└── tsconfig.json        # TypeScript configuration
```

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
- Backend service
- Frontend dev server

### CI/CD (Jenkins)

Jenkins pipeline runs the following checks on each commit:

1. Go build and vet
2. Go tests with coverage
3. Frontend build
4. Frontend tests
5. ESLint checks

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

- **Database connection errors**: Verify DATABASE_URL is correct
- **Redis connection errors**: Verify REDIS_URL is correct and Redis is running
- **Migration errors**: Check migration files for syntax errors
- **Tests failing**: Check test logs for specific failures
- **Linting errors**: Run `golangci-lint` and frontend lint commands to auto-fix
- **Build errors**: Ensure all dependencies are installed (`go mod tidy` / `pnpm install`)
