// =====================================================
// Mock Data Generators
// =====================================================
// Realistic mock data generators for each entity type.
// Each generator creates sample data with realistic names, emails, etc.
// =====================================================

import type {
  ContactSchema,
  CompanySchema,
  TaskSchema,
  ActivitySchema,
  UserSchema,
} from '../schemas';

// =====================================================
// Utility Functions
// =====================================================

/**
 * Generate a UUID v4
 */
function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }
  );
}

/**
 * Generate a date string in ISO format
 */
function generateDate(daysAgo: number, rangeDays: number = 30): string {
  const now = new Date();
  const baseDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  const randomOffset = Math.floor(Math.random() * rangeDays * 24 * 60 * 60 * 1000);
  const date = new Date(baseDate.getTime() + randomOffset);
  return date.toISOString();
}

/**
 * Get a random element from an array
 */
function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate a random integer between min and max
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

// =====================================================
// Person Data
// =====================================================

const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Margaret',
  'Matthew', 'Lisa', 'Paul', 'Betty', 'Mark', 'Margaret', 'Donald', 'Samantha',
  'Steven', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Melissa', 'Kevin', 'Deborah',
  'Brian', 'George', 'George', 'Emily', 'Ronald', 'Maria', 'Timothy', 'Laura',
  'Martin', 'Rachel', 'Christopher', 'Laura', 'Jason', 'Amy', 'Jeffrey', 'Angela',
  'Ryan', 'Sharon', 'Jonathan', 'Michelle', 'Larry', 'Cynthia', 'Kyle', 'Kathleen',
  'Jerry', 'Eleanor', 'Dennis', 'Amber', 'Peter', 'Stephanie', 'Henry', 'Rebecca',
  'Nathan', 'Lauren', 'Douglas', 'Megan', 'Harold', 'Tammy', 'Carl', 'Diane',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Harvey', 'Lewis', 'Walker',
  'Henderson', 'Young', 'Hernandez', 'King', 'Wagner', 'Villa', 'Wells', 'Davidson',
  'Scott', 'Burke', 'Hayes', 'Bradley', 'Ortiz', 'Morgan', 'Perez', 'Murphy',
  'Jackson', 'Perez', 'Fisher', 'Hughes', 'Cox', 'Rivera', 'Foster', 'Perez',
  'Cole', 'Torres', 'Patterson', 'Hughes', 'Ward', 'Richardson', 'Hugh', 'Cole',
  'Cox', 'Hayes', 'Kelly', 'Harrison', 'Baker', 'Gibson', 'Thompson', 'Wilson',
  'Fox', 'Morris', 'Nguyen', 'Morgan', 'Cooper', 'Peterson', 'Bailey', 'Reed',
  'Kelly', 'Howard', 'Brooks', 'Sullivan', 'Wells', 'Perez', 'Webb', 'Owens',
  'Thomas', 'Mendoza', 'Diaz', 'Hunter', 'Perez', 'Hayes', 'Fleming', 'Bowman',
  'Ellis', 'Hart', 'Curtis', 'Richardson', 'Hunter', 'Burke', 'Myers', 'Bennett',
  'Wood', 'Glass', 'Harrison', 'Jordan', 'Reyes', 'Lawson', 'Graham', 'Sullivan',
];

const companyPrefixes = ['Tech', 'Global', 'Prime', 'Alpha', 'Digital', 'Smart', 'Next', 'Rapid'];
const companySuffixes = ['Solutions', 'Systems', 'Labs', 'Enterprises', 'Holdings', 'Group', 'Partners', 'Ventures'];
const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Consulting', 'Real Estate', 'Media', 'Telecommunications'];

// =====================================================
// Contact Generator
// =====================================================

/**
 * Generate a realistic contact object
 */
export function generateContact(id?: string, dateOffset: number = 0): ContactSchema {
  const firstName = randomChoice(firstNames);
  const lastName = randomChoice(lastNames);

  return {
    id: id ?? generateUuid(),
    first_name: firstName,
    last_name: lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    phone: `+1-${randomInt(200, 999)}-${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
    company_id: Math.random() > 0.5 ? generateUuid() : undefined,
    custom_fields: Math.random() > 0.7 ? { notes: `Note about ${firstName}` } : undefined,
    created_at: generateDate(180, 180),
    updated_at: generateDate(dateOffset),
  };
}

/**
 * Generate multiple contacts
 */
export function generateContacts(count: number = 10): ContactSchema[] {
  return Array.from({ length: count }, () => generateContact(undefined, Math.floor(Math.random() * 30)));
}

// =====================================================
// Company Generator
// =====================================================

/**
 * Generate a realistic company object
 */
export function generateCompany(): CompanySchema {
  const name = `${randomChoice(companyPrefixes)} ${randomChoice(companySuffixes)}`;

  return {
    id: generateUuid(),
    name,
    website: `www.${name.toLowerCase().replace(/\s+/g, '')}.com`,
    industry: randomChoice(industries),
    address: `${randomInt(1, 999)} ${randomChoice(['Main', 'Oak', 'Pine', 'Elm', 'Market', 'First', 'Broadway'])} ${randomInt(1, 999)}, ${randomChoice(['Springfield', 'Portland', 'Madison', 'Salem', 'Arlington'])} ${randomInt(1000, 9999)}`,
    custom_fields: Math.random() > 0.5 ? { industry_notes: 'High value prospect' } : undefined,
    created_at: generateDate(365, 365),
    updated_at: generateDate(Math.floor(Math.random() * 30)),
  };
}

/**
 * Generate multiple companies
 */
export function generateCompanies(count: number = 10): CompanySchema[] {
  return Array.from({ length: count }, () => generateCompany());
}

// =====================================================
// Task Generator
// =====================================================

const taskTitles = [
  'Review project proposal',
  'Prepare presentation',
  'Update documentation',
  'Schedule meeting',
  'Fix critical bug',
  'Deploy to production',
  'Write unit tests',
  'Code review',
  'Design review',
  'Analyze requirements',
  'Create wireframes',
  'Run performance tests',
  'Optimize database queries',
  'Refactor API endpoints',
  'Update dependencies',
  'Setup CI/CD pipeline',
  'Implement user auth',
  'Build dashboard',
  'Write integration tests',
  'Configure monitoring',
  'Prepare release notes',
  'Create migration script',
  'Optimize frontend build',
  'Set up staging environment',
  'Review security logs',
];

/**
 * Generate a realistic task object
 */
export function generateTask(): TaskSchema {
  const title = randomChoice(taskTitles);

  const statuses: Array<'open' | 'in_progress' | 'completed' | 'cancelled'> = ['open', 'in_progress', 'completed', 'cancelled'];
  const priorities: Array<'low' | 'medium' | 'high' | 'urgent'> = ['low', 'medium', 'high', 'urgent'];

  const status = randomChoice(statuses);
  const priority = randomChoice(priorities);

  return {
    id: generateUuid(),
    title,
    description: `Description for task: ${title}`,
    status,
    priority,
    due_date: status !== 'completed' ? generateDate(1, 30) : undefined,
    assigned_to: Math.random() > 0.3 ? generateUuid() : undefined,
    parent_task_id: Math.random() > 0.7 ? generateUuid() : undefined,
    subtask_count: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0,
    dependencies: Math.random() > 0.6 ? [{
      predecessor_task_id: generateUuid(),
      successor_task_id: generateUuid(),
      dependency_type: randomChoice(['finish_to_start', 'start_to_start', 'finish_to_finish', 'start_to_finish']),
    }] : [],
    created_by: generateUuid(),
    created_at: generateDate(Math.floor(Math.random() * 90)),
    updated_at: generateDate(Math.floor(Math.random() * 30)),
  };
}

/**
 * Generate multiple tasks
 */
export function generateTasks(count: number = 10): TaskSchema[] {
  return Array.from({ length: count }, () => generateTask());
}

// =====================================================
// Activity Generator
// =====================================================

const activityTypes: Array<'call' | 'meeting' | 'email' | 'note' | 'task' | 'deal' | 'other'> = ['call', 'meeting', 'email', 'note', 'task', 'deal', 'other'];
const activityTitles = [
  'Initial phone call',
  'Client meeting',
  'Email correspondence',
  'Team standup',
  'Product demo',
  'Quarterly review',
  'Contract negotiation',
  'Project kickoff',
  'Follow-up call',
  'Status update',
  'Vendor meeting',
  'Lunch meeting',
  'Strategy session',
  'Sales call',
  'Technical review',
];

/**
 * Generate a realistic activity object
 */
export function generateActivity(): ActivitySchema {
  const type = randomChoice(activityTypes);
  const title = randomChoice(activityTitles);

  return {
    id: generateUuid(),
    type,
    title,
    description: `Activity details for: ${title}`,
    contact_id: Math.random() > 0.5 ? generateUuid() : undefined,
    company_id: Math.random() > 0.5 ? generateUuid() : undefined,
    date: generateDate(Math.floor(Math.random() * 90)),
    duration: randomInt(15, 120),
    created_by: generateUuid(),
    created_at: generateDate(Math.floor(Math.random() * 90)),
  };
}

/**
 * Generate multiple activities
 */
export function generateActivities(count: number = 10): ActivitySchema[] {
  return Array.from({ length: count }, () => generateActivity());
}

// =====================================================
// User Generator
// =====================================================

/**
 * Generate a realistic user object
 */
export function generateUser(): UserSchema {
  const role = randomChoice(['admin', 'user', 'manager']);
  return {
    id: generateUuid(),
    email: `${randomChoice(firstNames).toLowerCase()}@example.com`,
    password: `SecureP@ss${randomInt(1000, 9999)}`,
    role,
    created_at: generateDate(365),
  };
}
