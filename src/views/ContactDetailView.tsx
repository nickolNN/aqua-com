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
        <div className="text-destructive">Error: {typeof error === 'string' ? error : 'Failed to load contact'}</div>
        <Link to="/contacts" className="text-primary">Back to contacts</Link>
      </div>
    );
  }

  if (!contact) {
    return <div className="p-6">Contact not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center">
        <Link to="/contacts" className="text-primary hover:text-primary/80 transition-colors">
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
                <dt className="text-sm text-muted-foreground">Name</dt>
                <dd className="text-base">
                  {contact.first_name} {contact.last_name}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Email</dt>
                <dd className="text-base">{contact.email || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Phone</dt>
                <dd className="text-base">{contact.phone || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Company</dt>
                <dd className="text-base">{contact.company_id || 'N/A'}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
