import { type Models } from 'appwrite';
import * as z from 'zod';
import { loginSchema, signupSchema } from '../validations';

export type SignupFields = z.infer<typeof signupSchema>;
export type LoginFields = z.infer<typeof loginSchema>;
export interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  checkUser: () => Promise<void>;
  logout: () => Promise<void>;
}
