
import axios from "axios";
import ImageModel from "../models/imageModel.js";

const CLOUDFLARE_API_URL = process.env.CLOUDFLARE_API_URL;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const generateImage = async (prompt) => {
  try {
    const response = await axios.post(
      CLOUDFLARE_API_URL,
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // Ensures binary data handling
      }
    );

    // Check for errors in response
    if (response.status !== 200) {
      throw new Error("Failed to generate image");
    }

    const base64Data = Buffer.from(response.data, "binary").toString("base64");
    // console.log("✅ Image generated successfully");

    return {
      success: true,
      base64Data,
    };
  } catch (error) {
    console.error("❌ Error generating image:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};


const saveImageToDatabase = async (userId, prompt, imageUrl) => {
  try {
    const image = new ImageModel({ user: userId, prompt, imageUrl });
    await image.save();
    // console.log("✅ Image saved to database");
    return {
      success: true,
      image,
    };
  } catch (error) {
    console.error("❌ Error saving image:", error.message);
    return {
      success: false,
      message: "Failed to save image to database",
    };
  }
};

const getUserImages = async (userId) => {
  try {
      // Fetch all images by userId
      const images = await ImageModel.find({ user: userId }).sort({ createdAt: -1 });

      return images;
  } catch (error) {
      console.error("Error fetching user images:", error.message);
      throw new Error("Failed to fetch images");
  }
};

const deleteUserImage = async (imageId) => {
  try {
      // Fetch all images by userId
      const res = await ImageModel.findByIdAndDelete({ _id: imageId });

      return res;
  } catch (error) {
      console.error("Error fetching user images:", error.message);
      throw new Error("Failed to fetch images");
  }
};

export default {
  generateImage,
  saveImageToDatabase,
  getUserImages,
  deleteUserImage,
  enhencePrompt
};
