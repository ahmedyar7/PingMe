import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.middlewares.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ping-me-q32q.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routers
import { authRouter } from "./src/routes/auth.routes.js";
import { messageRouter } from "./src/routes/messages.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/:catchAll(*)", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Global error handler
app.use(globalErrorHandler);

export { app };
