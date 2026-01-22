import { type Models } from 'appwrite';
import type React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { authService } from '../lib/auth';

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  checkUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  // FIX 1: Wrap checkUser in useCallback
  // This memoizes the function so it doesn't change on every render
  const checkUser = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // FIX 2: Add checkUser to the dependency array
  // Now it's safe because useCallback ensures the reference is stable
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <AuthContext.Provider value={{ user, loading, checkUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
