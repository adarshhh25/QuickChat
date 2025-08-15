import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import {connectDB} from "./lib/db.js";
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import {Server} from "socket.io";

dotenv.config();

//Create Express App
const app = express();
const server = http.createServer(app);

//Initialize socket.io server
export const io = new Server(server, {
   cors: {origin: "*"}
})

//Store Online users
export const userSocketMap = {}  // {userId: socketId}

//Socket.io connection handler
io.on("connection", (socket) => {
   const userId = socket.handshake.query.userId;
   console.log("User Connected", userId);

   if(userId) userSocketMap[userId] = socket.id;

   //Emit online users to all connected clients
   io.emit("getOnlineUsers", Object.keys(userSocketMap));

   socket.on("disconnect", () => {
      console.log("User Disconnected", userId);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
   })
})

// Middleware Setup
app.use(cors());
app.use(express.json({limit: "5mb"}));

//Routes Setup
app.get("/api/status", (req, res) => {
   res.send("Server is Live")
});
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter)

// Connect to Database
await connectDB()

// app.listen(process.env.PORT || 3000, () => {
//    console.log(`Server is running on port ${process.env.PORT || 3000}`);
// });

if(process.env.NODE_ENV != "production") {
   const PORT = process.env.PORT || 5000
   server.listen(PORT, () => {
   console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
}
//Vercel for Server
export default server;
