
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

export const contactsHandlers = [
  http.get('/api/contacts', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    const contacts = generateContacts(10);
    if (search) {
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

  http.get('/api/contacts/:id', () => {
    const contact = generateContact();
    return HttpResponse.json({ success: true, data: contact, error: null });
  }),

  http.post('/api/contacts', async ({ request }) => {
    await request.json();
    const newContact = generateContact();
    return HttpResponse.json({ success: true, data: newContact, error: null });
  }),

  http.put('/api/contacts/:id', async ({ request }) => {
    await request.json();
    const updatedContact = generateContact();
    return HttpResponse.json({ success: true, data: updatedContact, error: null });
  }),

  http.delete('/api/contacts/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),
];

export const companiesHandlers = [
  http.get('/api/companies', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    const companies = generateCompanies(10);
    if (search) {
      const filtered = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(search) ||
        company.industry?.includes(search)
    );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }
    return HttpResponse.json({ success: true, data: companies, error: null });
  }),

  http.get('/api/companies/:id', () => {
    const company = generateCompany();
    return HttpResponse.json({ success: true, data: company, error: null });
  }),

  http.post('/api/companies', async ({ request }) => {
     await request.json();
     const newCompany = generateCompany();
     return HttpResponse.json({ success: true, data: newCompany, error: null });
   }),

   http.put('/api/companies/:id', async ({ request }) => {
     await request.json();
     const updatedCompany = generateCompany();
     return HttpResponse.json({ success: true, data: updatedCompany, error: null });
   }),

  http.delete('/api/companies/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),
];

export const tasksHandlers = [
  http.get('/api/tasks', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    const tasks = generateTasks(10);
    if (search) {
      const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(search) ||
        task.description?.includes(search)
    );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }
    return HttpResponse.json({ success: true, data: tasks, error: null });
  }),

  http.get('/api/tasks/:id', () => {
    const task = generateTask();
    return HttpResponse.json({ success: true, data: task, error: null });
  }),

  http.post('/api/tasks', async ({ request }) => {
    await request.json();
    const newTask = generateTask();
    return HttpResponse.json({ success: true, data: newTask, error: null });
  }),

  http.put('/api/tasks/:id', async ({ request }) => {
    await request.json();
    const updatedTask = generateTask();
    return HttpResponse.json({ success: true, data: updatedTask, error: null });
  }),

  http.delete('/api/tasks/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),
];

export const activitiesHandlers = [
  http.get('/api/activities', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    const activities = generateActivities(10);
    if (search) {
      const filtered = activities.filter(
      (activity) =>
        activity.title.toLowerCase().includes(search) ||
        activity.description?.includes(search)
    );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }
    return HttpResponse.json({ success: true, data: activities, error: null });
  }),

  http.get('/api/activities/:id', () => {
    const activity = generateActivity();
    return HttpResponse.json({ success: true, data: activity, error: null });
  }),

  http.post('/api/activities', async ({ request }) => {
    await request.json();
    const newActivity = generateActivity();
    return HttpResponse.json({ success: true, data: newActivity, error: null });
  }),

  http.put('/api/activities/:id', async ({ request }) => {
    await request.json();
    const updatedActivity = generateActivity();
    return HttpResponse.json({ success: true, data: updatedActivity, error: null });
  }),

  http.delete('/api/activities/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),
];

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

export const handlers = [
  ...contactsHandlers,
  ...companiesHandlers,
  ...tasksHandlers,
  ...activitiesHandlers,
  ...authHandlers,
];
