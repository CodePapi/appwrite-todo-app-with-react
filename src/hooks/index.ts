import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../lib/auth';
import { type SignupFields } from '../types';
import { type LoginFields } from '../types';

export const useAuthActions = () => {
  const navigate = useNavigate();
  const { checkUser } = useAuth();

  const handleSignup = async (data: SignupFields) => {
    try {
      await authService.register(data.email, data.password, data.name);
      await checkUser();
      navigate('/todos');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Registration failed';
      alert(message);
    }
  };

  const handleLogin = async (data: LoginFields) => {
    try {
      await authService.login(data.email, data.password);
      await checkUser();
      navigate('/todos');
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return { handleSignup, handleLogin };
};
