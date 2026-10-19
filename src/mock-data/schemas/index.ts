import type { Contact, Company, Task, Activity } from '@/types/entities';

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

export interface TaskSchema {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string;
  assigned_to?: string;
  parent_task_id?: string;
  position: number;
  subtask_count: number;
  dependencies: Array<{
    predecessor_task_id: string;
    successor_task_id: string;
    dependency_type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
  }>;
  created_by: string;
  created_at: string;
  updated_at: string;
}

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

export interface UserSchema {
  id: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

export type SchemaToEntity<T> = T extends ContactSchema ? Contact :
  T extends CompanySchema ? Company :
  T extends TaskSchema ? Task :
  T extends ActivitySchema ? Activity :
  never;

export interface SchemaMap {
  contacts: ContactSchema[];
  companies: CompanySchema[];
  tasks: TaskSchema[];
  activities: ActivitySchema[];
  users: UserSchema[];
}
