// Contact entity type
export interface Contact {
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

// Company entity type
export interface Company {
  id: string;
  name: string;
  website?: string;
  industry?: string;
  address?: string;
  custom_fields?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// Task subtask type
export interface TaskSubtask {
  id: string;
  title: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

// Task dependency type
export interface TaskDependency {
  predecessor_task_id: string;
  successor_task_id: string;
  dependency_type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
}

// Task entity type
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string;
  assigned_to?: string;
  created_by: string;
  parent_task_id?: string;
  position: number;
  subtask_count: number;
  subtasks?: TaskSubtask[];
  dependencies: TaskDependency[];
  created_at: string;
  updated_at: string;
}

// Task dependency input type
export interface TaskDependencyInput {
  predecessor_task_id: string;
  dependency_type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
}

// Task creation input type
export interface TaskCreateInput {
  title: string;
  description?: string;
  status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string;
  assigned_to?: string;
  parent_task_id?: string;
  position?: number;
  subtasks?: TaskDependencyInput[];
  dependencies?: TaskDependencyInput[];
}

// Task update input type
export interface TaskUpdateInput {
  title?: string;
  description?: string;
  status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string;
  assigned_to?: string;
  parent_task_id?: string;
  position?: number;
  subtasks?: TaskDependencyInput[];
  dependencies?: TaskDependencyInput[];
}

// Activity entity type
export interface Activity {
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

// User entity type
export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

// Auth user type (for logged in user)
export interface AuthUser {
  id: string;
  email: string;
  role: string;
  token?: string;
}
