import { Server } from "socket.io";

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

      // emit updated online users to everyone
      io.emit("onlineUsers", Object.keys(userSocketMap));
    });

    socket.on("disconnect", () => {
      let disconnectedUserId = null;

      // remove userId from map
      for (const [userId, id] of Object.entries(userSocketMap)) {
        if (id === socket.id) {
          disconnectedUserId = userId;
          delete userSocketMap[userId];
          break;
        }
      }

      console.log("❌ User disconnected:", socket.id);

      // emit updated online users to everyone
      io.emit("onlineUsers", Object.keys(userSocketMap));
    });
  });
}

// helper to get receiver socketId
function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { initSocket, getReceiverSocketId, userSocketMap };
