# Step 3: UI Component Library & Redux Integration

## Goal

Create shared UI component library with shadcn/ui and establish Redux integration patterns.

## Changes Required

| File/Directory | Action |
|----------------|--------|
| `src/components/ui/` | Create shared UI components (Button, Input, Table, Modal, Select, Badge, Card) |
| `src/components/layout/` | Create layout components (Sidebar, Header, MainLayout, AuthLayout) |
| `src/hooks/` | Create Redux hooks (useAppDispatch, useAppSelector) |
| `src/contexts/` | Create React Context providers (ThemeContext, AuthContext) |
| `src/lib/` | Create utility functions |

## Steps to Execute

- [ ] **FE** Install and configure shadcn/ui component library
- [ ] **FE** Create shared UI components: Button, Input, Table, Modal, Select, Badge, Card
- [ ] **FE** Create layout components: Sidebar, Header, MainLayout, AuthLayout
- [ ] **FE** Implement dark mode toggle with Tailwind CSS and Redux state management
- [ ] **FE** Create typed Redux hooks (useAppDispatch, useAppSelector)
- [ ] **FE** Create Context providers for theme and auth state management
- [ ] **FE** Set up Redux persist for critical state (auth, preferences)

## Verification

- All UI components render correctly with Tailwind CSS classes
- Dark mode toggle works and persists theme preference
- Layout components render correctly in all page views
- Context providers work correctly for global state

## Legend

| Tag | Meaning |
|-----|---------|
| **FE** | Frontend (React 19 + React Compiler + Redux Toolkit + RTK Query) |
