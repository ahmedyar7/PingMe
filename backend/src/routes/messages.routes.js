import Router from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  fetchMessagesBasedUponId,
  fetchUsersForSideBar,
  sendMessagesBasedUponId,
} from "../controllers/message.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const messageRouter = Router();

//  Fetch User for the SideBar
messageRouter.route("/users").get(verifyJWT, fetchUsersForSideBar);

// Fetch message based upon id
messageRouter.route("/:id").get(verifyJWT, fetchMessagesBasedUponId);

// SEnd message based upon userId
messageRouter
  .route("/user/:id")
  .post(verifyJWT, upload.single("image"), sendMessagesBasedUponId);

export { messageRouter };
