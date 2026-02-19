import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { Server } from "socket.io";

import DbConnection from "./db/DbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import AdminBookingRoutes from "./routes/AdminBookingRoutes.js"
import userBookingRoutes from "./routes/UserbookingRoutes.js"
import AdminEventRoutes from "./routes/AdminEventRoutes.js"



const app = express();


app.use(cors());
app.use(express.json());


const server = http.createServer(app);


export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});


app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/user/booking", userBookingRoutes)
app.use("/api/AdminEvent", AdminEventRoutes);
app.use("/api/AdminBooking", AdminBookingRoutes);


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  DbConnection();
  console.log(` Server running on port ${PORT}`);
});
