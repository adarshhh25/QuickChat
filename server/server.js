import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import {connectDB} from "./lib/db.js";
import userRouter from './routes/userRoutes.js';

dotenv.config();

//Create Express App
const app = express();
const server = http.createServer(app);

// Middleware Setup
app.use(cors());
app.use(express.json({limit: "5mb"}));

//Routes Setup
app.get("/api/status", (req, res) => {
   res.send("Server is Live")
});
app.use("/api/auth", userRouter);

// Connect to Database
await connectDB()

app.listen(process.env.PORT || 3000, () => {
   console.log(`Server is running on port ${process.env.PORT || 3000}`);
});