import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:8000";

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
      const res = await axiosInstance.get("/auth/checkAuth", {
        withCredentials: true,
      });

      set({ authUser: res.data.data });
      socket.connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      set({ isSigningUp: false });
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

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.log(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
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

    // Avoid creating multiple sockets
    if (socket) {
      if (!socket.connected) socket.connect();
      return;
    }

    const newSocket = io(BASE_URL, {
      withCredentials: true,
    });

    // when connected, emit the addUser event
    newSocket.on("connect", () => {
      console.log("Connected to socket:", newSocket.id);
      newSocket.emit("addUser", authUser._id);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket");
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
