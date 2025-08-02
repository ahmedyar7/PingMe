import "dotenv/config";
import { connectDb } from "./src/database/connectDb.database.js";
import { app } from "./app.js";
import http from "http";
import { initSocket } from "./src/socket/socket.js";

const server = http.createServer(app); // create HTTP server

// Initialize socket.io
initSocket(server);

// Connect DB and start server
connectDb()
  .then(() => {
    server.listen(process.env.PORT || 3000, () => {
      console.log(
        `✅ Server running on http://localhost:${process.env.PORT || 3000}`
      );
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err);
  });
