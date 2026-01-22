import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '../hooks';
import { type SignupFields } from '../types';
import { signupSchema } from '../validations';

export const SignupForm = () => {
  const { handleSignup } = useAuthActions();

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
      <div>
        <label
          htmlFor={nameId}
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Full Name
        </label>
        <input
          id={nameId}
          {...register('name')}
          className={`w-full rounded-lg border p-3 outline-none transition focus:ring-2 ${
            errors.name
              ? 'border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:ring-indigo-500'
          }`}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor={emailId}
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Email
        </label>
        <input
          id={emailId}
          type="email"
          {...register('email')}
          className={`w-full rounded-lg border p-3 outline-none transition focus:ring-2 ${
            errors.email
              ? 'border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:ring-indigo-500'
          }`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor={passwordId}
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Password
        </label>
        <input
          id={passwordId}
          type="password"
          {...register('password')}
          className={`w-full rounded-lg border p-3 outline-none transition focus:ring-2 ${
            errors.password
              ? 'border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:ring-indigo-500'
          }`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:bg-indigo-400"
      >
        {isSubmitting ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
};
