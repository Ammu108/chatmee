import axios from "axios";
import { axiosInstance } from "../lib/utils";

// =================== Verifying Username API ===================

export const checkUsernameAPI = async (username: string) => {
  try {
    const res = await axiosInstance.get(`/auth/checkusername`, {
      params: { username },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Error in varifying the username!";
    throw new Error(errorMessage);
  }
};

// =================== Searching Users API ===================

export const searchUsersApi = async (username: string) => {
  try {
    const res = await axiosInstance.get(`/auth/checkusers`, {
      params: { username },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Users not found!";
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

// =================== Send Messages Between Two Users ===================

// interface SendMessagePayload {
//   receiverId: string;
//   content: string;
// }

export const sendMessagesApi = async (receiverId: string, content: string) => {
  try {
    const res = await axiosInstance.post(
      `/auth/messages`,
      { receiverId, content },
      {
        withCredentials: true,
      },
    );

    return res.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Sending the messages failed!";
    throw new Error(errorMessage);
  }
};

// =================== Fetching Messages Between Two Users ===================

export const fetchMessagesApi = async (receiverId: string) => {
  try {
    const res = await axiosInstance.get(`auth/fetch/${receiverId}`, { withCredentials: true });

    return res.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Fetching the messages failed!";
    throw new Error(errorMessage);
  }
};
