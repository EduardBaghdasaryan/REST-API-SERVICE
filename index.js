import express from "express";
import cors from "cors";
import helmet from "helmet";
import { port, allowedOrigin } from "./env.dev.js"

import upload from "./middlewares/multerConfig.js";

import authRouter from './routes/auth.routes.js';
import fileRouter from "./routes/file.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

const corsOptions = {
    origin: allowedOrigin
};

app.use(helmet());
app.use(cors(corsOptions));

app.use('/api/file', upload.single('file'))


app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/file', fileRouter);
app.use('/api', userRouter);




app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});