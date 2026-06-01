// =====================================================
// Dashboard View
// =====================================================
// Main dashboard page displaying metrics, charts, and activity summaries.
// =====================================================

import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { generateDashboardMetrics } from '@/mock-data/dashboard';

export function DashboardView() {
  const metrics = generateDashboardMetrics();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your CRM activity and performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Total Contacts"
          value={metrics.contact_stats.total}
          trend={metrics.contact_stats.trend}
        />
        <SummaryCard
          title="Open Tasks"
          value={metrics.task_stats.by_status.open || 0}
          trend={metrics.task_stats.trend}
        />
        <SummaryCard
          title="Activities This Week"
          value={metrics.activity_summary.total}
        />
        <SummaryCard
          title="Active Deals"
          value={metrics.company_stats.active_deals}
          trend={metrics.company_stats.trend}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Task Status Breakdown */}
        <BarChart
          data={metrics.task_stats.by_status}
          title="Task Status Breakdown"
          color="bg-blue-500"
        />

        {/* Activity Type Breakdown */}
        <BarChart
          data={metrics.activity_summary.by_type}
          title="Activity Type Breakdown"
          color="bg-green-500"
        />
      </div>

      {/* Pipeline and Contact Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Contact Statistics */}
        <PieChart
          data={metrics.task_stats.by_priority}
          title="Task Priority Distribution"
        />

        {/* Pipeline Stage Distribution */}
        <PieChart
          data={metrics.pipeline_value.by_stage}
          title="Pipeline Stages"
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {metrics.recent_activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
                <span className="text-sm text-foreground">
                  {activity.title}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({ title, value, trend }: { title: string; value: number; trend?: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        {trend !== undefined && (
          <p className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '↑' : '↓'} {trend} vs last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
