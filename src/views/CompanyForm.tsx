import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCreateCompanyMutation } from '@/api/companiesApi';

export function CompanyForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const [createCompany, { isSuccess, isLoading }] = useCreateCompanyMutation();

  const [formData, setFormData] = useState({
     name: isEdit ? 'Acme Corporation' : '',
     industry: '',
     website: '',
     address: '',
   });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createCompany(formData).unwrap();
      if (isEdit) {
        navigate(`/companies/${id}`);
      } else {
        navigate('/companies');
      }
    } catch (err) {
      console.error('Failed to save company:', err);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="text-green-500">
          Company {isEdit ? 'updated' : 'created'} successfully!
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isEdit ? 'Edit Company' : 'Create Company'}
        </h1>
        <Link
          to={isEdit ? `/companies/${id}` : '/companies'}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded-md p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium mb-1">
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select industry...</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
            </select>
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium mb-1">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
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
            {isLoading ? 'Saving...' : (isEdit ? 'Update Company' : 'Create Company')}
          </button>
          <Link
            to={isEdit ? `/companies/${id}` : '/companies'}
            className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
