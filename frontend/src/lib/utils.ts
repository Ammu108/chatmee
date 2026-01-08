import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});
