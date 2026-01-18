import { io, type Socket } from "socket.io-client";
import { BACKEND_URL } from "./utils";

const SOCKET_URL = BACKEND_URL;

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});
