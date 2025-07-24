import { AsyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { User } from "../models/user.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/uploadOnCloudinary.utils.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("❌ User with this userid donot exist");
      throw new ApiError(401, "User with this userId dont exist");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    if (!(accessToken && refreshToken)) {
      console.log("❌ Access and refresh token donot exist");
      throw new ApiError(401, "Access and refresh token");
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("❌ Error in generateAccessAndRefreshToken() function", error);
  }
};

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

    // const profilePictureLocalPath = req?.file?.path;

    // const profilePictureUpload = await uploadOnCloudinary(
    //   profilePictureLocalPath
    // );

    // if (!profilePictureUpload) {
    //   console.log("❌ Failed to fetch Profile Picture URL");
    //   throw new ApiError(401, "Failed to fetch Profile Picture URL");
    // }

    // Check if the user already exist
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      console.log("❌ The User with this credentials exists");
      throw new ApiError(401, "The User with this credentials exists");
    }

    const user = await User.create({
      email,
      fullname,
      password,
      // profilePicture: profilePictureUpload.secure_url, // use the secure_url from Cloudinary
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (createdUser) {
      console.log("✅ User was created successfully in the database");
      return res
        .status(200)
        .json(
          new ApiResponse(200, createdUser, "User was created successfully")
        );
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
    const { email, password } = req.body;

    if (!(email?.trim() && password?.trim())) {
      console.log("❌ Credentials were not provided in the body");
      throw new ApiError(401, "Credentials were not provided in the body");
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User with this email does not exist");
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordMatched = await user.isPasswordCorrect(password);
    if (!isPasswordMatched) {
      console.log("❌ The password did not match. Login failed");
      throw new ApiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user?._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -accessToken"
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // important
      maxAge: 7 * 24 * 60 * 60 * 1000, // optional: 7 days
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, loggedInUser, "User was logged in successfully")
      );
  } catch (error) {
    console.log("❌ Error in login() function", error);
    next(error);
  }
});

const logout = AsyncHandler(async (req, res, next) => {
  try {
    const loggedOutUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { refreshToken: undefined } },
      { new: true }
    );

    if (!loggedOutUser) {
      console.log("❌ User with this credentials donot exist Logout failed");
      throw new ApiError(
        401,
        "User with this credentials donot exist Logout failed"
      );
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // important
      maxAge: 7 * 24 * 60 * 60 * 1000, // optional: 7 days
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
  } catch (error) {
    console.log("❌ Error in logout() function", error);
    next(error);
  }
});

const updateProfile = AsyncHandler(async (req, res, next) => {
  try {
    // Update fullname, email, password
    const { fullname, email, password } = req.body;

    if (!(fullname?.trim() && email?.trim() && password?.trim())) {
      console.log("❌ User credentials were not found to update the profile");
      throw new ApiError(401, "User Credentials were not found");
    }

    // Check is any user with same email and full name exist
    const existedUser = await User.findOne({
      $or: [{ fullname }, { email }],
    });

    if (existedUser) {
      console.log("❌ User with this email or fullname already exist");
      throw new ApiError(
        401,
        "User with this email and password already exist"
      );
    }

    // Update the credentials
    const updatedUser = await User.findByIdAndUpdate(req?.user?._id, {
      fullname,
      email,
      password,
    });

    if (updatedUser) {
      console.log("✅ User Profile Updated Successfully");

      return res
        .status(200)
        .json(
          new ApiResponse(200, updatedUser, "User Profile Updated Successfully")
        );
    }

    console.log("❌ Failed To update the user profile");
  } catch (error) {
    console.log("❌ Error in updateProfile() function", error);
    next(error);
  }
});

const updateProfilePicture = AsyncHandler(async (req, res, next) => {
  try {
    // ✅ multer should have put the file path here
    const profilePictureLocalPath = req?.file?.path;

    if (!profilePictureLocalPath) {
      console.log("❌ Profile Picture local path doesn't exist");
      throw new ApiError(400, "Profile image file not provided");
    }

    // ✅ upload to cloudinary
    const uploadedImage = await uploadOnCloudinary(profilePictureLocalPath);

    if (!uploadedImage?.secure_url) {
      console.log("❌ Failed to upload image to Cloudinary");
      throw new ApiError(500, "Failed to upload image to Cloudinary");
    }

    // ✅ update user's profilePicture
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePicture: uploadedImage.secure_url },
      { new: true }
    ).select("-password -refreshToken"); // exclude sensitive fields

    if (!updatedUser) {
      console.log("❌ User not found to update profile picture");
      throw new ApiError(404, "User not found");
    }

    console.log("✅ Profile picture updated successfully");
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedUser,
          "Profile picture updated successfully"
        )
      );
  } catch (error) {
    console.log("❌ Error in updateProfilePicture() function", error);
    next(error);
  }
});

const checkAuth = AsyncHandler(async (req, res, next) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, req.user, "User is authenticated"));
  } catch (error) {
    console.log("Error in checkAuth controller", error);
    next(error);
  }
});

export {
  signUp,
  login,
  logout,
  updateProfile,
  updateProfilePicture,
  checkAuth,
};
