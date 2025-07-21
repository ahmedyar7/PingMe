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

const deleteFromCloudinary = async (publicId) => {
  try {
    const deleteResult = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image", // or "auto" if you upload mixed types
    });

    if (deleteResult.result !== "ok") {
      console.log("❌ Failed to delete file from Cloudinary:", deleteResult);
      return null;
    } else {
      console.log("✅ File was deleted successfully from Cloudinary");
      return deleteResult;
    }
  } catch (error) {
    console.log("❌ Error in deleteFromCloudinary() function:", error);
    throw new ApiError(401, "Error deleting file from Cloudinary");
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
