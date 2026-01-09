import axios from "axios";
import { axiosInstance } from "../lib/utils";

// =================== Searching Users API ===================

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

// =================== Fetching Receiver Detail Based On Their ID ===================

export const findReceiverDetailsApi = async (receiverid: string) => {
  try {
    const res = await axiosInstance.get(`/auth/chat/${receiverid}`, { withCredentials: true });

    return res.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "finding receiver details failed!";
    throw new Error(errorMessage);
  }
};
