import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useGetCompaniesQuery, useCreateCompanyMutation } from '@/api/companiesApi';
import { Link } from 'react-router-dom';

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
    return <div className="p-6">Loading companies...</div>;
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
        <Link
          to="/companies/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Company
        </Link>
      </div>

      {/* Search and Create Form */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={handleSearch}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <form onSubmit={handleCreateCompany} className="flex-shrink-0">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Quick Add
          </button>
        </form>
      </div>

      {/* Companies List */}
      <div className="bg-white border rounded-md">
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
      </div>
    </div>
  );
}
