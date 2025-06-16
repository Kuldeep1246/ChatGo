import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import Authrouter from "./src/routes/auth.route.js";
import MessageRouter from "./src/routes/message.route.js";
import { connectDb } from "./src/lib/db.js";
import { app, server } from "./src/lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/api/auth",Authrouter);
app.use("/api/messages", MessageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDb()
});
