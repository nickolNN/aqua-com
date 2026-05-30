# Aqua CRM - Architecture Overview

## System Architecture

Aqua CRM is a client-server application with a REST API backend and a modern frontend framework. The system follows a separation of concerns pattern with clear boundaries between layers.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Client Application                           │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │   Task View   │  │ Activity    │  │ Contact/    │                │
│   │               │  │ Timeline    │  │ Company     │                │
│   │               │  │             │  │ Views       │                │
│   └─────────────┘  └─────────────┘  └─────────────┘                │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │    Store/    │  │    Forms    │  │    Tables   │                │
│   │   State      │  │    Views    │  │    Views    │                │
│   └─────────────┘  └─────────────┘  └─────────────┘                │
└───────────────────────┬─────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        API Layer (REST)                               │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │   Routes      │  │  Controllers│  │   Services  │                │
│   │               │  │             │  │             │                │
│   └─────────────┘  └─────────────┘  └─────────────┘                │
└───────────────────────────────────────┬─────────────────────────────┘
                                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Data Access Layer                             │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │  Models     │  │ Repositories│  │  Migrations │                │
│   │             │  │             │  │             │                │
└───┴─────────────┴───────────────┴───────────────┴─────────────────┘
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Relational Database                           │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │  Tasks      │  │  Activities │  │  Contacts   │                │
│   └─────────────┘  └─────────────┘  └─────────────┘                │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│   │ Companies   │  │  Users      │  │  Relations  │                │
│   └─────────────┘  └─────────────┘  └─────────────┘                │
└─────────────────────────────────────────────────────────────────────┘
```

## Design Approach

Aqua CRM follows Domain-Driven Design (DDD) with functional programming paradigms.

### Domain-Driven Design

The project applies DDD principles to model the business domain:

- **Ubiquitous Language**: Domain terms (Task, Contact, Company, Activity) are used consistently across code, API, and database
- **Bounded Contexts**: Clear boundaries between core business areas (Task Management, Contact Management, Activity Tracking)
- **Domain Models**: Rich domain models with behavior, not just data carriers
- **Aggregates**: Task, Contact, and Company are aggregate roots with clear invariants

### Functional Programming

Business logic follows functional programming patterns:

- **Immutability**: Domain events and outputs are immutable
- **Pure functions**: Service layer functions are pure where possible (no side effects)
- **Explicit effects**: Side effects (DB writes, API calls) are explicit and separated
- **Result types**: Use explicit Result/Error types instead of exceptions
- **Pipeline style**: Business logic flows through composable function pipelines

### Loose Coupling

Modules are designed to be as loosely coupled as possible:

- **Interface-based communication**: Modules communicate through interfaces, not concrete implementations
- **Dependency injection**: Dependencies are injected rather than hardcoded
- **Event-driven**: Domain events notify other modules without direct references
- **No circular dependencies**: Strict one-directional dependency flow
- **Repository pattern**: Domain layer knows nothing about persistence; repositories abstract data access
- **Service layer decoupling**: Application services depend on interfaces, not concrete implementations

### Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Domain Layer (Pure)                        │
│   Domain Models · Domain Services · Domain Events              │
└─────────────────────────────────────────────────────────────┘
                         ▲
                         │
┌─────────────────────────────────────────────────────────────┐
│              Application Layer (Pure)                         │
│   Application Services · Use Cases · Business Rules           │
└─────────────────────────────────────────────────────────────┘
                         ▲
                         │
┌─────────────────────────────────────────────────────────────┐
│                   Infrastructure Layer                        │
│   Repositories · Database · External Services                 │
└─────────────────────────────────────────────────────────────┘
```

### Domain Packages

Each domain area (tasks, contacts, companies, activities) has its own package:

- `src/backend/src/domain/` — Shared domain types and interfaces
- `src/backend/src/domain/tasks/` — Task domain model and services
- `src/backend/src/domain/contacts/` — Contact domain model and services
- `src/backend/src/domain/companies/` — Company domain model and services
- `src/backend/src/domain/activities/` — Activity domain model and services
- `src/backend/src/app/` — Application layer use cases
- `src/backend/src/repositories/` — Repository implementations

### Why This Matters

- Developers know how to organize code and where to find business logic
- New team members understand the architectural style immediately
- Code reviews follow DDD and FP conventions consistently

### Directory Structure

```
aqua-crm/
├── AGENTS.md                  # Agent instructions & project documentation
├── docs/
│   ├── ARCHITECTURE.md        # Architecture overview (this file)
│   └── FEATURES.md            # Feature documentation
├── src/
│   ├── backend/               # Backend server code (Go + Gin)
│   │   ├── src/
│   │   │   ├── config/        # Configuration files
│   │   │   ├── routes/        # API route definitions
│   │   │   ├── controllers/   # Request handlers (Gin handlers)
│   │   │   ├── services/      # Business logic
│   │   │   ├── models/        # Data models (GORM models)
│   │   │   ├── repositories/  # Data access layer
│   │   │   ├── middleware/    # Gin middleware
│   │   │   ├── migrations/    # Database migrations
│   │   │   └── seeds/       # Database seeding
│   │   └── tests/           # Backend tests (Go testing)
│   └── frontend/              # Frontend application (React + Redux)
│       ├── src/
│       │   ├── components/    # React components (shadcn/ui)
│       │   ├── views/         # Page components
│       │   ├── stores/        # Redux store
│       │   ├── api/           # API client (React Query)
│       │   └── styles/        # Tailwind CSS styles
│       └── tests/           # Frontend tests (Jest)
├── package.json              # Project configuration
├── .env.example              # Environment variables template
├── .eslintrc.js              # ESLint configuration
└── tsconfig.json             # TypeScript configuration
```

## Data Flow

### Task Creation Flow

1. **Request**: Frontend sends `POST /api/tasks` with task data
2. **Validation**: Backend validates input against schema
3. **Business Logic**: Service layer creates task record
4. **Persistence**: Repository saves to database
5. **Activity**: Automatic activity creation (if configured)
6. **Response**: Return created task with UUID

### Activity Timeline Flow

1. **Request**: Frontend requests `/api/contacts/:id/timeline`
2. **Aggregation**: Backend aggregates tasks and activities
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
- **Backend Language**: Go
- **Backend Framework**: Gin
- **Database ORM**: GORM
- **Database**: PostgreSQL
- **Database Scale**: Small (<1000 users)
- **Backend Testing**: Go testing package
- **CI/CD**: Jenkins
- **Caching**: Redis
- **File Storage**: Local filesystem
- **Deployment**: Docker Compose on VPS/VM

## Technology Stack

### Backend Stack
- **Runtime**: Go
- **Framework**: Gin (REST API)
- **ORM**: GORM
- **Database**: PostgreSQL

### Frontend Stack
- **Framework**: React 19 with TypeScript (React Compiler)
- **State Management**: Redux Toolkit
- **API Layer**: React Query
- **Styling**: Tailwind CSS + shadcn/ui components
- **Package Manager**: pnpm

### Development Tools
- **Linting**: golangci-lint (Go) + ESLint (frontend)
- **Testing**: Go testing package (backend) + Jest (frontend)
- **CI/CD**: Jenkins
- **Caching**: Redis
- **File Storage**: Local filesystem
- **Deployment**: Docker Compose on VPS/VM

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
