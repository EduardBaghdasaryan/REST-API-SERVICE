import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

const corsOptions = {
    origin: allowedOrigin
};

app.use(helmet());
app.use(cors(corsOptions));


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});