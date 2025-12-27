import dotenv from 'dotenv';

// Load environment variables FIRST before any other imports
dotenv.config();

import express from 'express';
import router from './routers/router.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port : ${process.env.PORT}`)
})