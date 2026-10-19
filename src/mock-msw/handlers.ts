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

// Tasks live in localStorage (mock_data_tasks): seeded once by generation,
// every read/write afterwards goes through getStoredTasks/saveTasks → survives reload.
type TaskRecord = Record<string, unknown>;

function getTaskStore(): TaskRecord[] {
  const stored = getStoredTasks() as TaskRecord[];
  if (stored.length > 0) {
    return stored;
  }
  // SAFETY: generated tasks are full Task objects (position included); the cast keeps the store shape valid.
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

export const handlers = [
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

  http.get('/api/contacts/:id', () => {
    const contact = generateContact();
    return HttpResponse.json({ success: true, data: contact, error: null });
  }),

  http.post('/api/contacts', () => {
    const newContact = generateContact();
    return HttpResponse.json({ success: true, data: newContact, error: null });
  }),

  http.put('/api/contacts/:id', () => {
    const updatedContact = generateContact();
    return HttpResponse.json({ success: true, data: updatedContact, error: null });
  }),

  http.delete('/api/contacts/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),

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
      const filtered = (companies as unknown as Record<string, unknown>[]).filter(
      (company) =>
        (company as Record<string, string>)['name']?.toLowerCase().includes(search) ||
        ((company as Record<string, string>)['industry'] || '').toLowerCase().includes(search)
    );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }

    return HttpResponse.json({ success: true, data: companies, error: null });
  }),

  http.get('/api/companies/:id', () => {
    const company = generateCompany();
    return HttpResponse.json({ success: true, data: company, error: null });
  }),

  http.post('/api/companies', () => {
    const newCompany = generateCompany();
    return HttpResponse.json({ success: true, data: newCompany, error: null });
  }),

  http.put('/api/companies/:id', () => {
    const updatedCompany = generateCompany();
    return HttpResponse.json({ success: true, data: updatedCompany, error: null });
  }),

  http.delete('/api/companies/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),

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

  http.post('/api/tasks', async ({ request }) => {
    const body = (await getRequestBody(request)) ?? {};
    const tasks = getTaskStore();
    const now = new Date().toISOString();
    // Overlay the client's fields on a generated task so missing optional fields keep valid defaults.
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

  // Must be declared before PUT /api/tasks/:id: MSW matches handlers in array
  // order and `:id` would swallow the /status path.
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
    // A present `position` must validate, otherwise the store gets an unorderable card.
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
    tasks[index] = updated;
    saveTasks(tasks);
    return HttpResponse.json({ success: true, data: updated, error: null });
  }),

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
    // A present `position` must validate, otherwise the store gets an unorderable card.
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
    // A present `position` must validate, otherwise the store gets an unorderable card.
    if ('position' in body) {
      updated['position'] = body['position'];
    }
    tasks[index] = updated;
    saveTasks(tasks);
    return HttpResponse.json({ success: true, data: updated, error: null });
  }),

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
      const filtered = (activities as unknown as Record<string, unknown>[]).filter(
      (activity) =>
        (activity as Record<string, string>)['title']?.toLowerCase().includes(search) ||
        ((activity as Record<string, string>)['description'] || '').toLowerCase().includes(search)
    );
      return HttpResponse.json({ success: true, data: filtered, error: null });
    }

    return HttpResponse.json({ success: true, data: activities, error: null });
  }),

  http.get('/api/activities/:id', () => {
    const activity = generateActivity();
    return HttpResponse.json({ success: true, data: activity, error: null });
  }),

  http.post('/api/activities', () => {
    const newActivity = generateActivity();
    return HttpResponse.json({ success: true, data: newActivity, error: null });
  }),

  http.put('/api/activities/:id', () => {
    const updatedActivity = generateActivity();
    return HttpResponse.json({ success: true, data: updatedActivity, error: null });
  }),

  http.delete('/api/activities/:id', () => {
    return HttpResponse.json({ success: true, data: true, error: null });
  }),

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

  http.post('/api/auth/password-reset', async () => {
    return HttpResponse.json({
      success: true,
      data: { message: 'Reset email sent' },
      error: null,
    });
  }),
];
