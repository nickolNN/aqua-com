// =====================================================
// Reports View
// =====================================================
// Reports page with export options (CSV/PDF) for various data.
// =====================================================

import { useState } from 'react';
import { generateTaskStats, generateActivityBreakdown, generateContactStats, generatePipelineValue } from '@/mock-data/dashboard';

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
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate and export reports for analysis</p>
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {Object.entries(reportConfig).map(([key, config]) => (
          <button
          key={key}
          onClick={() => setActiveTab(key as typeof activeTab)}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === key ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
          >
          {config.label}
          </button>
        ))}
      </div>

      {/* Report Summary */}
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {reportConfig[activeTab].label}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded">
            <h3 className="text-sm font-medium text-gray-700">Overview</h3>
            <p className="text-sm text-gray-600">
              {reportConfig[activeTab].label} contains summary statistics and detailed breakdowns.
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <h3 className="text-sm font-medium text-gray-700">Export Options</h3>
            <div className="flex gap-2 mt-2">
            <select
              className="text-sm border rounded px-2 py-1"
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as 'csv' | 'pdf')}
            >
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
            </select>
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : 'Export Report'}
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Data</h2>
        {activeTab === 'tasks' && <TaskReportSection />}
        {activeTab === 'contacts' && <ContactReportSection />}
        {activeTab === 'activities' && <ActivityReportSection />}
        {activeTab === 'pipeline' && <PipelineReportSection />}
      </div>
    </div>
  );
}

function TaskReportSection() {
  const stats = generateTaskStats();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(stats.by_status).map(([status, count]) => (
          <div key={status} className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600 capitalize">{status}</p>
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
      <p className="text-sm text-gray-700">Total contacts: {stats.total}</p>
      <p className="text-sm text-gray-700">New this month: {stats.new_this_month}</p>
    </div>
  );
}

function ActivityReportSection() {
  const stats = generateActivityBreakdown();
  return (
    <div className="space-y-2">
      {Object.entries(stats.by_type).map(([type, count]) => (
        <div key={type} className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-0">
          <span className="text-gray-700 capitalize">{type}</span>
          <span className="text-gray-900">{count}</span>
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
        <div key={stage} className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-0">
          <span className="text-gray-700 capitalize">{stage}</span>
          <span className="text-gray-900">{count}</span>
        </div>
      ))}
    </div>
  );
}
