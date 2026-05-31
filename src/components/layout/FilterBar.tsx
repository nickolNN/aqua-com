import { useState, useEffect } from 'react';

// =====================================================
// FilterBar Component
// =====================================================
// Advanced filtering UI component supporting date range,
// status, priority, type, and custom field filters.
// =====================================================

interface FilterBarProps {
  entityType: 'tasks' | 'contacts' | 'companies' | 'activities';
  onFilterChange?: (filters: Record<string, unknown>) => void;
}

const ENTITY_FILTERS: Record<string, Array<{ key: string; label: string; options: string[] }>> = {
  tasks: [
    { key: 'status', label: 'Status', options: ['open', 'in_progress', 'completed', 'cancelled', 'all'] },
    { key: 'priority', label: 'Priority', options: ['low', 'medium', 'high', 'urgent', 'all'] },
  ],
  activities: [
    { key: 'type', label: 'Activity Type', options: ['call', 'meeting', 'email', 'note', 'task', 'deal', 'other', 'all'] },
  ],
  contacts: [
    { key: 'company', label: 'Company', options: [] },
  ],
  companies: [
    { key: 'industry', label: 'Industry', options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Consulting', 'Real Estate', 'Media', 'Telecommunications', 'all'] },
  ],
};

export default function FilterBar({ entityType, onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<Record<string, unknown>>({});

  useEffect(() => {
    onFilterChange?.(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters };
    if (value === 'all' || value === '') {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    setFilters(newFilters);
  };

  const handleSaveFilter = () => {
    const filterName = prompt('Enter filter name to save:');
    if (filterName) {
      const newFilter = {
        id: Date.now().toString(),
        name: filterName,
        type: entityType,
        criteria: { ...filters },
      };
      const savedFilters = JSON.parse(localStorage.getItem('savedFilters') || '[]');
      localStorage.setItem('savedFilters', JSON.stringify([...savedFilters, newFilter]));
      alert(`Filter "${filterName}" saved successfully.`);
    }
  };

  const filtersConfig = ENTITY_FILTERS[entityType] || [];
  const hasFilters = Object.keys(filters).length > 0;

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Advanced Filters</h3>
        <div className="flex gap-2">
          {hasFilters && (
            <button
              onClick={() => setFilters({})}
              className="text-xs text-red-600 hover:text-red-800"
            >
              Clear Filters
            </button>
          )}
          <button
            onClick={handleSaveFilter}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Save Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filtersConfig.map((config) => (
          <div key={config.key}>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              {config.label}
            </label>
            <select
              value={String(filters[config.key] || '')}
              onChange={(e) => handleFilterChange(config.key, e.target.value)}
              className="w-full text-sm rounded border border-gray-300 px-2 py-1"
            >
              <option value="">Select {config.label}</option>
              {config.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'all' ? 'All' : opt}
              </option>
              ))}
            </select>
          </div>
        ))}

        <div className="space-y-2">
          <div className="flex items-center">
            <label htmlFor="date-range" className="block text-xs font-medium text-gray-600 mr-2">
              Date Range
            </label>
            <input
              id="date-range"
              type="date"
              onChange={(e) => {
                const newFilters = { ...filters, date_start: e.target.value };
                setFilters(newFilters);
              }}
              className="w-full text-sm rounded border border-gray-300 px-2 py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { ENTITY_FILTERS };
export type { FilterBarProps };
