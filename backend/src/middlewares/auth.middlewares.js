import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { AsyncHandler } from "../utils/AsyncHandler.utils.js";
import jwt from "jsonwebtoken";

const verifyJWT = AsyncHandler(async (req, res, next) => {
  try {
    // Get accessToken from cookies or Authorization header
    const token =
      req?.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("Access Token found:", token);

    if (!token) {
      console.log("❌ Access token does not exist for verification");
      throw new ApiError(401, "Access token is missing");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
      console.log("❌ Failed to decode the token");
      throw new ApiError(401, "Invalid token");
    }

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      console.log("❌ User not found with this token");
      throw new ApiError(401, "User not found");
    }

    req.user = user; // attach user object
    next();
  } catch (error) {
    console.log("❌ Failed to verify access token", error);
    next(error); // forward to global error handler
  }
});

export { verifyJWT };
