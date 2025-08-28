import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error("No file path provided to uploadOnCloudinary");
      return null;
    }

    // Always resolve to an absolute path to avoid cwd issues
    const absolutePath = path.resolve(localFilePath);

    if (!fs.existsSync(absolutePath)) {
      console.error("File not found at:", absolutePath);
      return null;
    }

    const response = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto",
    });

    console.log("✅ File uploaded to Cloudinary:", response.secure_url);

    // Delete only if file still exists
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    return response;

  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);

    // Try removing only if file still exists
    const absolutePath = path.resolve(localFilePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };