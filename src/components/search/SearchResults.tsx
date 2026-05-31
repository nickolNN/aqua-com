// =====================================================
// SearchResults Component
// =====================================================
// Displays search results organized by entity type
// with clickable items that navigate to details.
// =====================================================

/**
 * Safely extract string from a record
 */
function safeString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

interface SearchResultItem {
  type: string;
  id: string;
  title: string;
  subtitle: string;
  link: string;
}

interface SearchResultsProps {
  results: Record<string, unknown[]>;
  query: string;
}

/**
 * Renders a single search result item
 */
function SearchResultItem({ item }: { item: SearchResultItem }) {
  return (
    <a
      href={item.link || '#'}
      className="block px-3 py-2 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase">{item.type}</span>
            <span className="text-sm font-medium">{item.title}</span>
          </div>
          <div className="text-xs text-gray-500">{item.subtitle}</div>
        </a>
  );
}

/**
 * SearchResults displays grouped search results by entity type
 * when a search query is active
 */
export function SearchResults({ results, query }: SearchResultsProps) {
  const entityTypes: Array<{ key: string; label: string; icon: string }> = [
    { key: 'contacts', label: 'Contacts', icon: '👤' },
    { key: 'companies', label: 'Companies', icon: '🏢' },
    { key: 'tasks', label: 'Tasks', icon: '📋' },
    { key: 'activities', label: 'Activities', icon: '📞' },
  ];

  const totalResults = Object.values(results).reduce((sum: number, items) => sum + (items.length || 0), 0);

  if (totalResults === 0 && query) {
    return (
      <div className="py-8 text-center text-gray-500">
  No results found for {query}
      </div>
    );
  }

  if (!query) {
    return null;
  }

  return (
    <div className="mt-2">
      {/* Results count */}
      <div className="px-3 py-2 text-xs text-gray-500 font-medium">
        {totalResults} result{totalResults !== 1 ? 's' : ''} found
      </div>

      {/* Results grouped by type */}
      {entityTypes.map(({ key, label }) => {
        const items = results[key] as unknown[];
        if (!items || items.length === 0) return null;

        return (
          <div key={key} className="mb-2">
            <div className="text-xs text-gray-500 mb-1 px-3">{label} ({items.length})</div>
            <div className="border rounded">
              {items.slice(0, 10).map((item: unknown) => {
              const record = item as Record<string, unknown>;
              const searchItem: SearchResultItem = {
                type: key,
                id: String(record.id || ''),
                title: String(record.title || record.first_name || record.name || 'Untitled'),
                subtitle: safeString(record.description || record.email),
                link: record.id ? `/${key}/${record.id}` : '#',
              };

              return <SearchResultItem key={`${key}-${record.id}`} item={searchItem} />;
            })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { SearchResultItem };
