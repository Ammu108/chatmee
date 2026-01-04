import cors from "cors";
import dotenv from "dotenv";

// Load environment variables FIRST before any other imports
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import router from "./routers/router.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
