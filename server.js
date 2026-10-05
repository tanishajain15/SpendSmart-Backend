import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import incomeRouter from './routes/incomeRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';

const app = express();
const port = 4000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// ROUTES

app.use("/api/user", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/dashboard", dashboardRouter);

app.get('/', (req, res) => {
    res.send("API WORKING");
});

// Vercel runs this file as a serverless function, so it must NOT call listen().
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server Started on http://localhost:${port}`);
    });
}

export default app;
