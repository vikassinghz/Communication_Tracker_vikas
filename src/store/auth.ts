import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  login: (username: string, password: string, role: 'admin' | 'user') => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (username: string, password: string, role: 'admin' | 'user') => {
    // Mock authentication
    if (role === 'admin' && username === 'admin' && password === 'admin123') {
      set({ user: { id: '1', username: 'admin', role: 'admin' } });
    } else if (role === 'user' && username === 'user' && password === 'user123') {
      set({ user: { id: '2', username: 'user', role: 'user' } });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => set({ user: null }),
}));