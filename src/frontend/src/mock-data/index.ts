// =====================================================
// Mock Data Index
// =====================================================
// Central entry point for all mock data generation.
// Provides factory functions for generating realistic mock data.
// =====================================================

export {
  generateContact,
  generateContacts,
  generateCompany,
  generateCompanies,
  generateTask,
  generateTasks,
  generateActivity,
  generateActivities,
  generateUser,
} from './generators';
export { type ContactSchema, type CompanySchema, type TaskSchema, type ActivitySchema, type UserSchema } from './schemas';
export { getMockContacts, getMockCompanies, getMockTasks, getMockActivities } from './interceptors';
