import { useState, type FormEvent } from 'react';
import { useGetContactsQuery, useCreateContactMutation } from '@/api/contactsApi';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function ContactsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [createContact] = useCreateContactMutation();

  const { data: contacts, isLoading, error } = useGetContactsQuery(searchTerm);

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
        <div className="text-destructive">Error: {typeof error === 'string' ? error : 'Failed to load contacts'}</div>
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

      <div className="mb-6 flex gap-4">
        <Input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearchTerm(e.target.value); }}
        />
        <form onSubmit={handleCreateContact} className="flex-shrink-0">
          <Button type="submit" size="sm" variant="secondary">
            Quick Add
          </Button>
        </form>
      </div>

      <Card>
        <CardContent>
        {contacts && contacts.length > 0 ? (
            <ul className="divide-y">
              {contacts.map((contact) => (
                <li key={contact.id}>
                <Link
                  to={`/contacts/${contact.id}`}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-muted transition-colors"
                >
                  <div>
                    <span className="font-medium">
                      {contact.first_name} {contact.last_name}
                    </span>
                    {contact.email && (
                      <div className="text-sm text-muted-foreground">{contact.email}</div>
                    )}
                    {contact.phone && (
                      <div className="text-sm text-muted-foreground">{contact.phone}</div>
                    )}
                    {contact.company_id && (
                      <div className="text-sm text-muted-foreground">
                        Company: {contact.company_id}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              No contacts found. Create one to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
