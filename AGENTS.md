# Aqua CRM - Agent Instructions & Project Documentation

## Project Overview

Aqua CRM is a customer relationship management system with task management, activity tracking, contacts, and companies. Uses Go backend with Gin/GORM and React frontend with Redux Toolkit.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Go + Gin + GORM |
| Frontend | React 19 + TypeScript + Redux Toolkit + React Query |
| Database | PostgreSQL |
| Cache | Redis |
| Styling | Tailwind CSS + shadcn/ui |
| Build | pnpm |

## Project Structure

```
aqua-crm/
├── docs/
│   ├── ARCHITECTURE.md  # Architecture overview
│   ├── DEVELOPMENT.md   # Development guide
│   └── FEATURES.md     # Feature documentation
├── src/
│   ├── backend/        # Go backend (Gin + GORM)
│   │   ├── src/
│   │   │   ├── config/      # Configuration
│   │   │   ├── routes/      # API routes
│   │   │   ├── controllers/ # Request handlers
│   │   │   ├── services/    # Business logic
│   │   │   ├── models/      # GORM models
│   │   │   ├── repositories/ # Data access
│   │   │   ├── middleware/  # Middleware
│   │   │   ├── migrations/  # Database migrations
│   │   │   └── seeds/     # Database seeding
│   │   ├── tests/        # Go tests
│   │   └── main.go      # Entry point
│   └── frontend/        # React frontend
│       ├── src/
│       │   ├── components/   # React components
│       │   ├── views/       # Page components
│       │   ├── stores/      # Redux stores
│       │   ├── api/         # React Query API layer
│       │   └── styles/      # Tailwind CSS
│       └── tests/         # Jest tests
└── plans/            # Development plans
```

## Commands & Scripts

| Command | Description |
|---------|-------------|
| `npm run serve` | Start dev server (backend + frontend) |
| `npm run build` | Build project |
| `npm run lint` | Run linter |
| `npm run lint:fix` | Run linter and fix |
| `go test ./...` | Run backend tests |
| `go test -cover ./...` | Run backend tests with coverage |
| `pnpm test` | Run frontend tests |
| `golangci-lint run` | Run Go linter |

## Agent Roles

- **Frontend tasks**: frontend-specialist agent (React, TypeScript, Redux, Tailwind)
- **Backend tasks**: code agent (Go, Gin, GORM, PostgreSQL)

## Review Process

All code goes through three stages:

### Stage 1: Code Skeptic
- Question decisions: Why this approach? Simpler alternative?
- Identify edge cases and design flaws

### Stage 2: Code Simplifier
- Remove unnecessary complexity
- Follow KISS principle

### Stage 3: Code Reviewer
- Verify code quality and naming conventions
- Check 100% test coverage
- Validate API response format
- Confirm lint compliance
- Check security practices

## Testing Requirements

- **100% unit test coverage required for all code**
- Backend: Go table-driven tests (`go test ./...`)
- Frontend: Jest with React Testing Library
- Run coverage after each change: `go test -cover ./...`
- Run lint before committing: `golangci-lint run` / `pnpm lint`

## Key Conventions

- **Branch naming**: `feature/<desc>` or `fix/<desc>`
- **Commit messages**: conventional commits (`feat/tasks: add task dependencies`)
- **Naming**: kebab-case for files, camelCase for variables
- **API format**: All responses follow documented JSON format
- **Auth**: JWT via `Authorization: Bearer <token>` header
- **Security**: parameterized queries, CSRF protection, rate limiting

## API Conventions

All API responses follow this format:
```json
{
  "success": true,
  "data": {},
  "error": null
}
```

## Plans

## Plan & Orchestration

Refer to `plans/PLAN_PROGRESS.md` as the entry point for orchestrator agents. Track progress by checking off individual steps in the plan.

- Follow phase order: Foundation → Auth → Contacts → Tasks → Activities → Dashboard → Search → Frontend → Testing → Deployment
- Complete steps within each phase before moving to the next
- Each agent must request approval from human before proceeding to the next task:
  - Show UI preview for front-end tasks
  - Show unit-test results for backend tasks
  - Wait for human approval before continuing to the next step
