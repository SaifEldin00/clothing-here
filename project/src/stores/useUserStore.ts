import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      addToWishlist: (productId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                wishlist: [...state.user.wishlist, productId],
              }
            : null,
        })),
      removeFromWishlist: (productId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                wishlist: state.user.wishlist.filter((id) => id !== productId),
              }
            : null,
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);