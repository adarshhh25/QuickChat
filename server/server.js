import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import {connectDB} from "./lib/db.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json({limit: "5mb"}));

app.get("/api/status", (req, res) => {
   res.send("Server is Live")
})

await connectDB()

app.listen(process.env.PORT || 3000, () => {
   console.log(`Server is running on port ${process.env.PORT || 3000}`);
});