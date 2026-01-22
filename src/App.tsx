// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { TodoPage } from './pages/TodoPage';
import './index.css'

// High-order component to protect routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
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

      {/* Redirect root to todos */}
      <Route path="/" element={<Navigate to="/todos" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}