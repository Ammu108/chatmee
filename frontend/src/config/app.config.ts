interface AppConfig {
  BackendURL: string;
}

export const AppConfig: AppConfig = {
  BackendURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5001",
};

export const TOAST_THEME = "dark";
