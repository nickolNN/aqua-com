import { useState, type FormEvent } from 'react';
import { useGetCompaniesQuery, useCreateCompanyMutation } from '@/api/companiesApi';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function CompaniesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [createCompany] = useCreateCompanyMutation();

  const { data: companies, isLoading, error } = useGetCompaniesQuery(searchTerm);

  const handleCreateCompany = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newCompany = {
        name: 'Acme Corporation',
        industry: 'Technology',
        address: '123 Main St, Springfield, IL 62701',
      };
      await createCompany(newCompany).unwrap();
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
        <div className="text-destructive">Error: {typeof error === 'string' ? error : 'Failed to load companies'}</div>
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

      <div className="mb-6 flex gap-4">
        <Input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
        <form onSubmit={handleCreateCompany} className="flex-shrink-0">
          <Button type="submit" size="sm" variant="secondary">
            Quick Add
          </Button>
        </form>
      </div>

      <Card>
        <CardContent>
          {companies && companies.length > 0 ? (
            <ul className="divide-y">
              {companies.map((company) => (
                <li key={company.id}>
                  <Link
                    to={`/companies/${company.id}`}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <div>
                      <span className="font-medium">{company.name}</span>
                      {company.industry && (
                        <div className="text-sm text-muted-foreground">{company.industry}</div>
                      )}
                      {company.address && (
                        <div className="text-sm text-muted-foreground">{company.address}</div>
                      )}
                      {company.website && (
                        <div className="text-sm text-muted-foreground">{company.website}</div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              No companies found. Create one to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
