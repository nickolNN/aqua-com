const STORAGE_KEYS = {
  CONTACTS: 'mock_data_contacts',
  COMPANIES: 'mock_data_companies',
  TASKS: 'mock_data_tasks',
  ACTIVITIES: 'mock_data_activities',
} as const;

export function getStoredContacts(): unknown[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.warn('[MockData] Failed to get stored contacts:', error);
    return [];
  }
}

export function saveContacts(contacts: unknown[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
  } catch (error) {
    console.warn('[MockData] Failed to save contacts:', error);
  }
}

export function getStoredCompanies(): unknown[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMPANIES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.warn('[MockData] Failed to get stored companies:', error);
    return [];
  }
}

export function saveCompanies(companies: unknown[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
  } catch (error) {
    console.warn('[MockData] Failed to save companies:', error);
  }
}

export function getStoredTasks(): unknown[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.warn('[MockData] Failed to get stored tasks:', error);
    return [];
  }
}

export function saveTasks(tasks: unknown[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.warn('[MockData] Failed to save tasks:', error);
  }
}

export function getStoredActivities(): unknown[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.warn('[MockData] Failed to get stored activities:', error);
    return [];
  }
}

export function saveActivities(activities: unknown[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  } catch (error) {
    console.warn('[MockData] Failed to save activities:', error);
  }
}
