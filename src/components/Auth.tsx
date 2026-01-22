// src/components/Auth.tsx
import type React from 'react';
import { useState } from 'react';
import { authService } from '../lib/auth';

export const Auth = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await authService.login(email, password);
      } else {
        await authService.register(email, password, name);
      }
      onAuthSuccess();
    } catch (error) {
      alert('Authentication failed. Please check your credentials.');
    }
  };

  const toggleAuthMode = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-xl rounded-lg w-96 border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {!isLogin && (
          <input
            className="w-full p-2 mb-4 border rounded"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          className="w-full p-2 mb-4 border rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 mb-6 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* FIX 1: Explicitly set type="submit" */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>

        {/* FIX 2: Changed <p> to <button type="button"> for accessibility */}
        <button
          type="button"
          className="mt-4 w-full text-sm text-center text-gray-600 cursor-pointer hover:underline bg-transparent border-none"
          onClick={toggleAuthMode}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
};
