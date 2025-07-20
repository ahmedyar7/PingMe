import { AsyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.utils.js";

const signUp = AsyncHandler(async (req, res, next) => {
  try {
    const { email, fullname, password } = req.body;

    console.log(email);

    if ([email, fullname, password].some((field) => field?.trim() === "")) {
      console.log("❌ Credentials Error: SignUp credentials were not provided");
      throw new ApiError(
        401,
        "Unauthorized Request: SignUp credentials missing"
      );
    }

    const profilePictureLocalPath = req?.file?.path;

    if (!profilePictureLocalPath) {
      throw new ApiError(400, "No profile picture uploaded");
    }

    const profilePictureUpload = await uploadOnCloudinary(
      profilePictureLocalPath
    );

    if (!profilePictureUpload) {
      console.log("❌ Failed to fetch Profile Picture URL");
      throw new ApiError(401, "Failed to fetch Profile Picture URL");
    }

    // Check if the user already exist
    const existedUser = await User.findOne({
      $or: [{ email }, { password }],
    });

    if (existedUser) {
      console.log("❌ The User with this credentials exists");
      throw new ApiError(401, "The User with this credentials exists");
    }

    const user = await User.create({
      email,
      fullname,
      password,
      profilePicture: profilePictureUpload.secure_url, // use the secure_url from Cloudinary
    });

    if (user) {
      console.log("✅ User was created successfully in the database");
      return res
        .status(200)
        .json(new ApiResponse(200, user, "User was created successfully"));
    }

    console.log("❌ Failed to create the user");
    throw new ApiError(500, "Failed to create user");
  } catch (error) {
    console.log("❌ Error in signUp() function", error);
    next(error);
  }
});

const login = AsyncHandler(async (req, res, next) => {
  try {
  } catch (error) {
    console.log("❌ Error in login() function");
    next();
  }
});

const logout = AsyncHandler(async (req, res, next) => {
  try {
  } catch (error) {
    console.log("❌ Error in logout() function");
    next();
  }
});

export { signUp, login, logout };
