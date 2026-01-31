import { io } from "socket.io-client";
import { AppConfig } from "../config/app.config";

const BACKEND_URL = AppConfig.BackendURL;
const socket = io(BACKEND_URL, { autoConnect: false });

export default socket;
