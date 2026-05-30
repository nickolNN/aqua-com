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
- TypeScript type check passes with no errors (`tsc --noEmit`)
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

## Plan Completion Verification

| Check | Requirement | Command |
|-------|-------------|---------|
| Build | Code compiles | `go build ./...` / `npm run build` |
| Tests | All tests pass | `go test -cover ./...` / `pnpm test -- --coverage` |
| Lint | No lint errors | `golangci-lint run` / `pnpm lint` |
| Typecheck | No TypeScript errors | `tsc --noEmit` |
| Approval | Human approves step | Manual verification |

## Step Completion Criteria

A step is complete when all of the following are met:
1. All sub-items (e.g., "9.1", "9.2", etc.) in the step file are implemented
2. Unit tests written before implementation (where possible, TDD approach)
3. Code compiles and builds without errors
4. Tests pass with 100% coverage where possible
5. No lint errors remain
6. TypeScript type check passes with zero errors (`tsc --noEmit`)
7. Human has approved the step

## Plan Completion Criteria

A plan is considered complete when:
- All phases are marked complete in `plans/PLAN_PROGRESS.md`
- All steps within each phase pass verification checks
- Final review by human confirms all requirements met

## Unit Test-First Development Strategy

When possible, start development with unit tests first (TDD approach):
1. **Identify testable unit**: Determine what unit/function can be tested independently
2. **Write unit test first**: Write the test that describes expected behavior before implementation
3. **Implement code**: Write minimal code to satisfy the test
4. **Verify test passes**: Run tests to confirm implementation meets requirements
5. **Refactor if needed**: Ensure test still passes after refactoring

Test coverage requirements:
- All code must have 100% unit test coverage where possible
- Backend: Go table-driven tests (`go test ./...`) with coverage check (`go test -cover ./...`)
- Frontend: Jest with React Testing Library (`pnpm test`)
- No step is complete until tests pass and coverage is verified

## Plan Execution Rules

### Plan-Before-Execution
Each step must be planned before execution:
1. **Review step file**: Read the step's sub-items from `plans/phase*/step_*.md`
2. **Plan execution strategy**: Break each sub-item into concrete actions before running commands
3. **Verify prerequisites**: Confirm any dependencies (models, migrations, endpoints) exist before implementing
4. **Execute planned steps sequentially**: Follow the plan, verify each sub-item before moving to next
5. **Record verification**: After completion, confirm all sub-items are fulfilled

### Phase-Level Gates
- Before starting a new phase, verify the previous phase's steps are complete
- Each phase gate requires: build passes + tests pass + human approval

### Pre-Step Verification
Before each step begins:
- Confirm previous step's completeness (or initial step)
- Check if any prerequisites are met (e.g., database schema ready before API implementation)
- Verify build is clean (no pending errors from previous steps)

### Phase Restriction

Each agent is restricted to working on only one phase at a time. This ensures focused work and prevents an agent from jumping between phases.

#### Rules

1. **Single-Phase Restriction**: An agent must complete all steps within a phase before moving to the next phase
2. **No Cross-Phase Overlap**: An agent cannot start work on phase N+1 until all steps in phase N are marked complete
3. **Agent Handoff**: Once a phase is complete, the appropriate agent(s) for the next phase begin work
4. **Verification**: Agent assignment is tracked via the step tags (**BE** / **FE**) in `plans/PLAN_PROGRESS.md`

### Quality Delivery Strategy
1. Focus on one phase at a time; complete all steps in a phase before moving to the next
2. Test-first per step where possible; write unit tests before implementation code
3. Quality gates per phase: build + tests + lint + human approval before proceeding
4. Incremental delivery: each phase delivers a working, testable subset of functionality
5. Prioritize quality over speed - ensure each step passes all verification before moving on

## Plan File Format

Plan files (`.kilo/plans/*.md`) must include explicit completion tracking:
- Goal summary
- Changes required (files modified)
- Step breakdown (what steps were executed)
- Agent roles used
- Testing requirements met
- Review process summary
- Final state: plan complete | plan partial | plan in progress
