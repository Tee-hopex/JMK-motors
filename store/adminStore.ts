"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
  username: string | null;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      username: null,
      isLoggedIn: false,
      login: (username) => set({ username, isLoggedIn: true }),
      logout: () => set({ username: null, isLoggedIn: false }),
    }),
    {
      name: "jmk-admin",
      partialize: (state) => ({ username: state.username, isLoggedIn: state.isLoggedIn }),
    }
  )
);
