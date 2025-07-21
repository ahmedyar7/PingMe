import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

console.log("✅ Origin: ", process.env.CORS_ORIGIN);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Auth Router
import { authRouter } from "./src/routes/auth.routes.js";
app.use("/api/v1/auth", authRouter);

// Message Router
import { messageRouter } from "./src/routes/messages.routes.js";
app.use("/api/v1/message", messageRouter);

export { app };
