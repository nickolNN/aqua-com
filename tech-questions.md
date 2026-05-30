# Aqua CRM - Technical Questionnaire

## Goal

Gather technical preferences and requirements for the Aqua CRM project.

**Instructions:** Answer questions in order. Response options are generated dynamically based on previous answers.

## Confirmed Technical Choices (from FEATURES.md)

Based on the Feature Specifications document, the following choices are confirmed:

- **API**: REST only
- **Authentication**: JWT (JSON Web Tokens) with bcrypt for password hashing
- **UI Style**: Modern, minimalistic design with dark mode toggle
- **Internationalization**: Support for multiple languages
- **Responsive Design**: Full responsive design for mobile devices
- **RBAC**: Custom roles with granular permissions
- **Audit Logging**: Partial audit trail for selected events
- **Webhooks**: All major events

---

## Dynamic Response Options

For each question below, generate response options dynamically based on previous answers:

- **Backend Language**: If TypeScript/JavaScript → Node.js frameworks; if Python → Django/FastAPI/Flask; if Go → net/http, Chi, Echo, gin
- **Backend Framework**: Depends on language choice (NestJS, Express, Fastify for Node; Django REST, FastAPI, Flask for Python; net/http, Chi, Echo for Go)
- **Database ORM**: Depends on framework choice (Prisma for NestJS/Node; Sequelize, Knex for Express; Django ORM for Django; SQLAlchemy for FastAPI; GORM for Go)
- **Database**: Depends on ORM choice (PostgreSQL recommended for most ORMs; MySQL/SQLite alternatives)
- **Testing Strategy**: Depends on language/framework (Jest for Node.js; Pytest for Python; Go testing for Go)
- **Frontend Framework**: Independent question (React, Vue, Next.js, Svelte)
- **State Management**: Depends on frontend framework (Zustand/Redux for React; Server Actions for Next.js; Pinia/Vuex for Vue)
- **Styling Approach**: Independent question (Tailwind CSS, CSS Modules, CSS-in-JS, etc.)
- **UI Component Library**: Depends on frontend framework (Chakra/MUI/Ant Design for React; Vuetify/PrimeVue for Vue)
- **File Storage**: Depends on deployment (Local filesystem, AWS S3, Cloudinary, Azure Blob, GCP Storage)
- **Caching Strategy**: Depends on deployment (Redis, database caching, or none)
- **CI/CD**: Independent question (GitHub Actions, GitLab CI, Jenkins)
- **Code Quality Tools**: Depends on backend language (ESLint+Prettier for TS; PyLint+Black for Python; golangci-lint for Go)
- **Deployment Environment**: Depends on previous choices (AWS, GCP, Azure, Multi-cloud)

## Technical Questions

### 1. Backend Language
Which language should the backend be written in?

*(Answer)*: ______________________

### 2. Backend Framework
*(Options generated dynamically based on Q1)*

*(Answer)*: ______________________

### 3. Database ORM
*(Options generated dynamically based on Q2)*

*(Answer)*: ______________________

### 4. Database
*(Options generated dynamically based on ORM choice)*

*(Answer)*: ______________________

### 5. Database Scale
What scale should the system support?

- [ ] Small: <1000 users, <10000 contacts
- [ ] Medium: 1000-10000 users
- [ ] Large: 10000+ users
- [ ] Enterprise: 100000+ users

*(Answer)*: ______________________

### 6. Backend Testing Strategy
*(Options generated dynamically based on Q1)*

*(Answer)*: ______________________

### 7. Frontend Framework
Which frontend framework should be used?

- [ ] React: React 18+ with TypeScript
- [ ] Vue: Vue 3 with TypeScript (Composition API)
- [ ] Next.js: Next.js 14+ (React-based framework with SSR/SSG)
- [ ] Svelte: SvelteKit for a modern SPA/SSR approach
- [ ] Other: ______________________

*(Answer)*: ______________________

### 8. Frontend State Management
*(Options generated dynamically based on Q7)*

*(Answer)*: ______________________

### 9. Styling Approach
Which CSS approach should be used?

- [ ] Tailwind CSS: Utility-first CSS framework
- [ ] CSS Modules: Scoped CSS per component
- [ ] CSS-in-JS: Styled-components or Emotion
- [ ] CSS Variables: Design tokens with custom properties
- [ ] SASS/SCSS: Sass with preprocessor
- [ ] Other: ______________________

*(Answer)*: ______________________

### 10. UI Component Library
*(Options generated dynamically based on Q7)*

*(Answer)*: ______________________

### 11. File Storage
Where should attachments be stored?

- [ ] Local filesystem: Store on server disk
- [ ] AWS S3: Amazon Simple Storage Service
- [ ] Cloudinary: Media storage service
- [ ] Azure Blob Storage: Azure object storage
- [ ] GCP Storage: Google Cloud Storage
- [ ] Other: ______________________

*(Answer)*: ______________________

### 12. Caching Strategy
What caching strategy should be used?

- [ ] Redis: For session/store caching
- [ ] Database caching: Use database-level caching only
- [ ] No caching: No cache layer needed
- [ ] Other: ______________________

*(Answer)*: ______________________

### 13. CI/CD
Which CI/CD platform should be used?

- [ ] GitHub Actions: GitHub Actions workflow
- [ ] GitLab CI: GitLab CI/CD pipeline
- [ ] Jenkins: Jenkins pipeline
- [ ] CircleCI: CircleCI continuous integration
- [ ] Other: ______________________

*(Answer)*: ______________________

### 14. Code Quality Tools
*(Options generated dynamically based on Q1)*

*(Answer)*: ______________________

### 15. Deployment Environment
Which deployment environment should be used?

- [ ] AWS: AWS deployment
- [ ] GCP: Google Cloud Platform
- [ ] Azure: Azure deployment
- [ ] Multi-cloud: Multi-cloud deployment
- [ ] VPS/VM: Direct deployment to server
- [ ] Other: ______________________

*(Answer)*: ______________________

### 16. Deployment Method
How should the app be deployed?

- [ ] Docker Compose: Docker Compose for local/production
- [ ] Docker + ECS/EKS: AWS container orchestration
- [ ] Docker + Kubernetes: Kubernetes orchestration
- [ ] Next.js on Vercel: Deploy on Vercel
- [ ] Next.js on Docker: Self-hosted on Docker
- [ ] Next.js on VPS: Deploy on VPS
- [ ] Other: ______________________

*(Answer)*: ______________________
