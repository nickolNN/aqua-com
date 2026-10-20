const STORAGE_KEYS = {
  TASKS: 'mock_data_tasks',
} as const;

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
