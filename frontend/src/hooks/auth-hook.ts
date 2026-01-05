import { useState } from "react";
import { toast } from "react-toastify";
import { loginApi, logoutApi, signupApi } from "../api/auth-api";
import { useAuthState } from "../store/auth-store";

// =================== SignUp Hook ===================

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthState((state) => state.setUser);

  const signup = async (formData: SignUpFormData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signupApi(formData);

      console.log("sign up respone :", data);

      if (!data) {
        throw new Error("Sign up failed");
      }

      setUser(data.user);
      toast.success("Account Created Successfully!");
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "sign up failed!";
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};

// =================== Login Logout ===================

interface LoginFormData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthState((state) => state.setUser);

  const login = async (formData: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginApi(formData);

      console.log("Full resoonse : ", data);

      if (!data) {
        throw new Error("Login failed!");
      }

      setUser(data.user);
      toast.success("Login Successfully! Welcome back.");
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "login failed!";
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

// =================== Logout Hook ===================

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthState((state) => state.setUser);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await logoutApi();

      setUser(null);
      toast.success("logout successfully!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "logout failed!";
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
};
