// =====================================================
// Mock Data Schemas
// =====================================================
// TypeScript interfaces defining the shape of mock data entities.
// These schemas ensure type safety across the mock data layer.
// =====================================================

import type { Contact, Company, Task, Activity } from '@/types/entities';

// =====================================================
// Contact Schema
// =====================================================
export interface ContactSchema {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company_id?: string;
  custom_fields?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// =====================================================
// Company Schema
// =====================================================
export interface CompanySchema {
  id: string;
  name: string;
  website?: string;
  industry?: string;
  address?: string;
  custom_fields?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// =====================================================
// Task Schema
// =====================================================
export interface TaskSchema {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string;
  assigned_to?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// =====================================================
// Activity Schema
// =====================================================
export interface ActivitySchema {
  id: string;
  type: 'call' | 'meeting' | 'email' | 'note' | 'task' | 'deal' | 'other';
  title: string;
  description?: string;
  contact_id?: string;
  company_id?: string;
  date: string;
  duration?: number;
  created_by: string;
  created_at: string;
}

// =====================================================
// User Schema
// =====================================================
export interface UserSchema {
  id: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

// =====================================================
// Type Mappings
// =====================================================
// Allow mapping between schema types and entity types for type-safe usage
export type SchemaToEntity<T> = T extends ContactSchema ? Contact :
  T extends CompanySchema ? Company :
  T extends TaskSchema ? Task :
  T extends ActivitySchema ? Activity :
  never;

// =====================================================
// SchemaMap for persistence
// =====================================================
export interface SchemaMap {
  contacts: ContactSchema[];
  companies: CompanySchema[];
  tasks: TaskSchema[];
  activities: ActivitySchema[];
  users: UserSchema[];
}
