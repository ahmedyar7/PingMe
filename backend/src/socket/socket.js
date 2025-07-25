import { Server } from "socket.io";
import http from "http";

let io; // define at module scope so you can export

const userSocketMap = {}; // { userId: socketId }

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("addUser", (userId) => {
      userSocketMap[userId] = socket.id;
      console.log("📌 Mapped user:", userId, "to socket:", socket.id);
    });

    socket.on("disconnect", () => {
      // Optionally remove the user from map
      for (const [userId, id] of Object.entries(userSocketMap)) {
        if (id === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
      console.log("❌ User disconnected:", socket.id);
    });
  });
}

// helper to get receiver socketId
function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { initSocket, getReceiverSocketId, userSocketMap };
