import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import {app, server, io} from "./socket/index.js"
dotenv.config();

// const app = express();

app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: true, // If you use cookies, set this to false when origin is "*"
  })
);
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  req.io = io;
  next();
});

const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
  response.json({
    message: "Server is Running",
  });
});

app.use("/api", router);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
