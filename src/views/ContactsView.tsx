import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useGetContactsQuery, useCreateContactMutation } from '@/api/contactsApi';
import { Link } from 'react-router-dom';

export function ContactsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [createContact] = useCreateContactMutation();

  const { data: contacts, isLoading, error } = useGetContactsQuery(searchTerm);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
      // Force refetch
      setSearchTerm('');
    } catch (err) {
      console.error('Failed to create contact:', err);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading contacts...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">Error: {typeof error === 'string' ? error : 'Failed to load contacts'}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Link
          to="/contacts/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Contact
        </Link>
      </div>

      {/* Search and Create Form */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={handleSearch}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <form onSubmit={handleCreateContact} className="flex-shrink-0">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Quick Add
          </button>
        </form>
      </div>

      {/* Contacts List */}
      <div className="bg-white border rounded-md">
      {contacts && contacts.length > 0 ? (
          <ul className="divide-y">
            {contacts.map((contact) => (
              <li key={contact.id}>
              <Link
                to={`/contacts/${contact.id}`}
                className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <span className="font-medium">
                    {contact.first_name} {contact.last_name}
                  </span>
                  {contact.email && (
                    <div className="text-sm text-gray-500">{contact.email}</div>
                  )}
                  {contact.phone && (
                    <div className="text-sm text-gray-500">{contact.phone}</div>
                  )}
                  {contact.company_id && (
                    <div className="text-sm text-gray-500">
                      Company: {contact.company_id}
                    </div>
                  )}
                </div>
              </Link>
            </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No contacts found. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
