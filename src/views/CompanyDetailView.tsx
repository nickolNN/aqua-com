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
        <div className="text-destructive">
          Error: {typeof error === 'string' ? error : 'Failed to load company details'}
        </div>
        <Link to="/companies" className="text-primary">Back to companies</Link>
      </div>
    );
  }

  if (!company) {
    return <div className="p-6">Company not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center">
        <Link to="/companies" className="text-primary hover:text-primary/80 transition-colors">
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
                <dt className="text-sm text-muted-foreground">Name</dt>
                <dd className="text-base">{company.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Industry</dt>
                <dd className="text-base">{company.industry || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Website</dt>
                <dd className="text-base">{company.website || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Address</dt>
                <dd className="text-base">{company.address || 'N/A'}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
