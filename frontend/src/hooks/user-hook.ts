import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { findReceiverDetailsApi, findUserByEmailApi } from "../api/user-api";

// =================== Finding User Hook ===================

export interface UserData {
  message: string;
  searchedUser: {
    id: string;
    email: string;
    username: string;
  } | null;
  loading: boolean;
  error: string | null;
}

export const useFindUserByEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<UserData | null>(null);

  const findUserByEmail = async (email: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await findUserByEmailApi(email);

      console.log("finding users from db :", result);

      if (!result) {
        throw new Error("cannot find the user");
      }

      setData(result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "error in finding users!";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { findUserByEmail, data, loading, error };
};

// =================== Getting Receiver Details ===================

interface ReceiverDetailsProps {
  message: string;
  receiverData: {
    id: string;
    username: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
}

export const useReceiverDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReceiverDetailsProps | null>(null);

  const getReceiverDetails = useCallback(async (receiverId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await findReceiverDetailsApi(receiverId);

      console.log("fetching receiver details: ", result);

      if (!result) {
        throw new Error("fetching user detials failed!");
      }
      setData(result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "fetching details failed!";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);
  return { getReceiverDetails, data, loading, error };
};
