import { useState } from "react";
import { findUserByEmailApi } from "../api/user-api";

// =================== SignUp Hook ===================

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
