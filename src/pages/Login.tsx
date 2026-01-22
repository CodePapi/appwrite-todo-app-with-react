// src/pages/Login.tsx
import type React from 'react';
import { useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../lib/auth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { checkUser } = useAuth();

  // Create unique IDs for form accessibility
  const emailId = useId();
  const passwordId = useId();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login(email, password);
      await checkUser();
      navigate('/todos');
    } catch (error) {
      alert('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
        <h2 className="mb-6 text-center text-3xl font-bold text-slate-900">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            {/* Visually hidden label for accessibility */}
            <label htmlFor={emailId} className="sr-only">
              Email Address
            </label>
            <input
              id={emailId}
              type="email"
              required
              placeholder="Email Address"
              className="w-full rounded-lg border border-slate-200 p-3 outline-none transition focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            {/* Visually hidden label for accessibility */}
            <label htmlFor={passwordId} className="sr-only">
              Password
            </label>
            <input
              id={passwordId}
              type="password"
              required
              placeholder="Password"
              className="w-full rounded-lg border border-slate-200 p-3 outline-none transition focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit" // FIX: Explicitly set button type
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          New here?{' '}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};
