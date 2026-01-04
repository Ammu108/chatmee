import { loginApi, logoutApi, signupApi } from "../api/auth-api";

// =================== SignUp Hook ===================

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const signup = async (formData: SignUpFormData) => {
    try {
      const data = await signupApi(formData);

      console.log("sign up respone :", data);

      if (!data || !data.data) {
        throw new Error("Sign up failed");
      }
      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
      } else {
        console.log("token not found.");
        throw new Error("Token not found in response");
      }
      localStorage.setItem("user", JSON.stringify(data.data.user));

      return data.data;
    } catch (error) {
      console.log("sign up failed bro :", error);
      throw error;
    }
  };
  return { signup };
};

// =================== Login Logout ===================

interface LoginFormData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const login = async (formData: LoginFormData) => {
    try {
      const data = await loginApi(formData);

      console.log("Full resoonse : ", data);

      if (!data || !data.data) {
        throw new Error("Login failed");
      }
      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
      } else {
        console.log("token not found.");
        throw new Error("Token not found in response");
      }
      localStorage.setItem("user", JSON.stringify(data.data.user));

      return data.data;
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  };

  return { login };
};

// =================== Logout Hook ===================

export const useLogout = () => {
  const logout = async () => {
    try {
      const data = await logoutApi();
      console.log("Backend response :", data);
      console.log("backend message :", data.message);
    } catch (error) {
      console.log("error : ", error);
      throw error;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return { logout };
};
