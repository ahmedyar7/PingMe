import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.middlewares.js";

const app = express();

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

app.use(globalErrorHandler);
export { app };
