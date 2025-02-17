import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Server is Running",
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
