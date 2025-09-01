import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Ensure Cloudinary credentials exist before initialising
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error(
    "Cloudinary environment variables are missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET",
  );
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Delete the local file after successful upload
    await fs.promises.unlink(localFilePath);

    return response;
  } catch (error) {
    // Attempt to remove the local file, but don't crash if it doesn't exist
    try {
      if (localFilePath && fs.existsSync(localFilePath)) {
        await fs.promises.unlink(localFilePath);
      }
    } catch (_) {
      // ignore unlink errors
    }

    // Re-throw to allow callers to handle the specific error
    throw error;
  }
};

export { uploadOnCloudinary };