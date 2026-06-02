# Git Workflow

## Branch Naming

- Feature branches: `feature/<description>`
- Bug fix branches: `fix/<description>`
- Release branches: `release/<version>`

## Commit Conventions

Use conventional commits: `<type>(<scope>): <description>`

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example: `feat(tasks): add task dependency tracking`

## Pull Request Process

1. Create feature branch from `main`
2. Make changes and commit with conventional commits
3. Open Pull Request with description of changes
4. Request review from team members
5. Ensure all Jenkins checks pass
6. Merge after approvals

## Code Review Checklist

- [ ] Code follows naming conventions
- [ ] All tests pass
- [ ] No linting errors (ESLint + TypeScript)
- [ ] API responses follow standard format
- [ ] Input validation on all endpoints
- [ ] Security considerations addressed (XSS, CSRF)
- [ ] Documentation updated
