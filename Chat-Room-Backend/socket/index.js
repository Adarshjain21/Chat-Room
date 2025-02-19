import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import getUserDetailsFromToken from "../helpers/getUserDetailsFromToken.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("User connected", socket.id);

  const token = socket.handshake.auth.token;

  const user = await getUserDetailsFromToken(token);

  socket.join(user?._id);
  onlineUser.add(user?._id);

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("User disconnected", socket.id);
  });
});

export { app, server };
