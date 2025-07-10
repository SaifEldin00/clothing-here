import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  language: 'en' | 'ar';
  theme: 'light' | 'dark';
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  setLanguage: (language: 'en' | 'ar') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'light',
      mobileMenuOpen: false,
      searchOpen: false,
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
    }),
    {
      name: 'ui-storage',
    }
  )
);