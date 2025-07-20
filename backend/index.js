import "dotenv/config";

import express from "express";

const app = express();

// Authntication
import { authRoutes } from "./src/routes/auth.routes.js";
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 8000, (req, res) => {
  console.log(`✅ Server is Running on http://localhost:${process.env.PORT}`);
});
