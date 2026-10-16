// MSW (Mock Service Worker) handlers for all entities
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
import { getStoredTasks, saveTasks } from '../mock-data/persistence';

// Helper to get request body
async function getRequestBody(request: Request): Promise<Record<string, unknown> | null> {
  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return null;
  }
  try {
    const text = await request.text();
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// ===================== TASKS PERSISTENCE =====================
// Tasks live in localStorage (mock_data_tasks). The store is seeded once
// with generated data on the first request; every read and write afterwards
// goes through getStoredTasks/saveTasks so created and updated tasks
// survive page refreshes (kanban persistence).
type TaskRecord = Record<string, unknown>;

function getTaskStore(): TaskRecord[] {
  const stored = getStoredTasks() as TaskRecord[];
  if (stored.length > 0) {
    return stored;
  }
  // SAFETY: generateTasks(10) always returns full Task objects (position included),
  // so casting to TaskRecord[] keeps the store shape valid for reads/merges.
  const seeded = generateTasks(10) as unknown as TaskRecord[];
  saveTasks(seeded);
  return seeded;
}
// Kanban position contract: when a PUT body carries `position` it must be a
// finite non-negative integer — it orders cards within a column and is what
// gets persisted into the mock_data_tasks store on every update.
function isValidPosition(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

// Create handlers array for MSW
export const handlers = [
  // ===================== CONTACTS =====================
  // GET /api/contacts
  http.get('/api/contacts', ({ request }) => {
    let url: URL;
    try {
      url = new URL(request.url);
    } catch {
      return new HttpResponse(null, { status: 400 });
    }
    const search = url.searchParams.get('search');

    const contacts = generateContacts(10);

    if (search) {
      // SAFETY: mock data is an array of objects
      const filtered = (contacts as unknown as Record<string, unknown>[]).filter(
      (contact) =>
        (contact as Record<string, string>)['first_name']?.toLowerCase().includes(search) ||
        (contact as Record<string, string>)['last_name']?.toLowerCase().includes(search) ||
        (contact as Record<string, string>)['email']?.includes(search)
    );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }

    return HttpResponse.json({ success: true, data: contacts, error: null });
  }),

  // GET /api/contacts/:id
  http.get('/api/contacts/:id', () => {
    const contact = generateContact();
    return HttpResponse.json({ success: true, data: contact, error: null });
  }),

  // POST /api/contacts
  http.post('/api/contacts', () => {
    const newContact = generateContact();
    return HttpResponse.json({ success: true, data: newContact, error: null });
  }),

  // PUT /api/contacts/:id
  http.put('/api/contacts/:id', () => {
    const updatedContact = generateContact();
    return HttpResponse.json({ success: true, data: updatedContact, error: null });
  }),

  // DELETE /api/contacts/:id
  http.delete('/api/contacts/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),

  // ===================== COMPANIES =====================
  // GET /api/companies
  http.get('/api/companies', ({ request }) => {
    let url: URL;
    try {
      url = new URL(request.url);
    } catch {
      return new HttpResponse(null, { status: 400 });
    }
    const search = url.searchParams.get('search');

    const companies = generateCompanies(10);

    if (search) {
      // SAFETY: mock data is an array of objects
      const filtered = (companies as unknown as Record<string, unknown>[]).filter(
      (company) =>
        (company as Record<string, string>)['name']?.toLowerCase().includes(search) ||
        ((company as Record<string, string>)['industry'] || '').toLowerCase().includes(search)
    );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }

    return HttpResponse.json({ success: true, data: companies, error: null });
  }),

  // GET /api/companies/:id
  http.get('/api/companies/:id', () => {
    const company = generateCompany();
    return HttpResponse.json({ success: true, data: company, error: null });
  }),

  // POST /api/companies
  http.post('/api/companies', () => {
    const newCompany = generateCompany();
    return HttpResponse.json({ success: true, data: newCompany, error: null });
  }),

  // PUT /api/companies/:id
  http.put('/api/companies/:id', () => {
    const updatedCompany = generateCompany();
    return HttpResponse.json({ success: true, data: updatedCompany, error: null });
  }),

  // DELETE /api/companies/:id
  http.delete('/api/companies/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),

  // ===================== TASKS =====================
  // GET /api/tasks
  http.get('/api/tasks', ({ request }) => {
    let url: URL;
    try {
      url = new URL(request.url);
    } catch {
      return new HttpResponse(null, { status: 400 });
    }
    const search = url.searchParams.get('search');

    const tasks = getTaskStore();

    if (search) {
      const filtered = tasks.filter(
        (task) =>
          (task['title'] as string | undefined)?.toLowerCase().includes(search) ||
          ((task['description'] as string | undefined) || '').toLowerCase().includes(search)
      );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }

    return HttpResponse.json({ success: true, data: tasks, error: null });
  }),

  // GET /api/tasks/:id
  http.get('/api/tasks/:id', ({ params }) => {
    const tasks = getTaskStore();
    const task = tasks.find((t) => t['id'] === params.id);
    if (!task) {
      return HttpResponse.json(
        { success: false, data: null, error: `Task ${params.id} not found` },
        { status: 404 },
      );
    }
    return HttpResponse.json({ success: true, data: task, error: null });
  }),

  // POST /api/tasks
  http.post('/api/tasks', async ({ request }) => {
    const body = (await getRequestBody(request)) ?? {};
    const tasks = getTaskStore();
    const now = new Date().toISOString();
    // Start from a fully-shaped generated task, then overlay the client's
    // fields so missing optional fields keep valid defaults.
    const newTask: TaskRecord = {
      ...generateTask(),
      ...(body as TaskRecord),
      created_at: now,
      updated_at: now,
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return HttpResponse.json({ success: true, data: newTask, error: null });
  }),

  // PUT /api/tasks/:id/status — kanban column move (layer parity with the
  // RTK interceptor). Must be declared before PUT /api/tasks/:id: MSW
  // matches handlers in array order and `:id` would swallow the /status path.
  http.put('/api/tasks/:id/status', async ({ params, request }) => {
    const body = (await getRequestBody(request)) ?? {};
    const tasks = getTaskStore();
    const index = tasks.findIndex((t) => t['id'] === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { success: false, data: null, error: `Task ${params.id} not found` },
        { status: 404 },
      );
    }
    const updated: TaskRecord = {
      ...tasks[index],
      ...(body as TaskRecord),
      id: params.id,
      updated_at: new Date().toISOString(),
    };
    tasks[index] = updated;
    saveTasks(tasks);
    return HttpResponse.json({ success: true, data: updated, error: null });
  }),

  // PUT /api/tasks/:id
  http.put('/api/tasks/:id', async ({ params, request }) => {
    const body = (await getRequestBody(request)) ?? {};
    const tasks = getTaskStore();
    const index = tasks.findIndex((t) => t['id'] === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { success: false, data: null, error: `Task ${params.id} not found` },
        { status: 404 },
      );
    }
    // Explicit position update (kanban): a present `position` must validate,
    // otherwise the store would be corrupted with an unorderable card.
    if ('position' in body && !isValidPosition(body['position'])) {
      return HttpResponse.json(
        { success: false, data: null, error: 'position must be a non-negative integer' },
        { status: 400 },
      );
    }
    const updated: TaskRecord = {
      ...tasks[index],
      ...(body as TaskRecord),
      id: params.id,
      updated_at: new Date().toISOString(),
    };
    // The validated position from the body wins (kanban reorder contract).
    if ('position' in body) {
      updated['position'] = body['position'];
    }
    tasks[index] = updated;
    saveTasks(tasks);
    return HttpResponse.json({ success: true, data: updated, error: null });
  }),

  // DELETE /api/tasks/:id
  http.delete('/api/tasks/:id', ({ params }) => {
    const tasks = getTaskStore();
    const remaining = tasks.filter((t) => t['id'] !== params.id);
    if (remaining.length === tasks.length) {
      return HttpResponse.json(
        { success: false, data: null, error: `Task ${params.id} not found` },
        { status: 404 },
      );
    }
    saveTasks(remaining);
    return HttpResponse.json({ success: true, data: true, error: null });
  }),

  // ===================== ACTIVITIES =====================
  // GET /api/activities
  http.get('/api/activities', ({ request }) => {
    let url: URL;
    try {
      url = new URL(request.url);
    } catch {
      return new HttpResponse(null, { status: 400 });
    }
    const search = url.searchParams.get('search');

    const activities = generateActivities(10);

    if (search) {
      // SAFETY: mock data is an array of objects
      const filtered = (activities as unknown as Record<string, unknown>[]).filter(
      (activity) =>
        (activity as Record<string, string>)['title']?.toLowerCase().includes(search) ||
        ((activity as Record<string, string>)['description'] || '').toLowerCase().includes(search)
    );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }

    return HttpResponse.json({ success: true, data: activities, error: null });
  }),

  // GET /api/activities/:id
  http.get('/api/activities/:id', () => {
    const activity = generateActivity();
    return HttpResponse.json({ success: true, data: activity, error: null });
  }),

  // POST /api/activities
  http.post('/api/activities', () => {
    const newActivity = generateActivity();
    return HttpResponse.json({ success: true, data: newActivity, error: null });
  }),

  // PUT /api/activities/:id
  http.put('/api/activities/:id', () => {
    const updatedActivity = generateActivity();
    return HttpResponse.json({ success: true, data: updatedActivity, error: null });
  }),

  // DELETE /api/activities/:id
  http.delete('/api/activities/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),

  // ===================== AUTH =====================
  // POST /api/auth/login
  http.post('/api/auth/login', async ({ request }) => {
    const body = await getRequestBody(request);
    return HttpResponse.json({
      success: true,
      data: {
        token: 'mock-jwt-token',
        user: { id: 'mock-user-id', email: (body as Record<string, unknown>)?.email as string, role: 'admin' },
      },
      error: null,
    });
  }),

  // POST /api/auth/register
  http.post('/api/auth/register', async ({ request }) => {
    const body = await getRequestBody(request);
    return HttpResponse.json({
      success: true,
      data: {
        token: 'mock-jwt-token',
        user: { id: 'mock-user-id', email: (body as Record<string, unknown>)?.email as string, role: 'user' },
      },
      error: null,
    });
  }),

  // POST /api/auth/password-reset
  http.post('/api/auth/password-reset', async () => {
    return HttpResponse.json({
      success: true,
      data: { message: 'Reset email sent' },
      error: null,
    });
  }),
];
