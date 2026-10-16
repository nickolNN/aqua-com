// =====================================================
// SearchBar Component
// =====================================================
// A search bar component that works with the Redux store
// for global search across all entity types.
// =====================================================

import { useState, useRef, useEffect, useCallback } from 'react';
import { getMockContacts, getMockTasks, getMockCompanies, getMockActivities } from '@/mock-data';
import type { TaskSchema, CompanySchema, ActivitySchema } from '@/mock-data/schemas';

// Types for search results
export interface SearchResult {
  type: string;
  id: string;
  title: string;
  subtitle: string;
  link: string;
}

/**
 * GlobalSearchBar component for integration into the header
 */
export default function GlobalSearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const q = searchTerm.toLowerCase();
    const searchResults: SearchResult[] = [];
    const contacts = getMockContacts();
    const tasks = getMockTasks();
    const companies = getMockCompanies();
    const activities = getMockActivities();

    contacts.filter((c: Record<string, unknown>) =>
      JSON.stringify(c).toLowerCase().includes(q)
    ).forEach((c) => {
      const contact = c as Record<string, unknown>;
      searchResults.push({
        type: 'contact',
        id: String(contact['id']),
        title: `${contact['first_name']} ${contact['last_name']}`,
        subtitle: String(contact['email']),
        link: `/contacts/${contact['id']}`,
      });
    });

    tasks.filter((t: Record<string, unknown>) =>
      ((t['title'] as string) || '').toLowerCase().includes(q)
    ).forEach((t: Record<string, unknown>) => {
      const task = t as unknown as TaskSchema;
      searchResults.push({
        type: 'task',
        id: task.id,
        title: task.title,
        subtitle: `Priority: ${task.priority} | Status: ${task.status}`,
        link: '/tasks',
      });
    });

    companies.filter((c: Record<string, unknown>) =>
      ((c['name'] as string) || '').toLowerCase().includes(q)
    ).forEach((c: Record<string, unknown>) => {
      const company = c as unknown as CompanySchema;
      searchResults.push({
        type: 'company',
        id: company.id,
        title: company.name,
        subtitle: company.industry || '',
        link: `/companies/${company.id}`,
      });
    });

    activities.filter((a: Record<string, unknown>) =>
      ((a['title'] as string) || '').toLowerCase().includes(q)
    ).forEach((a: Record<string, unknown>) => {
      const activity = a as unknown as ActivitySchema;
      searchResults.push({
        type: 'activity',
        id: activity.id,
        title: activity.title,
        subtitle: `${activity.type} | ${new Date(activity.date).toLocaleDateString()}`,
        link: '#',
      });
     });

      setResults(searchResults);
      setIsOpen(true);
    }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    performSearch(newQuery);
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        onFocus={() => {
          if (query) performSearch(query);
        }}
        placeholder="Search contacts, tasks, companies..."
        className="w-64 px-3 py-1.5 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring focus:ring-ring/30 outline-none transition"
        aria-label="Global search"
      />

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-1 left-0 w-full bg-popover border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-2 text-xs text-muted-foreground font-medium">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </div>
          {results.map((result, index) => (
            <a
              key={`${result.type}-${result.id}-${index}`}
              href={result.link || '#'}
              className="block px-3 py-1.5 text-sm hover:bg-muted transition"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase">{result.type}</span>
                <span className="font-medium">{result.title}</span>
              </div>
              <div className="text-xs text-muted-foreground">{result.subtitle}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
