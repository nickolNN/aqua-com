import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCreateCompanyMutation, useGetCompanyQuery, useUpdateCompanyMutation } from '@/api/companiesApi';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/Select';

interface FormErrors {
  name?: string;
}

export function CompanyForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const isEdit = !!id && id !== 'new';

  const [errors, setErrors] = useState<FormErrors>({});
  const [createCompany] = useCreateCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();

  const [formData, setFormData] = useState({
    name: isNew ? '' : 'Acme Corporation',
    industry: '',
    website: '',
    address: '',
  });

  const companyIdRef = useRef(id);
  const companyResult = useGetCompanyQuery(companyIdRef.current as string, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    companyIdRef.current = id;
  }, [id]);

  useEffect(() => {
    if (isEdit && id && companyResult.data) {
      const company = companyResult.data;
      if (company) {
        setFormData({
          name: company.name || '',
          industry: company.industry || '',
          website: company.website || '',
          address: company.address || '',
        });
      }
    }
  }, [isEdit, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value && errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name?.trim()) {
      newErrors.name = 'Company name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (isEdit && id) {
        await updateCompany({ id, data: formData }).unwrap();
        navigate('/companies');
      } else {
        await createCompany(formData).unwrap();
        navigate('/companies');
      }
    } catch (err) {
      console.error('Failed to save company:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isEdit ? 'Edit Company' : 'Create Company'}
        </h1>
        <Link
          to={isEdit ? `/companies/${id}` : '/companies'}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Cancel
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Company' : 'Create Company'}</CardTitle>
          <CardDescription>Company details and information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Company Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium mb-1">
                  Industry
                </label>
                <Select value={formData.industry} onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Select industry...</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium mb-1">
                  Website
                </label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex gap-4">
            <Button type="submit">
              {isEdit ? 'Update Company' : 'Create Company'}
            </Button>
            <Link
              to={isEdit ? `/companies/${id}` : '/companies'}
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
