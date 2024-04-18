import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadFile = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, (error, result) => {
    try {
      if (error) {
        console.error("cloudinary error");
      }

      if (result) {
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  });

  return result;
};
