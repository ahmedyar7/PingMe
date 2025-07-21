import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogginIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true, // ✅ rename to match below

  checkAuth: async () => {
    try {
      const authCheck = await axiosInstance.get("/v1/auth/checkAuth");
      set({ authUser: authCheck.data });
    } catch (error) {
      console.log("Error in checkAuth UseAuthStore.js file", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false }); // ✅ matches the state key
    }
  },

  signUp: async (data) => {},
}));

export { useAuthStore };
