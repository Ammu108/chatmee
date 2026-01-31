import { useEffect } from "react";
import { useAuthState } from "../store/auth-store";
import socket from "./socket";

const SocketEffect = () => {
  const user = useAuthState((s) => s.user);

  useEffect(() => {
    if (user) {
      socket.connect();
      console.log("A user is connected is after login.");
    } else {
      socket.disconnect();
      console.log("A user is disconnected.");
    }

    return () => {
      socket.off();
    };
  }, [user]);

  return null;
};

export default SocketEffect;
