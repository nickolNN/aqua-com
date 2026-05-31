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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contact Details</h1>
        <Link
          to="/contacts"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Back to contacts
        </Link>
      </div>

      {/* Contact Info */}
      <div className="bg-white border rounded-md p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
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

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Link
            to={`/contacts/${id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Edit Contact
          </Link>
          <Link
            to="/contacts"
            className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
          >
            Back to contacts
          </Link>
        </div>
      </div>
    </div>
  );
}
