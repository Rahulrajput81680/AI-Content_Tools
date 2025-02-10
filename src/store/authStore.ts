import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      phone: '+91 9876543210',
      bookings: [],
    };
    set({ user: mockUser, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  register: async (name: string, email: string, password: string, phone: string) => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      name,
      email,
      phone,
      bookings: [],
    };
    set({ user: mockUser, isAuthenticated: true });
  },
}));