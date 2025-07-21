import Router from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  login,
  logout,
  signUp,
  updateProfile,
} from "../controllers/auth.controllers.js";

const authRouter = Router();

// Signpu
authRouter.route("/signup").post(upload.single("profilePicture"), signUp);

// LogIn
authRouter.route("/login").post(login);

// Logout
authRouter.route("/logout").post(verifyJWT, logout);

//  Update USer Profile
authRouter.route("/updateProfile").patch(verifyJWT, updateProfile);

export { authRouter };
