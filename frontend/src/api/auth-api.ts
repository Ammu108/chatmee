import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// =================== SignUp API ===================

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export const signupApi = async (formData: SignUpFormData) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, formData, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "sign up failed!";
    throw new Error(errorMessage);
  }
};

// =================== Login API ===================

interface LoginFormData {
  email: string;
  password: string;
}

export const loginApi = async (formData: LoginFormData) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/auth/login`, formData, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "login failed!";
    throw new Error(errorMessage);
  }
};

// =================== Logout API ===================

export const logoutApi = async () => {
  try {
    await axios.post(
      `${BACKEND_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "login failed!";
    throw new Error(errorMessage);
  }
};
