const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// =================== SignUp API ===================

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export const signupApi = async (formData: SignUpFormData) => {
  const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "signup failed");
  }

  return data;
};

// =================== Login API ===================

interface LoginFormData {
  email: string;
  password: string;
}

export const loginApi = async (formData: LoginFormData) => {
  const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "login failed");
  }

  return data;
};

// =================== Logout API ===================

export const logoutApi = async () => {
  const res = await fetch(`${BACKEND_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("logout failed");
  }

  return res.json();
};
