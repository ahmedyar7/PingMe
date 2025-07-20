import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.utils.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filename) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filename, {
      resource_type: "auto",
    });

    if (!uploadResult) {
      console.log("❌ Failed to upload file on Cloudinary");
      return null;
    } else {
      console.log("✅ File was uploaded successfully");
      return uploadResult; // return the result
    }
  } catch (error) {
    console.log("❌ Error in uploadOnCloudinary() function:", error);
    throw new ApiError(401, "Error uploading file to Cloudinary");
  }
};

export { uploadOnCloudinary };
