import { useEffect } from "react";
import { useAuthState } from "../store/auth-store";
import { socket } from "./socket";

export const SocketEffect = () => {
  const user = useAuthState((s) => s.user);

  useEffect(() => {
    const handleOnlineUsers = (userIds: string[]) => {
      useAuthState.getState().setOnlineUsers(userIds);
    };

    if (user && !socket.connected) {
      socket.io.opts.query = { userId: user.id };

      socket.connect();
      console.log("A user is coneect after login.");

      socket.on("online-users", handleOnlineUsers);
    } else {
      socket.disconnect();
      console.log("A user is disconnected ( logout ).");
    }

    return () => {
      socket.off("online-users", handleOnlineUsers);
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [user]);

  return null;
};
