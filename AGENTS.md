# Aqua CRM - Agent Instructions

Kanban-only app (kanban board + login + theme toggle). React 19 + Redux Toolkit + RTK Query.

## Commands
- `pnpm dev` - Start dev server (React + Vite)
- `pnpm build` - Production build
- `pnpm test` - Run Playwright tests
- `pnpm lint` - Lint code
- `pnpm lint:fix` - Auto-fix lint issues

## Universal Rules
- Strict TypeScript mode
- Redux slice pattern for state
- RTK Query for API layer
- RTK mock interceptor (localStorage) for mock data in dev
- Playwright for E2E testing
- Tailwind CSS + shadcn/ui for styles
- Use `react-router` for routing
- Code with React Compiler compatibility

## Documentation
- [Testing Guidelines](docs/testing.md) - Test patterns and conventions
- [Git Workflow](docs/git-workflow.md) - Branch naming, commits, PRs
