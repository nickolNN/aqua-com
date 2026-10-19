import { useState } from 'react';
import { generateTaskStats, generateActivityBreakdown, generateContactStats, generatePipelineValue } from '@/mock-data/dashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/Select';

export function ReportsView() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'contacts' | 'activities' | 'pipeline'>('tasks');
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsExporting(false);

    if (exportFormat === 'csv') {
      exportCSV();
    } else {
      alert('PDF export would be generated here');
    }
  };

  const exportCSV = () => {
    const data = getReportData();
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map((row) => Object.values(row).map(String).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getReportData = () => {
    switch (activeTab) {
      case 'tasks':
      case 'contacts':
      case 'activities':
      case 'pipeline':
        return [];
      default:
        return [];
    }
  };

  const reportConfig: Record<string, { label: string; format: string }> = {
    tasks: { label: 'Task Report', format: 'csv' },
    contacts: { label: 'Contact Report', format: 'csv' },
    activities: { label: 'Activity Report', format: 'csv' },
    pipeline: { label: 'Pipeline Report', format: 'csv' },
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Generate and export reports for analysis</p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-border">
        {Object.entries(reportConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === key ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {config.label}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{reportConfig[activeTab].label}</CardTitle>
          <CardDescription>Summary statistics and export options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded">
              <h3 className="text-sm font-medium text-foreground">Overview</h3>
              <p className="text-sm text-muted-foreground">
                {reportConfig[activeTab].label} contains summary statistics and detailed breakdowns.
              </p>
            </div>
            <div className="p-3 bg-muted rounded">
              <h3 className="text-sm font-medium text-foreground">Export Options</h3>
              <div className="flex gap-2 mt-2">
       <Select value={exportFormat} onValueChange={(val) => setExportFormat(val as 'csv' | 'pdf')}>
          <SelectTrigger>{exportFormat}</SelectTrigger>
          <SelectContent>
            <SelectItem value="csv">CSV</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
                <Button size="sm" variant="default" onClick={handleExport} disabled={isExporting}>
                  {isExporting ? 'Exporting...' : 'Export Report'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report Data</CardTitle>
          <CardDescription>Detailed report content</CardDescription>
        </CardHeader>
        <CardContent>
          {activeTab === 'tasks' && <TaskReportSection />}
          {activeTab === 'contacts' && <ContactReportSection />}
          {activeTab === 'activities' && <ActivityReportSection />}
          {activeTab === 'pipeline' && <PipelineReportSection />}
        </CardContent>
      </Card>
    </div>
  );
}

function TaskReportSection() {
  const stats = generateTaskStats();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(stats.by_status).map(([status, count]) => (
          <div key={status} className="p-3 bg-muted rounded">
            <p className="text-sm text-muted-foreground capitalize">{status}</p>
            <p className="text-lg font-semibold">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactReportSection() {
  const stats = generateContactStats();
  return (
    <div className="p-4">
      <p className="text-sm text-muted-foreground">Total contacts: {stats.total}</p>
      <p className="text-sm text-muted-foreground">New this month: {stats.new_this_month}</p>
    </div>
  );
}

function ActivityReportSection() {
  const stats = generateActivityBreakdown();
  return (
    <div className="space-y-2">
      {Object.entries(stats.by_type).map(([type, count]) => (
        <div key={type} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
          <span className="text-muted-foreground capitalize">{type}</span>
          <span className="text-foreground font-medium">{count}</span>
        </div>
      ))}
    </div>
  );
}

function PipelineReportSection() {
  const stats = generatePipelineValue();
  return (
    <div className="space-y-2">
      {Object.entries(stats.by_stage).map(([stage, count]) => (
        <div key={stage} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
          <span className="text-muted-foreground">{stage}</span>
          <span className="text-foreground font-medium">{count}</span>
        </div>
      ))}
    </div>
  );
}
