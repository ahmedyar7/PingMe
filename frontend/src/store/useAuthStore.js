import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:8000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogginIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [], // you’ll fill this later with real data
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data.data });
      get().connectSocket();
    } catch (error) {
      console.log("User not logged in yet (expected on first load)");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");

      // ✅ Now fetch logged-in user info from backend
      await get().checkAuth();

      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      await axiosInstance.post("/auth/login", data);
      toast.success("Logged in successfully");

      // ✅ Fetch user info
      await get().checkAuth();

      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.log(error.response?.data?.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
      // ❌ remove navigate("/login");
      // Component will handle navigation after logout
    } catch (error) {
      console.log("error logging out", error);
    }
  },

  updateProfilePicture: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      console.log("⚡ Calling backend to update profile...");
      const res = await axiosInstance.patch(
        "/auth/updateProfilePicture",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data.data);
      set({ authUser: res.data.data });
      toast.success(res.data.message || "Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser) return;

    if (socket) {
      if (!socket.connected) socket.connect();
      return;
    }

    const newSocket = io(BASE_URL, { withCredentials: true });

    newSocket.on("connect", () => {
      console.log("Connected to socket:", newSocket.id);
      newSocket.emit("addUser", authUser._id);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    // 🧩 Listen and add online users to the array
    newSocket.on("onlineUsers", (users) => {
      console.log("📡 Received online users:", users);
      // here, `users` is the array from the server
      set({ onlineUsers: users });
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      console.log("👋 Socket disconnected manually");
      set({ socket: null }); // clear socket from store
    }
  },
}));
