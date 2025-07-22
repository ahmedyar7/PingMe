// globalErrorHandler.js
import { ApiError } from "../utils/ApiError.utils.js";

const globalErrorHandler = (err, req, res, next) => {
  // If the error is an instance of ApiError, use its data; else default
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error("🔥 Global Error Handler:", err);

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [], // optional array
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
