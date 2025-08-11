import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv'
dotenv.config()

const uploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath); // delete local file
    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    // Clean up file if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // ✅ Throw the error instead of using `res`
    throw new Error("Cloudinary error: " + error.message);
  }
};

export default uploadOnCloudinary;
