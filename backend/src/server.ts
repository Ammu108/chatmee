import dotenv from 'dotenv';

// Load environment variables FIRST before any other imports
dotenv.config();

import express from 'express';
import router from './routers/router.js';

const app = express();

app.use("/api/auth", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port : ${process.env.PORT}`)
})