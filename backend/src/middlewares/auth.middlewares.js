import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { AsyncHandler } from "../utils/AsyncHandler.utils.js";
import jwt from "jsonwebtoken";
// Get cookies from request for bearer token
// decode the token

const verifyJWT = AsyncHandler(async (req, res, next) => {
  try {
    const token =
      (await req?.cookies?.accessToken) ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("❌ Refresh Token donot exist for verifcation");
      throw new ApiError(401, "The Refresh Token Donot exist for verification");
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!decodedToken) {
      console.log("❌ Failed to decode the token");
      throw new ApiError(401, "Failed to decode the token");
    }

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    req?.user = user?._id;

    next();
  } catch (error) {
    console.log("❌ Failed to verify Refresh Token");
  }
});

export { verifyJWT };
