// src/lib/auth.ts
import { account, ID } from './appwrite';

export const authService = {
  // Create user and then immediately create a session
  async register(email: string, pass: string, name: string) {
    await account.create(ID.unique(), email, pass, name);
    return this.login(email, pass);
  },

  async login(email: string, pass: string) {
    return await account.createEmailPasswordSession(email, pass);
  },

  async logout() {
    return await account.deleteSession('current');
  },

  async getCurrentUser() {
    try {
      return await account.get();
    } catch {
      return null;
    }
  }
};