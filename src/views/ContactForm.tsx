import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCreateContactMutation, useGetContactQuery, useUpdateContactMutation } from '@/api/contactsApi';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  company_id?: string;
}

export function ContactForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const isEdit = !!id && id !== 'new';

  const [errors, setErrors] = useState<FormErrors>({});
  const [createContact, { isLoading: isCreating }] = useCreateContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const [formData, setFormData] = useState({
    first_name: isNew ? '' : 'John',
    last_name: isNew ? '' : 'Doe',
    email: isNew ? '' : 'john.doe@example.com',
    phone: '',
    company_id: '',
  });

  // Call RTK Query hook unconditionally at top level
  const idRef = useRef(id);
  const contactResult = useGetContactQuery(idRef.current as string, {
    refetchOnMountOrArgChange: true,
  });

  // Update ref when ID changes (triggers re-fetch)
  useEffect(() => {
    idRef.current = id;
  }, [id]);

  // Load existing contact data when editing
  useEffect(() => {
    if (isEdit && id && contactResult.data) {
      const contact = contactResult.data;
      if (contact) {
        setFormData({
          first_name: contact.first_name || '',
          last_name: contact.last_name || '',
          email: contact.email || '',
          phone: contact.phone || '',
          company_id: contact.company_id || '',
        });
      }
    }
  }, [isEdit, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value && errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.first_name?.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!formData.last_name?.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (isEdit && id) {
        await updateContact({ id, data: formData }).unwrap();
      } else {
        await createContact(formData).unwrap();
      }
    } catch (err) {
      console.error('Failed to save contact:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isEdit ? 'Edit Contact' : 'Create Contact'}
        </h1>
        <Link
          to={isEdit ? `/contacts/${id}` : '/contacts'}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Cancel
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Contact' : 'Create Contact'}</CardTitle>
          <CardDescription>Contact details and information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className={errors.first_name ? 'border-destructive' : ''}
                />
                {errors.first_name && (
                  <p className="text-xs text-destructive mt-1">{errors.first_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className={errors.last_name ? 'border-destructive' : ''}
                />
                {errors.last_name && (
                  <p className="text-xs text-destructive mt-1">{errors.last_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="company_id" className="block text-sm font-medium mb-1">
                  Company ID
                </label>
                <Input
                  id="company_id"
                  name="company_id"
                  type="text"
                  value={formData.company_id}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex gap-4">
            <Button type="submit" disabled={isCreating}>
              {isCreating ? 'Saving...' : (isEdit ? 'Update Contact' : 'Create Contact')}
            </Button>
            <Link
              to={isEdit ? `/contacts/${id}` : '/contacts'}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
