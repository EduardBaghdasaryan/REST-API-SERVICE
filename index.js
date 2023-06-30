import express from "express";
import cors from "cors";
import helmet from "helmet";
import { port, allowedOrigin } from "./env.dev.js"

import authRouter from './routes/auth.routes.js';

const app = express();

const corsOptions = {
    origin: allowedOrigin
};

app.use(helmet());
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/auth', authRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});