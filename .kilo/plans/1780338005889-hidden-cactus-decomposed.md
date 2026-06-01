---
description: Remaining design recommendations implementation - dark mode toggle fix, remaining hardcoded styles, and activity form polish
plan: true
---

# Aqua CRM - Remaining Design Recommendations Plan (Decomposed)

## Overview

This plan addresses remaining design recommendations from the original design review plan. Based on codebase inspection, most UI components (Card, Button, Input, Textarea, Select, Skeleton) are already implemented and used across views. Remaining work focuses on:

1. **Dark mode toggle** - settingsSlice doesn't apply theme to document
2. **ActivityForm hardcoded styles** - uses raw button elements with hardcoded styles
3. **ReportsView hardcoded select** - uses native select instead of Select component
4. **ReportsView hardcoded styles** - hardcoded border/background classes in report sections
5. **Various hardcoded styles** in views using `border-blue-500`, `bg-blue-600`, etc.

Each task below includes all necessary context (component details, file contents, styles) so the implementing agent doesn't need to load extra files.

---

## Phase 1: Dark Mode Toggle

### Task 1.1: settingsSlice - apply theme to document

**File:** `src/stores/settingsSlice.ts`

**Current file contents:**
```ts
import { createSlice } from '@reduxjs/toolkit';

export interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  preferences: Record<string, unknown>;
  isLoading: boolean;
}

const initialState: SettingsState = {
  theme: (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light',
  language: 'en',
  preferences: {},
  isLoading: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    setLanguage: (state, action) => { state.language = action.payload; },
    setPreferences: (state, action) => { state.preferences = action.payload; },
    setSettingsLoading: (state, action) => { state.isLoading = action.payload; },
  },
});

export const { setTheme, setLanguage, setPreferences, setSettingsLoading } = settingsSlice.actions;

// Selectors
export const selectSettingsTheme = (state: { settings: SettingsState }) => state.settings.theme;

export const settingsReducer = settingsSlice.reducer;
```

**Component details:**
- SettingsState interface: `{ theme: 'light' | 'dark', language: string, preferences: Record<string, unknown>, isLoading: boolean }`
- Initial state reads theme from `localStorage.getItem('theme')`
- Theme is toggled via `setTheme(newTheme)` from MainLayout.tsx

**Changes needed:**
1. Update `setTheme` reducer to also set `document.documentElement.setAttribute('class', theme)` or `document.documentElement.classList.toggle('dark', theme === 'dark')`
2. Add logic to read `prefers-color-scheme` from system preference on initial load:
   ```ts
   const initialTheme = (localStorage.getItem('theme') as 'light' | 'dark') ?? 
     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
   ```
3. On app mount (or via a `initTheme` action), apply theme class to document.documentElement

**Validation:**
- Theme class appears on `<html>` element when theme changes
- Theme persists across page reloads
- Theme respects system preference on first visit

---

### Task 1.2: MainLayout - replace text button with icon toggle

**File:** `src/components/layout/MainLayout.tsx`

**Current file contents:**
```tsx
import { LayoutDashboard, User, Building2, CheckSquare, MessageSquare } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/layout/Sidebar';
import GlobalSearchBar from './GlobalSearchBar';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setTheme } from '@/stores/settingsSlice';
import SidebarNavItem from './SidebarNavItem';

/**
 * MainLayout component provides the main application layout with sidebar, header, and content area.
 * Includes global search bar for searching across all entity types.
 */
export function MainLayout() {
  const theme = useSelector((state: { settings: { theme: string } }) => state.settings.theme);
  const dispatch = useAppDispatch();

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-64 flex flex-col border-r bg-sidebar text-sidebar-foreground">
        <Sidebar>
          <SidebarHeader logo="Aqua CRM" />
          <SidebarContent>
            <nav className="flex flex-col gap-1 p-2">
              <SidebarNavItem to="/" label="Dashboard" icon={<LayoutDashboard size={16} />} />
              <SidebarNavItem to="/contacts" label="Contacts" icon={<User size={16} />} />
              <SidebarNavItem to="/companies" label="Companies" icon={<Building2 size={16} />} />
              <SidebarNavItem to="/tasks" label="Tasks" icon={<CheckSquare size={16} />} />
              <SidebarNavItem to="/activities" label="Activities" icon={<MessageSquare size={16} />} />
            </nav>
          </SidebarContent>
          <SidebarFooter>
            <button
              onClick={handleThemeToggle}
              className="text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
            >
              {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </SidebarFooter>
        </Sidebar>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Global search bar */}
          <div className="sticky top-0 z-50 border-b bg-white px-6 py-4">
            <GlobalSearchBar />
          </div>

          {/* Main content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </aside>
    </div>
  );
}
```

**Changes needed:**
1. Import lucide-react icons: `SunIcon` and `MoonIcon`
2. Replace text button with icon toggle:
   ```tsx
   <button onClick={handleThemeToggle} className="text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors">
     {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
   </button>
   ```
3. The `handleThemeToggle` function already exists and calls `dispatch(setTheme(newTheme))`

**Validation:**
- Sun/moon icon toggle works
- Theme changes correctly when clicking the toggle

---

## Phase 2: ActivityForm Hardcoded Styles

### Task 2.1: ActivityForm - replace hardcoded button styles with Button component

**File:** `src/components/activity/ActivityForm.tsx`

**Current file contents:**
```tsx
// =====================================================
// Activity Form Component
// =====================================================
import { useForm } from 'react-hook-form';
import { useCreateActivityMutation } from '@/api/activitiesApi';
import { ACTIVITY_TYPES, type ActivityType } from '@/api/activitiesApi';

interface ActivityFormData {
  type: ActivityType;
  title: string;
  description?: string;
  contact_id?: string;
  company_id?: string;
  date: string;
  duration?: number;
}

interface ActivityFormProps {
  onClose: () => void;
}

export default function ActivityForm({ onClose }: ActivityFormProps) {
  const { register, handleSubmit, reset } = useForm<ActivityFormData>();
  const [createActivity] = useCreateActivityMutation();

  const onSubmit = async (data: ActivityFormData) => {
    try {
      await createActivity(data).unwrap();
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to create activity:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Create Activity</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <select {...register('type', { required: 'Activity type is required' })}>
              <option value="">Select type</option>
              {ACTIVITY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <input {...register('title', { required: 'Title is required' })} placeholder="Title" />
          <textarea {...register('description')} placeholder="Description" />
          <input {...register('date', { required: 'Date is required' })} type="date" />
          <input {...register('duration')} type="number" placeholder="Duration (minutes)" />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Create
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

**Button component details (from src/components/ui/Button.tsx):**
```tsx
// Button.tsx has variants: default, secondary, outline, ghost, link
// Button.tsx has sizes: default, sm, lg, icon
// Default variant: 'bg-primary text-primary-foreground hover:bg-primary/90'
// Secondary variant: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
// Outline variant: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
// Size default: 'h-10 px-4 py-2'
```

**Changes needed:**
1. Import `{ Button }` from `@/components/ui/Button`
2. Replace submit button:
   ```tsx
   <Button type="submit">Create</Button>
   ```
3. Replace cancel button:
   ```tsx
   <Button variant="outline" onClick={onClose}>Cancel</Button>
   ```

**Validation:**
- Buttons use consistent styling with rest of application
- Button styles match theme-aware color system

---

## Phase 3: ReportsView Hardcoded Styles

### Task 3.1: ReportsView - replace hardcoded select with Select component

**File:** `src/views/ReportsView.tsx`

**Current file contents:**
```tsx
// =====================================================
// Reports View
// =====================================================
import { useState } from 'react';
import { generateTaskStats, generateActivityBreakdown, generateContactStats, generatePipelineValue } from '@/mock-data/dashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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
      <Card>
        <CardHeader>
          <CardTitle>{reportConfig[activeTab].label}</CardTitle>
          <CardDescription>Summary statistics and export options</CardDescription>
        </CardHeader>
        <CardContent>
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
                <Button size="sm" variant="default" onClick={handleExport} disabled={isExporting}>
                  {isExporting ? 'Exporting...' : 'Export Report'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
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
          <span className="text-sm text-gray-700 capitalize">{type}</span>
          <span className="text-sm text-gray-900">{count}</span>
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
          <span className="text-sm text-gray-700 capitalize">{stage}</span>
          <span className="text-sm text-gray-900">{count}</span>
        </div>
      ))}
    </div>
  );
}
```

**Select component details (from src/components/ui/Select.tsx):**
```tsx
// Uses @radix-ui/react-select
// Has Select, SelectTrigger, SelectContent, SelectItem, SelectValue components
// Uses React.forwardRef pattern
// Styling: border border-input, bg-background, px-3 py-2, focus:ring-2 focus:ring-ring
```

**Changes needed:**
1. Import Select components:
   ```tsx
   import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/Select'
   ```
2. Replace native select with Select component:
   ```tsx
   <Select value={exportFormat} onValueChange={(val) => setExportFormat(val as 'csv' | 'pdf')}>
     <SelectTrigger>{exportFormat}</SelectTrigger>
     <SelectContent>
       <SelectItem value="csv">CSV</SelectItem>
       <SelectItem value="pdf">PDF</SelectItem>
     </SelectContent>
   </Select>
   ```

**Validation:**
- Select dropdown opens and closes correctly
- Export format selection works
- Styling consistent with rest of application

---

### Task 3.2: ReportsView - replace hardcoded styles with consistent theming

**File:** `src/views/ReportsView.tsx`

**Current hardcoded styles:**
- Line 76: `border-gray-200` for tab borders
- Line 98,104: `bg-gray-50` for report section backgrounds
- Line 147: `bg-gray-50` for report stat boxes
- Line 82: `border-blue-500` for active tab border
- Line 172,186: `border-gray-100` for report rows

**Changes needed:**
1. Replace hardcoded `border-gray-200` with `border-border` (design token)
2. Replace hardcoded `bg-gray-50` with `bg-muted` (or `bg-card`)
3. Replace hardcoded `text-gray-600`/`text-gray-700` with `text-muted-foreground`
4. Replace hardcoded `text-gray-900` with `text-primary-foreground`
5. Replace hardcoded `text-gray-500` with `text-muted-foreground`
6. Replace hardcoded `border-blue-500` with `border-primary`

**Specific changes:**
```tsx
// Before: border-gray-200 → After: border-border
// Before: bg-gray-50 → After: bg-muted (or bg-card)
// Before: text-gray-600 → After: text-muted-foreground
// Before: text-gray-700 → After: text-foreground
// Before: text-gray-900 → After: text-primary-foreground
// Before: text-gray-500 → After: text-muted-foreground
// Before: border-blue-500 → After: border-primary
```

**Validation:**
- Report sections use design tokens for consistent theming
- Dark mode works correctly on report views (background and text contrast)

---

## Phase 4: Remaining Views Hardcoded Styles

### Task 4.1: Detail views - replace hardcoded styles with design tokens

**File:** `src/views/TaskDetailView.tsx`

**Current file contents:**
```tsx
import { useParams, Link } from 'react-router-dom';
import { useGetTaskQueryTyped } from '@/api/tasksApi';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import type { TaskDependency } from '@/types/entities';

export function TaskDetailView() {
  const { id } = useParams<{ id: string }>();

  const { data: task, isLoading } = useGetTaskQueryTyped(id || '');

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-40 w-full mb-2" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="text-red-500">Failed to load task</div>
        <Link to="/tasks" className="text-blue-600">Back to tasks</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center">
        <Link to="/tasks" className="text-blue-600 hover:text-blue-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="ml-3 text-2xl font-bold">Task Details</h1>
        <div className="flex-1" />
        <Link
          to={`/tasks/${id}/`}
        >
          <Button>Edit Task</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>
            <div className="flex gap-2">
              <Badge variant="status" value={task.status}>{task.status}</Badge>
              <Badge variant="priority" value={task.priority}>
                {task.priority}
              </Badge>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {task.description && (
            <div className="text-sm text-gray-700 mb-4">
              {task.description}
            </div>
          )}

          <dl className="grid grid-cols-2 gap-4">
            {task.due_date && (
              <div>
                <dt className="text-sm text-gray-500">Due Date</dt>
                <dd className="text-base">
                  {new Date(task.due_date).toLocaleDateString()}
                </dd>
              </div>
            )}
            {task.assigned_to && (
              <div>
                <dt className="text-sm text-gray-500">Assigned To</dt>
                <dd className="text-base">{task.assigned_to}</dd>
              </div>
            )}
            {task.created_by && (
              <div>
                <dt className="text-sm text-gray-500">Created By</dt>
                <dd className="text-base">{task.created_by}</dd>
              </div>
            )}
            {task.dependencies?.length > 0 && (
              <div className="col-span-2">
                <dt className="text-sm text-gray-500">Dependencies</dt>
                <dd className="text-base">
                  <ul className="space-y-1">
                    {task.dependencies.map((dep: TaskDependency) => (
                      <li key={`${dep.predecessor_task_id}-${dep.dependency_type}`}>
                        {dep.dependency_type} - {dep.predecessor_task_id}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
```

**File:** `src/views/ContactDetailView.tsx`

**Current file contents:**
```tsx
import { useParams, Link } from 'react-router-dom';
import { useGetContactQuery } from '@/api/contactsApi';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function ContactDetailView() {
  const { id } = useParams<{ id: string }>();

  const { data: contact, isLoading, error } = useGetContactQuery(id || '');

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <Skeleton className="h-8 w-64 mb-4" size="sm" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">Error: {typeof error === 'string' ? error : 'Failed to load contact'}</div>
        <Link to="/contacts" className="text-blue-600">Back to contacts</Link>
      </div>
    );
  }

  if (!contact) {
    return <div className="p-6">Contact not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center">
        <Link to="/contacts" className="text-blue-600 hover:text-blue-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="ml-3 text-2xl font-bold">Contact Details</h1>
        <div className="flex-1" />
         <Link
            to={`/contacts/${id}/`}
          >
            <Button>Edit Contact</Button>
          </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Details about the contact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-gray-500">Name</dt>
                <dd className="text-base">
                  {contact.first_name} {contact.last_name}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Email</dt>
                <dd className="text-base">{contact.email || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Phone</dt>
                <dd className="text-base">{contact.phone || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Company</dt>
                <dd className="text-base">{contact.company_id || 'N/A'}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

**File:** `src/views/CompanyDetailView.tsx`

**Current file contents:**
```tsx
import { useParams, Link } from 'react-router-dom';
import { useGetCompanyQuery } from '@/api/companiesApi';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function CompanyDetailView() {
  const { id } = useParams<{ id: string }>();

  const { data: company, isLoading, error } = useGetCompanyQuery(id || '');

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <Skeleton className="h-8 w-64 mb-4" size="sm" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">
          Error: {typeof error === 'string' ? error : 'Failed to load company details'}
        </div>
        <Link to="/companies" className="text-blue-600">Back to companies</Link>
      </div>
    );
  }

  if (!company) {
    return <div className="p-6">Company not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center">
        <Link to="/companies" className="text-blue-600 hover:text-blue-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="ml-3 text-2xl font-bold">Company Details</h1>
        <div className="flex-1" />
        <Link
            to={`/companies/${id}/`}
          >
            <Button>Edit Company</Button>
          </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Details about the company</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-gray-500">Name</dt>
                <dd className="text-base">{company.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Industry</dt>
                <dd className="text-base">{company.industry || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Website</dt>
                <dd className="text-base">{company.website || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Address</dt>
                <dd className="text-base">{company.address || 'N/A'}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Current hardcoded styles:**
- All files use `text-gray-500` for field labels (`dt` elements)
- All files use `text-gray-700` for description text
- TaskDetailView uses `text-gray-700` for description
- Detail views use `text-blue-600` for links

**Changes needed:**
Replace hardcoded classes with design token equivalents:
```tsx
// text-gray-500 → text-muted-foreground
// text-gray-700 → text-foreground
// text-gray-900 → text-primary-foreground
// text-blue-600 → text-primary (for links)
```

**Validation:**
- All detail view fields render correctly
- Dark mode works correctly with proper contrast ratios

---

### Task 4.2: CompanyView/ContactView - replace hardcoded styles

**File:** `src/views/CompaniesView.tsx`

**Current file contents:**
```tsx
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useGetCompaniesQuery, useCreateCompanyMutation } from '@/api/companiesApi';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardContent, CardDescription } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function CompaniesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [createCompany] = useCreateCompanyMutation();

  const { data: companies, isLoading, error } = useGetCompaniesQuery(searchTerm);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateCompany = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newCompany = {
        name: 'Acme Corporation',
        industry: 'Technology',
        address: '123 Main St, Springfield, IL 62701',
      };
      await createCompany(newCompany).unwrap();
      // Force refetch
      setSearchTerm('');
    } catch (err) {
      console.error('Failed to create company:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <Skeleton className="h-8 w-32 mb-4" size="sm" />
        <Skeleton className="h-12 w-full mb-4" size="md" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">Error: {typeof error === 'string' ? error : 'Failed to load companies'}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Button as="a" href="/companies/new">
          Create Company
        </Button>
      </div>

      {/* Search and Create Form */}
      <div className="mb-6 flex gap-4">
        <Input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); }}
        />
        <form onSubmit={handleCreateCompany} className="flex-shrink-0">
          <Button type="submit" size="sm" variant="secondary">
            Quick Add
          </Button>
        </form>
      </div>

      {/* Companies List */}
      <Card>
        <CardHeader>
          <CardDescription>Company Directory</CardDescription>
        </CardHeader>
        <CardContent>
          {companies && companies.length > 0 ? (
            <ul className="divide-y">
              {companies.map((company) => (
                <li key={company.id}>
                  <Link
                    to={`/companies/${company.id}`}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <span className="font-medium">{company.name}</span>
                      {company.industry && (
                        <div className="text-sm text-gray-500">{company.industry}</div>
                      )}
                      {company.address && (
                        <div className="text-sm text-gray-500">{company.address}</div>
                      )}
                      {company.website && (
                        <div className="text-sm text-gray-500">{company.website}</div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No companies found. Create one to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

**File:** `src/views/ContactsView.tsx`

**Current file contents:**
```tsx
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useGetContactsQuery, useCreateContactMutation } from '@/api/contactsApi';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input }from '@/components/ui/Input';
import { Card, CardHeader, CardContent, CardDescription } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function ContactsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [createContact] = useCreateContactMutation();

  const { data: contacts, isLoading, error } = useGetContactsQuery(searchTerm);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateContact = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newContact = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-123-4567',
      };
      await createContact(newContact).unwrap();
      // Force refetch
      setSearchTerm('');
    } catch (err) {
      console.error('Failed to create contact:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <Skeleton className="h-8 w-32 mb-4" size="sm" />
        <Skeleton className="h-12 w-full mb-4" size="md" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">Error: {typeof error === 'string' ? error : 'Failed to load contacts'}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
      <Button as="a" href="/contacts/new">
           Create Contact
          </Button>
      </div>

      {/* Search and Create Form */}
      <div className="mb-6 flex gap-4">
        <Input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); }}
        />
        <form onSubmit={handleCreateContact} className="flex-shrink-0">
          <Button type="submit" size="sm" variant="secondary">
            Quick Add
          </Button>
        </form>
      </div>

      {/* Contacts List */}
      <Card>
        <CardHeader>
          <CardDescription>Contact Directory</CardDescription>
        </CardHeader>
        <CardContent>
        {contacts && contacts.length > 0 ? (
            <ul className="divide-y">
              {contacts.map((contact) => (
                <li key={contact.id}>
                <Link
                  to={`/contacts/${contact.id}`}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <span className="font-medium">
                      {contact.first_name} {contact.last_name}
                    </span>
                    {contact.email && (
                      <div className="text-sm text-gray-500">{contact.email}</div>
                    )}
                    {contact.phone && (
                      <div className="text-sm text-gray-500">{contact.phone}</div>
                    )}
                    {contact.company_id && (
                      <div className="text-sm text-gray-500">
                        Company: {contact.company_id}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No contacts found. Create one to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

**Current hardcoded styles:**
- Line 89,90,94,97,100: `text-gray-500` for company/contact details
- Line 108: `text-gray-500` for "No companies found" message
- Line 89: `hover:bg-gray-50` for list items

**Changes needed:**
Replace hardcoded classes with design token equivalents:
```tsx
// text-gray-500 → text-muted-foreground
// hover:bg-gray-50 → hover:bg-muted
// bg-gray-50 → bg-muted
```

**Validation:**
- Company/contact lists render correctly
- Dark mode works correctly

---

### Task 4.3: LoginView - replace hardcoded styles

**File:** `src/views/LoginView.tsx`

**Current file contents:**
```tsx
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/api/authApi';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { loginSuccess } from '@/stores/authSlice';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export function LoginView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMutation] = useLoginMutation();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setServerError('');

    try {
      const result = await loginMutation({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      dispatch(loginSuccess(result));
      localStorage.setItem('token', result.token);
      navigate('/');
    } catch (err: unknown) {
      const error = err as { message?: string; response?: { data?: { message?: string } } };
      setServerError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {serverError && (
        <div className="rounded-md border border-red-500 bg-red-50 p-3 text-sm text-red-800">
          {serverError}
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Link to="/password-reset" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
```

**Current hardcoded styles:**
- `text-gray-700` for labels
- `text-gray-600` for descriptions and links
- `text-gray-500` for error messages
- `border-red-500` for error borders
- `bg-red-50` for error backgrounds

**Changes needed:**
Replace hardcoded classes with design token equivalents:
```tsx
// text-gray-700 → text-foreground
// text-gray-600 → text-muted-foreground
// text-gray-500 → text-muted-foreground
// border-red-500 → border-destructive (if using design tokens)
// bg-red-50 → bg-destructive/10
```

**Validation:**
- Login form renders correctly
- Error messages display correctly
- Dark mode works correctly

---

### Task 4.4: RegisterView - replace hardcoded styles

**File:** `src/views/RegisterView.tsx`

**Current file contents:**
```tsx
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '@/api/authApi';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { loginSuccess } from '@/stores/authSlice';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function RegisterView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerMutation] = useRegisterMutation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setServerError('');

     try {
      await registerMutation({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      }).unwrap();

      dispatch(loginSuccess({
        token: '',
        user: { id: '', email: formData.email, role: '' },
      }));

      navigate('/');
    } catch (err: unknown) {
      const error = err as { message?: string; response?: { data?: { message?: string } } };
      setServerError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {serverError && (
        <div className="rounded-md border border-red-500 bg-red-50 p-3 text-sm text-red-800">
          {serverError}
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="register-email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="register-email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && (<p className="text-xs text-red-500">{errors.password}</p>)}
      </div>
      <div className="space-y-2">
        <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          className={errors.confirmPassword ? 'border-red-500' : ''}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
```

**Current hardcoded styles:**
- `text-gray-700` for labels
- `text-gray-600` for descriptions and links
- `text-gray-500` for error messages
- `border-red-500` for error borders
- `bg-red-50` for error backgrounds

**Changes needed:**
Replace hardcoded classes with design token equivalents:
```tsx
// text-gray-700 → text-foreground
// text-gray-600 → text-muted-foreground
// text-gray-500 → text-muted-foreground
// border-red-500 → border-destructive (if using design tokens)
// bg-red-50 → bg-destructive/10
```

**Validation:**
- Registration form renders correctly
- Error messages display correctly
- Dark mode works correctly

---

### Task 4.5: PasswordResetView - replace hardcoded styles

**File:** `src/views/PasswordResetView.tsx`

**Current file contents:**
```tsx
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { usePasswordResetMutation } from '@/api/authApi';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface FormErrors {
  email?: string;
}

export function PasswordResetView() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [passwordResetMutation] = usePasswordResetMutation();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setServerError('');

    try {
      await passwordResetMutation({ email }).unwrap();
      setSuccess(true);
    } catch (err: unknown) {
      const error = err as { message?: string; response?: { data?: { message?: string } } };
      setServerError(error.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Check your email</h2>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ve sent a password reset link to {email}. Please check your email.
        </p>
        <Link to="/login" className="text-sm text-blue-600 hover:underline">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {serverError && (
        <div className="rounded-md border border-red-500 bg-red-50 p-3 text-sm text-red-800">
          {serverError}
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send reset link'}
      </Button>
      <p className="text-center text-sm text-gray-600">
        <Link to="/login" className="text-blue-600 hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  );
}
```

**Current hardcoded styles:**
- `text-gray-700` for labels
- `text-gray-600` for descriptions and links
- `text-gray-500` for error messages
- `text-gray-900` for headings
- `border-red-500` for error borders
- `bg-red-50` for error backgrounds

**Changes needed:**
Replace hardcoded classes with design token equivalents:
```tsx
// text-gray-700 → text-foreground
// text-gray-600 → text-muted-foreground
// text-gray-500 → text-muted-foreground
// text-gray-900 → text-primary-foreground
// border-red-500 → border-destructive
// bg-red-50 → bg-destructive/10
```

**Validation:**
- Password reset form renders correctly
- Error messages display correctly
- Dark mode works correctly

---

### Task 4.6: DashboardView - replace hardcoded styles

**File:** `src/views/DashboardView.tsx`

**Current file contents:**
```tsx
// =====================================================
// Dashboard View
// =====================================================
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { generateDashboardMetrics } from '@/mock-data/dashboard';

export function DashboardView() {
  const metrics = generateDashboardMetrics();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your CRM activity and performance</p>
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
              <div key={activity.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-600">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-900">
                  {activity.title}
                </span>
                <span className="text-xs text-gray-500 ml-auto">
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
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend !== undefined && (
          <p className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '↑' : '↓'} {trend} vs last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

**Current hardcoded styles:**
- Line 20: `text-gray-900` for heading
- Line 21: `text-gray-600` for description
- Line 88-94: `text-gray-600`, `text-gray-900`, `text-gray-500` for activity items
- Line 113: `text-gray-900` for value display
- Line 115: `text-green-600`/`text-red-600` for trend indicators

**Changes needed:**
Replace hardcoded classes with design token equivalents:
```tsx
// text-gray-900 → text-primary-foreground
// text-gray-600 → text-muted-foreground
// text-gray-500 → text-muted-foreground
// text-green-600 → text-green-600 (or use semantic colors)
// text-red-600 → text-red-600 (or use semantic colors)
```

**Validation:**
- Dashboard renders correctly with design tokens
- Trends use semantic color classes

---

### Task 4.7: ActivitiesView - replace hardcoded styles

**File:** `src/views/ActivitiesView.tsx`

**Current file contents:**
```tsx
// =====================================================
// Activity Timeline View
// =====================================================
import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetActivitiesQuery } from '@/api/activitiesApi';
import type { ActivityType } from '@/api/activitiesApi';
import ActivityTimeline from '@/components/activity/ActivityTimeline';
import ActivityFilterBar from '@/components/activity/ActivityFilterBar';
import ActivityForm from '@/components/activity/ActivityForm';
import { Button } from '@/components/ui/Button';

export function ActivitiesView() {
  const { contactId } = useParams();
  void contactId;
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'type' | 'title'>('date');
  const [filterType, setFilterType] = useState<ActivityType | undefined>(undefined);

  const { data: activitiesData, isLoading } = useGetActivitiesQuery({
    page: 1,
    limit: 50,
    search: '',
  });

  const filteredActivities = useMemo(() => {
    const activities = activitiesData?.activities || [];
    if (!activities.length) return [];
    let filtered = [...activities];
    if (filterType) {
      filtered = filtered.filter((a) => a.type === filterType);
    }
    return filtered;
  }, [activitiesData, filterType]);

  const sortedActivities = useMemo(() => {
    const sorted = [...filteredActivities];
    if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'type') {
      sorted.sort((a, b) => a.type.localeCompare(b.type));
    } else if (sortBy === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  }, [filteredActivities, sortBy]);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Activity Timeline</h1>
        <Button size="sm" onClick={() => setShowForm(true)}>
          New Activity
        </Button>
      </div>

      <ActivityFilterBar
        onTypeChange={(type) => setFilterType(type as ActivityType | undefined)}
        onSortChange={(sort) => setSortBy(sort as 'date' | 'type' | 'title')}
      />

      <ActivityTimeline
        activities={sortedActivities}
        loading={isLoading}
      />

      {showForm && (
        <ActivityForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
```

**Current hardcoded styles:**
- Line 52: Button uses hardcoded styles for "New Activity" button

**Changes needed:**
- Replace hardcoded button styles with Button component
- Replace hardcoded text colors with design tokens

**Validation:**
- Activity form renders correctly
- Activity items display correctly

---

### Task 4.8: ReportsView - replace hardcoded styles

**File:** `src/views/ReportsView.tsx`

**Current hardcoded styles:**
- Line 71: `text-gray-900` for heading
- Line 72: `text-gray-600` for description
- Line 82: `border-blue-500` and `text-blue-600` for active tab
- Line 98,104: `bg-gray-50` for report sections
- Line 99,100: `text-gray-700`/`text-gray-600` for section text
- Line 147-148: `bg-gray-50` and `text-gray-600` for report stats
- Line 161: `text-gray-700` for report text
- Line 172-174: `border-gray-100` and `text-gray-700` for activity rows
- Line 186-188: similar hardcoded styles for pipeline

**Changes needed:**
Replace hardcoded classes with design token equivalents:
```tsx
// text-gray-900 → text-primary-foreground
// text-gray-600 → text-muted-foreground
// text-gray-700 → text-foreground
// text-gray-500 → text-muted-foreground
// border-blue-500 → border-primary
// bg-gray-50 → bg-muted
```

**Validation:**
- Report sections render correctly in both light and dark modes
- Tab active state works correctly
- Export format selection works

---

## Phase 5: Charts Component Styles

### Task 5.1: BarChart - replace hardcoded styles with design tokens

**File:** `src/components/charts/BarChart.tsx`

**Current file contents:**
```tsx
// =====================================================
// BarChart Component
// =====================================================
import { useState } from 'react';

interface BarChartProps {
  data: Record<string, number>;
  title: string;
  color?: string;
}

export function BarChart({ data, title, color = 'bg-blue-500' }: BarChartProps) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);
  const [hovered, setHovered] = useState<string>('');

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {Object.entries(data)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([label, value]) => {
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return (
              <div
                key={label}
                className="group relative"
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered('')}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {formatLabel(label)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {value} ({total > 0 ? ((value / total) * 100).toFixed(1) : '0'}%)
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${color}`}
                    style={{ width: percentage }}
                  />
                </div>
                {hovered === label && (
                  <div className="absolute top-0 left-0 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow-sm">
                    {formatLabel(label)}: {value}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

function formatLabel(label: string): string {
  return label
    .replace(/_/g, ' ')
    .split(/[\s_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

**Current hardcoded styles:**
- Line 21: `bg-white rounded-lg shadow-sm border border-gray-200` for chart container
- Line 22: `text-gray-900` for title
- Line 37,40: `text-gray-700`/`text-gray-600` for data values
- Line 44: `bg-gray-200` for background bar

**Changes needed:**
Replace hardcoded classes with design token equivalents:
```tsx
// bg-white → bg-card
// border-gray-200 → border-border
// text-gray-900 → text-primary-foreground
// text-gray-700 → text-foreground
// text-gray-600 → text-muted-foreground
// bg-gray-200 → bg-muted
```

**Validation:**
- Charts render correctly in both light and dark modes
- Chart colors work well in both themes

---

### Task 5.2: PieChart - replace hardcoded styles with design tokens

**File:** `src/components/charts/PieChart.tsx`

**Current file contents:**
```tsx
// =====================================================
// PieChart Component
// =====================================================
import { useState } from 'react';

interface PieChartProps {
  data: Record<string, number>;
  title: string;
  colorPalette?: string[];
}

const defaultColorPalette = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-orange-500',
];

const colorMap: Record<string, string> = {
  'bg-blue-500': '#3b82f6',
  'bg-green-500': '#10b981',
  'bg-yellow-500': '#eab308',
  'bg-purple-500': '#a855f7',
  'bg-pink-500': '#ec4899',
  'bg-indigo-500': '#6366f1',
  'bg-teal-500': '#14b8a6',
  'bg-orange-500': '#f97316',
};

export function PieChart({ data, title, colorPalette: customPalette }: PieChartProps) {
  const palette = customPalette || defaultColorPalette;
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="flex items-center gap-4">
        {/* Donut chart visualization */}
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {(() => {
              const segments = Object.entries(data)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5);
              const angle = 0;
              return segments.map(([label, value], index) => {
                const percentage = total > 0 ? (value / total) * 100 : 0;
                const sweep = (percentage / 100) * 360;
                const color = palette[index % palette.length];
                const colorValue = colorMap[color] || '#3b82f6';

                const startRad = ((angle - 90) * Math.PI) / 180;
                const endRad = (((angle + sweep) - 90) * Math.PI) / 180;

                const cx = 50;
                const cy = 50;
                const r = 40;

                const x1 = cx + r * Math.cos(startRad);
                const y1 = cy + r * Math.sin(startRad);
                const x2 = cx + r * Math.cos(endRad);
                const y2 = cy + r * Math.sin(endRad);

                const largeArc = sweep > 180 ? 1 : 0;

                return (
                  <path
                    key={label}
                    d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
                    fill={colorValue}
                    stroke="white"
                    strokeWidth={2}
                  />
                );
              });
            })()}
          </svg>
          {/* Center circle for donut effect */}
          <div className="absolute inset-3 bg-white rounded-full" />
        </div>
        {/* Legend */}
        <div className="flex-1 space-y-1">
          {Object.entries(data)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([label, value], index) => {
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${palette[index % palette.length]}`} />
                  <span className="text-sm text-gray-700 capitalize">
                    {formatLabel(label)} ({value})
                  </span>
                  <span className="text-sm text-gray-500 ml-auto">
                    ({percentage}%)
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function formatLabel(label: string): string {
  return label
    .replace(/_/g, ' ')
    .split(/[\s_-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

**Current hardcoded styles:**
- Line 41: `bg-white rounded-lg shadow-sm border border-gray-200` for chart container
- Line 42: `text-gray-900` for title
- Line 97: `text-gray-700` for legend text

**Changes needed:**
Replace hardcoded classes with design token equivalents:
```tsx
// bg-white → bg-card
// border-gray-200 → border-border
// text-gray-900 → text-primary-foreground
// text-gray-700 → text-foreground
```

**Validation:**
- Chart renders correctly in both light and dark modes

---

### Task 5.3: KanbanBoard - replace hardcoded styles

**File:** `src/components/tasks/KanbanBoard.tsx`

**Current file contents:**
```tsx
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { updateTaskStatus } from '@/stores/tasksSlice';
import type { Task } from '@/types/entities';
import type { AppDispatch, RootState } from '@/store/store';

type KanbanColumn = 'open' | 'in_progress' | 'completed' | 'cancelled';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

const columnLabels: Record<KanbanColumn, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const columnColors: Record<KanbanColumn, string> = {
  open: 'bg-blue-50 dark:bg-blue-900/20',
  in_progress: 'bg-yellow-50 dark:bg-yellow-900/20',
  completed: 'bg-green-50 dark:bg-green-900/20',
  cancelled: 'bg-gray-50 dark:bg-gray-900/20',
};

export function KanbanBoard({ tasks, onTaskClick }: KanbanBoardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const storedTasks = useSelector((state: RootState) => state.tasks);
  const draggedTaskId = useRef<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleDragStart = (taskId: string, _e: React.DragEvent) => {
    draggedTaskId.current = taskId;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (column: KanbanColumn, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const taskId = draggedTaskId.current;
    if (!taskId) return;

    // Find task in current tasks list to get its current status
    const task = storedTasks?.tasks?.find((task: Task) => task.id === taskId);
    if (!task) return;

    // Update local state
    dispatch(updateTaskStatus({ taskId, newStatus: column }));

    // Reset drag state
    draggedTaskId.current = null;
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Kanban Board</h2>
        <Button size="sm" variant="outline">
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {(['open', 'in_progress', 'completed', 'cancelled'] as KanbanColumn[]).map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column);

        return (
          <div
            key={column}
            className={`rounded-lg p-3 ${columnColors[column]}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(column, e)}
          >
            <h3 className="font-medium mb-3">{columnLabels[column]}</h3>

            {columnTasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(task.id, e)}
                className="mb-2"
              >
                <Card
                  className="p-3 cursor-grab hover:shadow-md transition-shadow active:cursor-grabbing"
                  onClick={() => onTaskClick(task.id)}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-medium">{task.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-2 truncate">{task.description}</p>
                  )}
                  {task.due_date && (
                    <p className="text-xs text-gray-500 mt-1">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  )}
                </Card>
              </div>
            ))}
          </div>
        );
      })}
      </div>
    </div>
  );
}
```

**Current hardcoded styles:**
- Line 27: `bg-gray-50 dark:bg-gray-900/20` for column backgrounds
- Line 37: `bg-red-500` for urgent priority
- Line 41: `bg-gray-500` for default priority
- Line 112: `text-gray-600` for description
- Line 115: `text-gray-500` for due date

**Changes needed:**
Replace hardcoded classes with design token equivalents:
```tsx
// bg-gray-50 → bg-muted
// text-gray-600 → text-muted-foreground
// text-gray-500 → text-muted-foreground
```

**Validation:**
- Kanban board renders correctly in both light and dark modes

---

### Task 5.4: ActivityTimeline - replace hardcoded styles

**File:** `src/components/activity/ActivityTimeline.tsx`

**Current file contents:**
```tsx
// =====================================================
// Activity Timeline Component
// =====================================================
import type { ActivitySchema } from '@/mock-data/schemas';
import { Skeleton } from '@/components/ui/Skeleton';

interface ActivityTimelineProps {
  activities: ActivitySchema[];
  loading: boolean;
}

/** Activity type to icon mapping */
const ACTIVITY_TYPE_ICONS: Record<string, string> = {
  call: '📞',
  meeting: '📅',
  email: '📧',
  note: '📝',
  task: '✅',
  deal: '💼',
  other: '📋',
};

export default function ActivityTimeline({ activities, loading }: ActivityTimelineProps) {
  if (loading) {
    return (
      <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" size="sm" />
          <Skeleton className="h-4 w-48" size="sm" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No activities found. Create one to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="border-l-4 border-blue-500 pl-4 py-2">
          <div className="font-semibold flex items-center gap-2">
            <span>{ACTIVITY_TYPE_ICONS[activity.type] || '📋'}</span>
            <span>{activity.title}</span>
            <span className="text-sm text-gray-500 text-xs">({activity.type})</span>
          </div>
          <div className="text-gray-600 text-sm">
            {new Date(activity.date).toLocaleDateString()}
          </div>
          {activity.description && (
            <div className="text-gray-700">{activity.description}</div>
          )}
          {activity.duration && (
            <div className="text-gray-500 text-sm">Duration: {activity.duration} min</div>
          )}
        </div>
      ))}
    </div>
  );
}
```

**Current hardcoded styles:**
- Line 40: `text-gray-500` for no activities message
- Line 53: `text-gray-500` for type text
- Line 55: `text-gray-600` for description text
- Line 59: `text-gray-700` for description
- Line 62: `text-gray-500` for duration

**Changes needed:**
Replace hardcoded classes with design token equivalents:
```tsx
// text-gray-500 → text-muted-foreground
// text-gray-600 → text-muted-foreground
// text-gray-700 → text-foreground
```

**Validation:**
- Activity timeline renders correctly with design tokens

---

## Phase 6: Validation

### Task 6.1: Run TypeScript compilation

**Command:** `pnpm build`

**Validation:**
- No TypeScript errors
- All imports resolve correctly

### Task 6.2: Test dark mode toggle

**Steps:**
1. Navigate to any page
2. Click the sun/moon icon in sidebar
3. Verify theme changes to dark/light
4. Reload page - verify theme persists
5. Verify all components respect the theme

**Validation:**
- Theme toggle works on all pages
- All components use design tokens for proper theme support

### Task 6.3: Test all views

**Files to verify:**
- LoginView, RegisterView, PasswordResetView
- DashboardView
- CompaniesView, ContactsView, TasksView, ActivitiesView
- TaskDetailView, ContactDetailView, CompanyDetailView
- TaskForm, ContactForm, CompanyForm
- ReportsView
- SearchView

**Validation:**
- All views render correctly
- Dark mode works on all views
- Forms submit correctly

---

## Summary of Design Token Mappings

| Hardcoded Class | Design Token Equivalent |
|----------------|----------------------|
| `text-gray-900` | `text-primary-foreground` |
| `text-gray-700` | `text-foreground` |
| `text-gray-600` | `text-muted-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `bg-gray-50` | `bg-muted` |
| `bg-gray-200` | `bg-muted` |
| `border-gray-200` | `border-border` |
| `border-gray-100` | `border-border` |
| `border-blue-500` | `border-primary` |
| `bg-blue-600` | `bg-primary` |

These mappings ensure theme-aware styling across the application.
