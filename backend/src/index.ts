import express, { Express, Response, Request, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth";
import bucketRoute from "./routes/bucket"
import recordRoute from "./routes/record"
import aiRoute from "./routes/ai"

dotenv.config();
const app: Express = express();

const port = process.env.PORT!;

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://smart-tracker-one.vercel.app/',
    process.env.CLIENT_URL!
  ],
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRoute);
app.use('/bucket', bucketRoute)
app.use('/records', recordRoute)
app.use('/ai', aiRoute)

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})