import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '../hooks';
import { type LoginFields } from '../types';
import { loginSchema } from '../validations';

export const LoginForm = () => {
  const { handleLogin } = useAuthActions();
  const emailId = useId();
  const passwordId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
      <div>
        <label
          htmlFor={emailId}
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Email Address
        </label>
        <input
          id={emailId}
          type="email"
          {...register('email')}
          placeholder="you@example.com"
          className={`w-full rounded-lg border p-3 outline-none transition focus:ring-2 ${
            errors.email
              ? 'border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:ring-indigo-500'
          }`}
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
          placeholder="••••••••"
          className={`w-full rounded-lg border p-3 outline-none transition focus:ring-2 ${
            errors.password
              ? 'border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:ring-indigo-500'
          }`}
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
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};
