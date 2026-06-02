# Refactor AGENTS.md and ARCHITECTURE.md

## Goal
Create minimal AGENTS.md with universal instructions. Split ARCHITECTURE.md (293 lines) into focused linked files.

## Files to Create

### 1. AGENTS.md (new)
Universal rules only. Commands. Links to docs.

### 2. docs/api.md
Extract API conventions from ARCHITECTURE.md: response format, error format, auth, RBAC.

### 3. docs/database.md
Extract table schemas from ARCHITECTURE.md: tasks, contacts, companies, task_dependencies.

### 4. docs/testing.md
Extract from DEVELOPMENT.md: test conventions, frameworks, coverage targets.

### 5. docs/git-workflow.md
Extract from DEVELOPMENT.md: branch naming, commit conventions, PR process.

## Contradictions
None found. Docs consistent.

## Process
1. Create AGENTS.md with universal instructions
2. Extract docs/ARCHITECTURE.md sections into dedicated files
3. Keep docs/ARCHITECTURE.md as reference overview
4. Remove duplicated content from DEVELOPMENT.md
