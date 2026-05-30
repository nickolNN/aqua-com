// Export the main API
export { api } from './api';

// Export individual API slices
export { contactsApi } from './contactsApi';
export { companiesApi } from './companiesApi';
export { tasksApi } from './tasksApi';
export { activitiesApi } from './activitiesApi';
export { authApi } from './authApi';

// Setup interceptors
export function setupInterceptors() {
  // Configure RTK Query interceptors
  return {};
}
