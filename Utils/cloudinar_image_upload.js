import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();


console.log(process.env.CLOUDINARY_CLOUD_API_KEY);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret:process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const uploadToCloudinary = async ({ localImagepath }) => {
  if (!localImagepath) return null;

  try {
    const response = await cloudinary.uploader.upload(localImagepath, {
      resource_type: "auto",
    });
  
    return response.secure_url;
  } catch (err) {
    //
    fs.unlinkSync(localImagepath);
    console.log(err);
    return null;
  }
};

export { uploadToCloudinary };