// src/pages/Signup.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../lib/auth';
import { useAuth } from '../context/AuthContext';

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFields = z.infer<typeof signupSchema>;

export const Signup = () => {
  const navigate = useNavigate();
  const { checkUser } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFields) => {
    try {
      await authService.register(data.email, data.password, data.name);
      await checkUser(); // Refresh global user state
      navigate('/todos');
    } catch (error: any) {
      alert(error.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
        <h2 className="mb-6 text-center text-3xl font-bold text-slate-900">Create Account</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              {...register("name")}
              className={`w-full rounded-lg border p-3 outline-none transition focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-indigo-500'}`}
              placeholder="John Doe"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              {...register("email")}
              className={`w-full rounded-lg border p-3 outline-none transition focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-indigo-500'}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password"
              {...register("password")}
              className={`w-full rounded-lg border p-3 outline-none transition focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-indigo-500'}`}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <button 
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="font-semibold text-indigo-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};