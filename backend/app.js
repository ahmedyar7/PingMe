import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.middlewares.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Auth Router
import { authRouter } from "./src/routes/auth.routes.js";
app.use("/api/v1/auth", authRouter);

// Message Router
import { messageRouter } from "./src/routes/messages.routes.js";
app.use("/api/v1/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use(globalErrorHandler);
export { app };
