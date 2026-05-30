import { useGetContactsQuery } from '@/api/contactsApi';

export function ContactsView() {
  const { data: contacts, isLoading } = useGetContactsQuery('');

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1>Contacts</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {contacts?.map((contact) => (
            <li key={contact.id}>{contact.first_name} {contact.last_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
