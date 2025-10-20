import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  userEmail: string | null;
  userId: string | null;
  setUser: (email: string, userId: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userEmail: null,
      userId: null,
      setUser: (email, userId) => set({ userEmail: email, userId }),
      clearAuth: () => set({ userEmail: null, userId: null }),
    }),
    { name: "auth-store" }
  )
);
