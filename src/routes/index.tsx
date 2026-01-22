import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { SignupPage } from './SignupPage';
import { TodoPage } from './TodoPage';

import { TodoProvider, useAuth } from '../context';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <TodoProvider>
              <TodoPage />
            </TodoProvider>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/todos" />} />
    </Routes>
  );
}
