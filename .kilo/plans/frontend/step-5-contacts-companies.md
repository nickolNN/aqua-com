# Step 5: Contacts & Companies

## Goal

Implement contacts and companies CRUD operations with RTK Query and mock data.

## Changes Required

| File/Directory | Action |
|----------------|--------|
| `src/stores/contactsSlice.ts` | Contacts Redux slice |
| `src/stores/companiesSlice.ts` | Companies Redux slice |
| `src/api/contactsApi.ts` | RTK Query contacts endpoints |
| `src/api/companiesApi.ts` | RTK Query companies endpoints |
| `src/views/ContactsPage.tsx` | Contacts list page |
| `src/views/ContactDetail.tsx` | Contact detail view |
| `src/views/ContactForm.tsx` | Contact create/edit form |
| `src/views/CompaniesPage.tsx` | Companies list page |
| `src/views/CompanyDetail.tsx` | Company detail view |
| `src/views/CompanyForm.tsx` | Company create/edit form |

## Steps to Execute

- [ ] **FE** Create contacts Redux slice with CRUD reducers and async thunks
- [ ] **FE** Create companies Redux slice with CRUD reducers and async thunks
- [ ] **FE** Create RTK Query API definitions for contacts and companies
- [ ] **FE** Set up RTK Query cache tags for automatic cache invalidation
- [ ] **FE** Connect RTK Query interceptor to centralized mock data
- [ ] **FE** Create Contact List page with search and filter
- [ ] **FE** Create Contact Detail view
- [ ] **FE** Create Contact Create/Edit form with validation
- [ ] **FE** Create Company List page with search and filter
- [ ] **FE** Create Company Detail view
- [ ] **FE** Create Company Create/Edit form with validation

## Verification

- Contact and company list pages display mock data correctly
- Create/Edit forms validate inputs and submit to mock data
- Detail views display associated data correctly
- Cache invalidation works when creating/updating records

## Legend

| Tag | Meaning |
|-----|---------|
| **FE** | Frontend (React 19 + React Compiler + Redux Toolkit + RTK Query) |
