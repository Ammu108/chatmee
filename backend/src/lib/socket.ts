import http from "node:http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap: { [key: string]: string } = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log("A user is connected: ", socket.id);

  const userID = socket.handshake.query.userId as string;
  console.log(`User connected: ${userID} with socket: ${socket.id}`);

  if (userID) userSocketMap[userID] = socket.id;

  // it is to send event to all the connected clients
  io.emit("online-users", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user is disconnected: ", socket.id);
    delete userSocketMap[userID];
    io.emit("online-users", Object.keys(userSocketMap));
  });
});

export { app, io, server };
