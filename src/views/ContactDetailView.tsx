import { useParams, Link } from 'react-router-dom';
import { useGetContactQuery } from '@/api/contactsApi';

export function ContactDetailView() {
  const { id } = useParams<{ id: string }>();

  const { data: contact, isLoading, error } = useGetContactQuery(id || '');

  if (isLoading) {
    return <div className="p-6">Loading contact details...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">Error: {typeof error === 'string' ? error : 'Failed to load contact'}</div>
        <Link to="/contacts" className="text-blue-600">Back to contacts</Link>
      </div>
    );
  }

  if (!contact) {
    return <div className="p-6">Contact not found.</div>;
  }

 return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center">
        <Link to="/contacts" className="text-blue-600 hover:text-blue-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="ml-3 text-2xl font-bold">Contact Details</h1>
        <div className="flex-1" />
        <Link
          to={`/contacts/${id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Edit Contact
        </Link>
      </div>

      {/* Contact Info */}
      <div className="bg-white border rounded-md p-6">
        <div className="mb-6">
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Name</dt>
              <dd className="text-base">
                {contact.first_name} {contact.last_name}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Email</dt>
              <dd className="text-base">{contact.email || 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Phone</dt>
              <dd className="text-base">{contact.phone || 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Company</dt>
              <dd className="text-base">{contact.company_id || 'N/A'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
