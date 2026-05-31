// =====================================================
// Dashboard Mock Data Generator
// =====================================================
// Generates realistic dashboard metrics for the dashboard page.
// Includes task statistics, activity summaries, contact stats, and more.
// =====================================================

import { generateTask, generateActivity, generateContact } from './generators';
import type { ActivitySchema, ContactSchema } from './schemas';

/**
 * Dashboard metric data structure for task breakdown by status
 */
export interface TaskStatsBreakdown {
  total: number;
  by_status: Record<string, number>;
  by_priority: Record<string, number>;
  trend: number;
}

/**
 * Dashboard metric data structure for activity breakdown by type
 */
export interface ActivityBreakdown {
  total: number;
  by_type: Record<string, number>;
  trend: number;
}

/**
 * Dashboard metric data structure for contact statistics
 */
export interface ContactStats {
  total: number;
  new_this_month: number;
  trend: number;
}

/**
 * Dashboard metric data structure for company statistics
 */
export interface CompanyStats {
  total: number;
  active_deals: number;
  trend: number;
}

/**
 * Dashboard metric data structure for pipeline value
 */
export interface PipelineValue {
  total: number;
  by_stage: Record<string, number>;
  trend: number;
}

/**
 * Dashboard overview data structure
 */
export interface DashboardMetrics {
  task_stats: TaskStatsBreakdown;
  activity_summary: ActivityBreakdown;
  contact_stats: ContactStats;
  company_stats: CompanyStats;
  pipeline_value: PipelineValue;
  recent_activities: ActivitySchema[];
  recent_contacts: ContactSchema[];
}

// =====================================================
// Dashboard Metrics Generator
// =====================================================

/**
 * Generate realistic task statistics for dashboard
 */
export function generateTaskStats(count: number = 50): TaskStatsBreakdown {
  const statuses: Array<'open' | 'in_progress' | 'completed' | 'cancelled'> = ['open', 'in_progress', 'completed', 'cancelled'];
  const priorities: Array<'low' | 'medium' | 'high' | 'urgent'> = ['low', 'medium', 'high', 'urgent'];

  const tasks = Array.from({ length: count }, () => {
    const task = generateTask();
    // Ensure consistent status/priority distribution
    return { status: task.status, priority: task.priority };
  });

  const by_status: Record<string, number> = {};
  const by_priority: Record<string, number> = {};

  tasks.forEach((t) => {
    by_status[t.status] = (by_status[t.status] || 0) + 1;
    by_priority[t.priority] = (by_priority[t.priority] || 0) + 1;
  });

  // Ensure all categories exist with minimum values
  for (const status of statuses) {
    if (!by_status[status]) by_status[status] = 0;
  }
  for (const priority of priorities) {
    if (!by_priority[priority]) by_priority[priority] = 0;
  }

  return {
    total: count,
    by_status,
    by_priority,
    trend: count > 50 ? count - 50 : 0,
  };
}

/**
 * Generate realistic activity breakdown for dashboard
 */
export function generateActivityBreakdown(count: number = 40): ActivityBreakdown {
  const activities = Array.from({ length: count }, () => generateActivity());

  const by_type: Record<string, number> = {};
  activities.forEach((a) => {
    by_type[a.type] = (by_type[a.type] || 0) + 1;
  });

  // Ensure all type categories exist
  const allTypes = ['call', 'meeting', 'email', 'note', 'task', 'deal', 'other'];
  for (const type of allTypes) {
    if (!by_type[type]) by_type[type] = 0;
  }

  return {
    total: count,
    by_type,
    trend: count > 30 ? count - 30 : 0,
  };
}

/**
 * Generate realistic contact statistics
 */
export function generateContactStats(count: number = 120): ContactStats {
  const newCount = Math.floor(count * 0.15);

  return {
    total: count,
    new_this_month: newCount,
    trend: count - 100,
  };
}

/**
 * Generate realistic company statistics
 */
export function generateCompanyStats(count: number = 30): CompanyStats {
  const activeDeals = Math.floor(count * 0.4);

  return {
    total: count,
    active_deals: activeDeals,
    trend: count - 25,
  };
}

/**
 * Generate realistic pipeline value data
 */
export function generatePipelineValue(count: number = 15): PipelineValue {
  const by_stage = {
    prospect: Math.floor(count * 0.25),
    qualified: Math.floor(count * 0.2),
    proposal: Math.floor(count * 0.15),
    negotiation: Math.floor(count * 0.1),
    closed: count - Math.floor(count * 0.25) - Math.floor(count * 0.2) - Math.floor(count * 0.15) - Math.floor(count * 0.1),
  };

  return {
    total: count,
    by_stage: by_stage,
    trend: count - 12,
  };
}

/**
 * Generate complete dashboard metrics with mock data
 */
export function generateDashboardMetrics(): DashboardMetrics {
  const taskStats = generateTaskStats(45);
  const activityBreakdown = generateActivityBreakdown(35);
  const contactStats = generateContactStats(120);
  const companyStats = generateCompanyStats(30);
  const pipelineValue = generatePipelineValue(15);

  // Generate recent activities and contacts
  const recentActivities = Array.from({ length: 5 }, () => generateActivity());
  const recentContacts = Array.from({ length: 5 }, () => generateContact());

  return {
    task_stats: taskStats,
    activity_summary: activityBreakdown,
    contact_stats: contactStats,
    company_stats: companyStats,
    pipeline_value: pipelineValue,
    recent_activities: recentActivities,
    recent_contacts: recentContacts,
  };
}
