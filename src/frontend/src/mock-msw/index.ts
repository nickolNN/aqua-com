// =====================================================
// MSW (Mock Service Worker) Handlers
// =====================================================
// Intercepts network requests and returns mock data
// for all API endpoints.
// =====================================================

import { http, HttpResponse } from 'msw';
import {
  generateContacts,
  generateCompanies,
  generateTasks,
  generateActivities,
  generateContact,
  generateCompany,
  generateTask,
  generateActivity,
} from '../mock-data/generators';

// =====================================================
// Contacts Handlers
// =====================================================

/**
 * GET /api/contacts
 * GET /api/contacts/:search
 * Returns a list of contacts
 */
export const contactsHandlers = [
  http.get('/api/contacts', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    const contacts = generateContacts(10);
    if (search) {
      // Filter by search term
      const filtered = contacts.filter(
      (contact) =>
        contact.first_name.toLowerCase().includes(search) ||
        contact.last_name.toLowerCase(). includes(search) ||
        contact.email.includes(search)
    );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }
    return HttpResponse.json({ success: true, data: contacts, error: null });
  }),

  /**
   * GET /api/contacts/:id
   * Returns a single contact
   */
  http.get('/api/contacts/:id', () => {
    const contact = generateContact();
    return HttpResponse.json({ success: true, data: contact, error: null });
  }),

  /**
   * POST /api/contacts
   * Creates a new contact
   */
  http.post('/api/contacts', async ({ request }) => {
    await request.json();
    const newContact = generateContact();
    return HttpResponse.json({ success: true, data: newContact, error: null });
  }),

  /**
   * PUT /api/contacts/:id
   * Updates an existing contact
   */
  http.put('/api/contacts/:id', async ({ request }) => {
    await request.json();
    const updatedContact = generateContact();
    return HttpResponse.json({ success: true, data: updatedContact, error: null });
  }),

  /**
   * DELETE /api/contacts/:id
   * Deletes a contact
   */
  http.delete('/api/contacts/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),
];

// =====================================================
// Companies Handlers
// =====================================================

/**
 * GET /api/companies
 * Returns a list of companies
 */
export const companiesHandlers = [
  http.get('/api/companies', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    const companies = generateCompanies(10);
    if (search) {
      // Filter by search term
      const filtered = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(search) ||
        company.industry?.includes(search)
    );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }
    return HttpResponse.json({ success: true, data: companies, error: null });
  }),

  /**
   * GET /api/companies/:id
   * Returns a single company
   */
  http.get('/api/companies/:id', () => {
    const company = generateCompany();
    return HttpResponse.json({ success: true, data: company, error: null });
  }),

  /**
   * POST /api/companies
   * Creates a new company
   */
  http.post('/api/companies', async ({ request }) => {
     await request.json();
     const newCompany = generateCompany();
     return HttpResponse.json({ success: true, data: newCompany, error: null });
   }),

   /**
    * PUT /api/companies/:id
    * Updates an existing company
    */
   http.put('/api/companies/:id', async ({ request }) => {
     await request.json();
     const updatedCompany = generateCompany();
     return HttpResponse.json({ success: true, data: updatedCompany, error: null });
   }),

  /**
   * DELETE /api/companies/:id
   * Deletes a company
   */
  http.delete('/api/companies/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),
];

// =====================================================
// Tasks Handlers
// =====================================================

/**
 * GET /api/tasks
 * Returns a list of tasks
 */
export const tasksHandlers = [
  http.get('/api/tasks', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    const tasks = generateTasks(10);
    if (search) {
      // Filter by search term
      const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(search) ||
        task.description?.includes(search)
    );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }
    return HttpResponse.json({ success: true, data: tasks, error: null });
  }),

  /**
   * GET /api/tasks/:id
   * Returns a single task
   */
  http.get('/api/tasks/:id', () => {
    const task = generateTask();
    return HttpResponse.json({ success: true, data: task, error: null });
  }),

  /**
   * POST /api/tasks
   * Creates a new task
   */
  http.post('/api/tasks', async ({ request }) => {
    await request.json();
    const newTask = generateTask();
    return HttpResponse.json({ success: true, data: newTask, error: null });
  }),

  /**
   * PUT /api/tasks/:id
   * Updates an existing task
   */
  http.put('/api/tasks/:id', async ({ request }) => {
    await request.json();
    const updatedTask = generateTask();
    return HttpResponse.json({ success: true, data: updatedTask, error: null });
  }),

  /**
   * DELETE /api/tasks/:id
   * Deletes a task
   */
  http.delete('/api/tasks/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),
];

// =====================================================
// Activities Handlers
// =====================================================

/**
 * GET /api/activities
 * Returns a list of activities
 */
export const activitiesHandlers = [
  http.get('/api/activities', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    const activities = generateActivities(10);
    if (search) {
      // Filter by search term
      const filtered = activities.filter(
      (activity) =>
        activity.title.toLowerCase().includes(search) ||
        activity.description?.includes(search)
    );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }
    return HttpResponse.json({ success: true, data: activities, error: null });
  }),

  /**
   * GET /api/activities/:id
   * Returns a single activity
   */
  http.get('/api/activities/:id', () => {
    const activity = generateActivity();
    return HttpResponse.json({ success: true, data: activity, error: null });
  }),

  /**
   * POST /api/activities
   * Creates a new activity
   */
  http.post('/api/activities', async ({ request }) => {
    await request.json();
    const newActivity = generateActivity();
    return HttpResponse.json({ success: true, data: newActivity, error: null });
  }),

  /**
   * PUT /api/activities/:id
   * Updates an existing activity
   */
  http.put('/api/activities/:id', async ({ request }) => {
    await request.json();
    const updatedActivity = generateActivity();
    return HttpResponse.json({ success: true, data: updatedActivity, error: null });
  }),

  /**
   * DELETE /api/activities/:id
   * Deletes an activity
   */
  http.delete('/api/activities/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),
];

// =====================================================
// Auth Handlers
// =====================================================

/**
 * POST /api/auth/login
 * Logs in a user
 */
export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      data: {
        token: 'mock-jwt-token',
        user: { id: 'mock-user-id', email: (body as Record<string, unknown>)?.email as string, role: 'admin' },
      },
      error: null,
    });
  }),

  /**
   * POST /api/auth/register
   * Registers a new user
   */
  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      data: {
        token: 'mock-jwt-token',
        user: { id: 'mock-user-id', email: (body as Record<string, unknown>)?.email as string, role: 'user' },
      },
      error: null,
    });
  }),
];

// =====================================================
// Export All Handlers
// =====================================================

/**
 * All MSW handlers
 */
export const handlers = [
  ...contactsHandlers,
  ...companiesHandlers,
  ...tasksHandlers,
  ...activitiesHandlers,
  ...authHandlers,
];
