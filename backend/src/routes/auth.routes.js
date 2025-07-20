import Router from "express";
import { signUp } from "../controllers/auth.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const authRouter = Router();

// Signpu
authRouter.route("/signup").post(upload.single("profilePicture"), signUp);

export { authRouter };
