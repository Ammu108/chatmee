import axios from "axios";
import { axiosInstance } from "../lib/utils";

export const findUserByEmailApi = async (email: string) => {
  try {
    const res = await axiosInstance.get(`/auth/search`, {
      params: { email },
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
