# Aqua CRM - Architecture Overview

## System Architecture

Aqua CRM is a frontend application built with React, TypeScript, and Redux Toolkit. The application uses mock data (via MSW) for data simulation and connects to a REST API backend. The system follows a separation of concerns pattern with clear boundaries between views, components, stores, and the API layer.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Client Application (React + Redux)                 │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │    Views      │  │    Components │  │    Stores   │                │
│   │ (Pages)      │  │ (UI Pieces)   │  │ (State)     │                │
│   └─────────────┘  └─────────────┘  └─────────────┘                │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │  Layouts     │  │   Forms     │  │  Tables     │                │
│   │  (Sidebar    │  │  (TaskForm, │  │ (Kanban,   │                │
│   │   Header)     │  │   TaskForm) │  │ Grid)       │                │
│   └─────────────┘  └─────────────┘  └─────────────┘                │
└─────────────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        API Layer (RTK Query / React Query)          │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │   Endpoints   │  │  Hooks      │  │  Mock Data  │                │
│   │ (RTK Query)   │  │ (Custom    │  │  (MSW)      │                │
│   └─────────────┘  └─────────────┘  └─────────────┘                │
└─────────────────────────────────────────────────────────────────────┘

## Design Approach

Aqua CRM follows a layered frontend architecture with clear separation between views, components, stores, and API interactions.

### View Layer

The view layer organizes page-level components that represent different application screens:

- **Task Views**: Task list, task detail, task creation forms
- **Contact Views**: Contact list, contact detail, contact management
- **Company Views**: Company list, company detail
- **Activity Views**: Activity timeline, activity creation
- **Dashboard**: Overview with charts and summary data

### Component Architecture

Components follow a hierarchical structure:

- **Layout Components**: `src/components/layout/` — Sidebar, header, main layout wrapper
- **UI Components**: `src/components/ui/` — Reusable primitives (Button, Table, Modal, Card, Input, Select, Badge)
- **Feature Components**: `src/components/tasks/`, `src/components/activity/`, etc. — Domain-specific components
- **Search Components**: `src/components/search/` — Search bar, saved filters, results

### State Management

State is managed through Redux Toolkit with individual slices:

- **Store Configuration**: `src/store/` — Store setup and configuration
- **Redux Slices**: `src/stores/` — Individual slices (tasksSlice, contactsSlice, companiesSlice, activitiesSlice, dashboardSlice, searchSlice, settingsSlice, kanbanSlice)
- **Custom Hooks**: `src/hooks/` — Custom hooks for accessing state and dispatching actions
- **TypeScript Types**: `src/types/` — Entity and API type definitions

### API Layer

The API layer bridges the frontend with the backend via RTK Query:

- **RTK Query Endpoints**: Defined in `src/api/` — API endpoints for CRUD operations
- **Mock Data**: `src/mock-data/` — Mock data generators and schemas for development
- **MSW Handlers**: `src/mock-msw/` — MSW handlers intercepting API calls during development
- **Custom Hooks**: `src/api/` — Custom hooks for consuming API data

### Loose Coupling

Modules are designed to be as loosely coupled as possible:

- **Interface-based communication**: Components communicate through props and Redux actions
- **Dependency injection**: Dependencies injected via React context and Redux store
- **No circular dependencies**: Strict one-directional dependency flow (views → components → stores → API)
- **Slice pattern**: Redux slices follow the slice pattern with separate reducers, actions, and types

### Why This Matters

- Developers know how to organize code and where to find business logic
- New team members understand the architectural style immediately
- Code reviews follow DDD and FP conventions consistently

### Directory Structure

```
aqua-crm/
├── docs/
│   ├── ARCHITECTURE.md        # Architecture overview (this file)
│   └── DEVELOPMENT.md         # Development guide
├── src/
│   ├── api/                   # API layer (RTK Query endpoints, hooks)
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI primitives (Button, Table, Modal)
│   │   ├── layout/            # Layout components (Sidebar, Header, MainLayout)
│   │   ├── tasks/             # Task-specific components
│   │   ├── activity/          # Activity-specific components
│   │   └── search/            # Search components
│   ├── hooks/                 # Custom React hooks
│   ├── i18n/                  # Internationalization (i18next)
│   ├── lib/                   # Utility libraries
│   ├── mock-data/             # Mock data generators, schemas, persistence
│   ├── mock-msw/              # MSW handlers for intercepting API calls
│   ├── router/                # React Router configuration
│   ├── store/                 # Redux store configuration (index.ts, store.ts)
│   ├── stores/                # Redux slices (individual slices for each domain)
│   ├── styles/                # Tailwind CSS styles
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── views/                 # Page-level view components
│   ├── main.tsx               # Application entry point
│   └── index.html             # HTML entry point
├── package.json              # Project configuration
├── .env.example              # Environment variables template
├── .eslintrc.js              # ESLint configuration
└── tsconfig.json             # TypeScript configuration
```

## Data Flow

### Task Creation Flow

1. **Request**: Frontend sends `POST /api/tasks` with task data via RTK Query mutation
2. **Mock/Real**: During development, MSW intercepts and returns mock data; in production, backend validates and persists
3. **State Update**: Redux store updates via RTK Query cache invalidation
4. **Response**: Return created task with UUID

### Activity Timeline Flow

1. **Request**: Frontend requests `/api/contacts/:id/timeline`
2. **Aggregation**: Backend aggregates tasks and activities (or mock data returns aggregated data)
3. **Response**: Return chronological timeline data

### Contact-Company Relationship Flow

1. **Request**: Frontend manages contact-company relationships
2. **Validation**: Backend validates relationship constraints
3. **Persistence**: Database stores relationship via foreign keys

## Confirmed Technical Choices

Based on the Technical Questionnaire and Feature Specifications:

- **API**: REST only
- **Authentication**: JWT (JSON Web Tokens) with bcrypt for password hashing
- **UI Style**: Modern, minimalistic design with dark mode toggle
- **Internationalization**: Support for multiple languages
- **Responsive Design**: Full responsive design for mobile devices
- **RBAC**: Custom roles with granular permissions
- **Audit Logging**: Partial audit trail for selected events
- **Webhooks**: All major events
- **Frontend Framework**: React 19 + TypeScript + React Compiler
- **UI Component Library**: shadcn/ui
- **State Management**: Redux Toolkit
- **API Client**: RTK Query
- **Mock Data**: MSW (Mock Service Worker) for development
- **CI/CD**: Jenkins
- **Deployment**: Docker Compose on VPS/VM

## Technology Stack

### Frontend Stack
- **Framework**: React 19 with TypeScript (React Compiler)
- **State Management**: Redux Toolkit
- **API Layer**: RTK Query
- **Routing**: React Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Internationalization**: i18next
- **Package Manager**: pnpm

### Development Tools
- **Linting**: ESLint (frontend)
- **Testing**: React Testing Library + MSW
- **CI/CD**: Jenkins
- **Build Tool**: Vite

## Database Schema

### Core Tables

**tasks**
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | |
| status | VARCHAR(20) | NOT NULL, CHECK |
| priority | VARCHAR(20) | NOT NULL, CHECK |
| due_date | TIMESTAMP | |
| assigned_to | UUID | FOREIGN KEY |
| created_by | UUID | NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | DEFAULT NOW() |

**activities**
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| type | VARCHAR(20) | NOT NULL, CHECK |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | |
| contact_id | UUID | FOREIGN KEY |
| company_id | UUID | FOREIGN KEY |
| date | TIMESTAMP | NOT NULL |
| duration | INTEGER | |
| created_by | UUID | NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |

**contacts**
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| first_name | VARCHAR(100) | NOT NULL |
| last_name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| phone | VARCHAR(50) | |
| company_id | UUID | FOREIGN KEY |
| custom_fields | JSONB | |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | DEFAULT NOW() |

**companies**
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| name | VARCHAR(255) | NOT NULL |
| website | VARCHAR(255) | |
| industry | VARCHAR(100) | |
| address | TEXT | |
| custom_fields | JSONB | |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | DEFAULT NOW() |

**task_dependencies**
| Column | Type | Constraints |
|--------|------|-------------|
| predecessor_task_id | UUID | NOT NULL, FOREIGN KEY |
| successor_task_id | UUID | NOT NULL, FOREIGN KEY |
| dependency_type | VARCHAR(20) | NOT NULL, CHECK |

## API Conventions

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

### Authentication
- Use JWT tokens via Authorization header: `Authorization: Bearer <token>`
- Implement role-based access control (RBAC)
- Token expiration configurable via environment variables

## Environment Setup

### Required Environment Variables
```
DATABASE_URL=postgresql://user:password@localhost:5432/aqua_crm
JWT_SECRET=your_jwt_secret_key
API_HOST=localhost
API_PORT=3000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## Security Considerations
- HTTPS for all API endpoints in production
- Rate limiting via middleware
- Input validation and sanitization
- Parameterized queries to prevent SQL injection
- CSRF protection for state-changing requests
- CORS configuration for frontend-backend separation
- Environment variables for secrets management
