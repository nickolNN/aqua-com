import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal, ModalContent, ModalTitle, ModalFooter } from '@/components/ui/Modal';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/Select';

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
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');

  const prevFiltersRef = useRef(filters);
  useEffect(() => {
    if (JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters)) {
      onFilterChange?.(filters);
    }
    prevFiltersRef.current = filters;
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
    setFilterName('');
    setShowSaveDialog(true);
  };

  const confirmSaveFilter = () => {
    if (filterName.trim()) {
      const newFilter = {
        id: Date.now().toString(),
        name: filterName.trim(),
        type: entityType,
        criteria: { ...filters },
      };
      const savedFilters = JSON.parse(localStorage.getItem('savedFilters') || '[]');
      localStorage.setItem('savedFilters', JSON.stringify([...savedFilters, newFilter]));
    }
    setShowSaveDialog(false);
    setFilterName('');
  };

  const filtersConfig = ENTITY_FILTERS[entityType] || [];
  const hasFilters = Object.keys(filters).length > 0;

  return (
    <div className="mb-4 p-4 bg-muted rounded-lg border border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">Advanced Filters</h3>
        <div className="flex gap-2">
          {hasFilters && (
            <button
              onClick={() => setFilters({})}
              className="text-xs text-destructive hover:text-destructive/80"
            >
              Clear Filters
            </button>
          )}
          <button
            onClick={handleSaveFilter}
            className="text-xs text-primary hover:text-primary/80"
          >
            Save Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filtersConfig.map((config) => (
          <div key={config.key}>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {config.label}
            </label>
            <Select
              value={String(filters[config.key] ?? 'all')}
              onValueChange={(value) => handleFilterChange(config.key, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${config.label}`} />
              </SelectTrigger>
              <SelectContent>
                {config.options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt === 'all' ? 'All' : opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}

        <div className="space-y-2">
          <div className="flex items-center">
            <label htmlFor="date-range" className="block text-xs font-medium text-muted-foreground mr-2">
              Date Range
            </label>
            <Input
              id="date-range"
              type="date"
              onChange={(e) => {
                const newFilters = { ...filters, date_start: e.target.value };
                setFilters(newFilters);
              }}
            />
          </div>
        </div>
      </div>

      <Modal open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <ModalContent>
          <ModalTitle>Save Filter</ModalTitle>
          <Input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Filter name"
          />
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSaveFilter}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export { ENTITY_FILTERS };
export type { FilterBarProps };
