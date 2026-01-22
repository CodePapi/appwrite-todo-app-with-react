import { Link } from 'react-router-dom';
import { LoginForm } from '../components';

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
        <h2 className="mb-6 text-center text-3xl font-bold text-slate-900">
          Welcome Back
        </h2>

        <LoginForm />

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
