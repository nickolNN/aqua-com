import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCreateContactMutation } from '@/api/contactsApi';

export function ContactForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const [createContact, { isSuccess, isLoading }] = useCreateContactMutation();

  const [formData, setFormData] = useState({
    first_name: isEdit ? 'John' : '',
    last_name: isEdit ? 'Doe' : '',
    email: isEdit ? 'john.doe@example.com' : '',
    phone: '',
    company_id: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createContact(formData).unwrap();
      if (isEdit) {
        navigate(`/contacts/${id}`);
      } else {
        navigate('/contacts');
      }
    } catch (err) {
      console.error('Failed to save contact:', err);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="text-green-500">
          Contact {isEdit ? 'updated' : 'created'} successfully!
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isEdit ? 'Edit Contact' : 'Create Contact'}
        </h1>
        <Link
          to={isEdit ? `/contacts/${id}` : '/contacts'}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded-md p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium mb-1">
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium mb-1">
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="company_id" className="block text-sm font-medium mb-1">
              Company ID
            </label>
            <input
              id="company_id"
              name="company_id"
              type="text"
              value={formData.company_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : (isEdit ? 'Update Contact' : 'Create Contact')}
          </button>
          <Link
            to={isEdit ? `/contacts/${id}` : '/contacts'}
            className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
