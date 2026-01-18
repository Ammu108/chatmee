import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import { app, server } from "./lib/socket.js";
import router from "./routers/router.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "http://192.168.1.16:5173",
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
