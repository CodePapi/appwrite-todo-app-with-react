import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react'; // Added for stable unique IDs
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import { authService } from '../lib/auth';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignupFields = z.infer<typeof signupSchema>;

export const Signup = () => {
  const navigate = useNavigate();
  const { checkUser } = useAuth();

  // Create unique IDs for accessibility
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

  const onSubmit = async (data: SignupFields) => {
    try {
      await authService.register(data.email, data.password, data.name);
      await checkUser();
      navigate('/todos');
    } catch (error) {
      // FIX 1: Removed :any and handled the unknown error safely
      const message =
        error instanceof Error ? error.message : 'Registration failed';
      alert(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
        <h2 className="mb-6 text-center text-3xl font-bold text-slate-900">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            {/* FIX 2: Associated label with input using htmlFor */}
            <label
              htmlFor={nameId}
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Full Name
            </label>
            <input
              id={nameId} // Associated ID
              {...register('name')}
              className={`w-full rounded-lg border p-3 outline-none transition focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-indigo-500'}`}
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
              className={`w-full rounded-lg border p-3 outline-none transition focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-indigo-500'}`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
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
              className={`w-full rounded-lg border p-3 outline-none transition focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-indigo-500'}`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* FIX 3: Explicitly set type="submit" */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
