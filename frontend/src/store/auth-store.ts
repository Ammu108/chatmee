import axios from "axios";
import { create } from "zustand";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// =================== Active tab state management ===================

type AuthFormTab = "login" | "signup";

interface AuthFormTabState {
  AuthFormActiveTab: AuthFormTab;
  setAuthFormActiveTab: (tab: string) => void;
}

export const useAuthFormStore = create<AuthFormTabState>((set) => ({
  AuthFormActiveTab: "signup",
  setAuthFormActiveTab: (tab) => {
    if (tab === "login" || tab === "signup") {
      set({ AuthFormActiveTab: tab });
    }
  },
}));

// =================== Check user is authenticated ===================

interface User {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthState = create<AuthState>((set) => ({
  user: null,
  loading: true,

  checkAuth: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/auth/me`, {
        withCredentials: true,
      });

      set({ user: res.data.user, loading: false });
    } catch (error) {
      console.log("Error checking auth:", error);
      set({ user: null, loading: false });
    }
  },

  setUser: (user) => set({ user }),
}));
