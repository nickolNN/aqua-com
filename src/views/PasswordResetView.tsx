import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { usePasswordResetMutation } from '@/api/authApi';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface FormErrors {
  email?: string;
}

export function PasswordResetView() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [passwordResetMutation] = usePasswordResetMutation();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setServerError('');

    try {
      await passwordResetMutation({ email }).unwrap();
      setSuccess(true);
    } catch (err: unknown) {
      const error = err as { message?: string; response?: { data?: { message?: string } } };
      setServerError(error.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Check your email</h2>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ve sent a password reset link to {email}. Please check your email.
        </p>
        <Link to="/login" className="mt-4 text-sm text-blue-600 hover:underline">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {serverError && (
        <div className="rounded-md border border-red-500 bg-red-50 p-3 text-sm text-red-800">
          {serverError}
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send reset link'}
      </Button>
      <p className="text-center text-sm text-gray-600">
        <Link to="/login" className="text-blue-600 hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  );
}
