import mongoose from "mongoose";

import { AsyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { User } from "../models/user.models.js";
import { Message } from "../models/message.models.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.utils.js";

const fetchUsersForSideBar = AsyncHandler(async (req, res, next) => {
  try {
    const loggedInUserId = req?.user?._id;

    if (!loggedInUserId) {
      console.log("❌ The Logged In user Id is not provided in body");
      throw new ApiError(401, "The Logged In user Id is not provided in body");
    }

    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    if (!filteredUser) {
      console.log("❌ Did not find user with filtered ids");
      throw new ApiError(401, "Did not find user with filtered ids");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, filteredUser, "User were successfully filtered")
      );
  } catch (error) {
    console.log("❌ Error in function fetchUsersForSideBar()");
    next(error);
  }
});

const fetchMessagesBasedUponId = AsyncHandler(async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;

    if (!userToChatId?.trim()) {
      console.log("❌ userToChatid was not provided in the URL");
      throw new ApiError(401, "userToChatid was not provided in the URL");
    }

    const myId = req?.user?._id;

    if (!mongoose.isValidObjectId(myId)) {
      console.log("❌ myId was not a valid mongoose id");
      throw new ApiError(401, "myId was not a valid mongoose id");
    }

    const messages = await Message.find({
      $or: [
        { myId: myId, receiverId: userToChatId },
        { myId: userToChatId, receiverId: myId },
      ],
    });

    if (messages) {
      console.log(
        "✅ Message was successfully fetched based upon userToChatId"
      );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            messages,
            "Message was successfully fetched based upon userToChatId"
          )
        );
    }

    console.log("❌ Failed to fetch Message based upon userToChatId");
    throw new ApiError(401, "Failed to fetch Message based upon userToChatId");
  } catch (error) {
    console.log("❌ Error in function fetchMessagesBasedUponId()");
    next(error);
  }
});

const sendMessagesBasedUponId = AsyncHandler(async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      console.log("❌ Text is not provided in the request body");
      throw new ApiError(401, "Text is not provided in request body");
    }

    const { id: receiverId } = req.params;

    if (!mongoose.isValidObjectId(receiverId)) {
      console.log("❌ Receiver ID is not valid");
      throw new ApiError(401, "Receiver ID is not valid");
    }

    const senderId = req?.user?._id;
    if (!mongoose.isValidObjectId(senderId)) {
      console.log("❌ Sender ID is not valid");
      throw new ApiError(401, "Sender ID is not valid");
    }

    // Get uploaded file path
    const imageLocalPath = req?.file?.path;
    if (!imageLocalPath) {
      console.log("❌ Image file was not uploaded");
      throw new ApiError(401, "Image file was not uploaded");
    }

    // Upload to Cloudinary
    const uploadImage = await uploadOnCloudinary(imageLocalPath);
    if (!uploadImage) {
      console.log("❌ Failed to upload image to Cloudinary");
      throw new ApiError(500, "Failed to upload image to Cloudinary");
    }

    // Create message
    const message = await Message.create({
      senderId,
      receiverId,
      text,
      image: uploadImage.secure_url,
    });

    if (!message) {
      console.log("❌ Failed to create message in DB");
      throw new ApiError(500, "Failed to create message in DB");
    }

    console.log("✅ Message sent successfully");

    return res
      .status(200)
      .json(new ApiResponse(200, message, "Successfully created message"));
  } catch (error) {
    console.log("❌ Error in sendMessagesBasedUponId() function:", error);
    next(error);
  }
});

export {
  fetchUsersForSideBar,
  fetchMessagesBasedUponId,
  sendMessagesBasedUponId,
};
