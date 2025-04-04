import cloudinary from "../config/cloudinaryConfig.js";

/**
 * Uploads an image to Cloudinary
 * @param {string} base64Data - Base64 encoded image string
 * @returns {Promise<Object>} - Uploaded image details (URL, ID)
 */
const uploadImageToCloudinary = async (base64Data) => {
  try {

    const base64Prefix = "data:image/jpeg;base64,";  // Since /9j/ indicates JPEG
    const formattedBase64 = base64Data.startsWith("data:image")
                        ? base64Data
                        : base64Prefix + base64Data;

    const result = await cloudinary.uploader.upload(formattedBase64, {
      folder: "uploads", // Optional: Organize images into a folder
      resource_type: "image",
    });

    return {
      url: result.secure_url, // Cloudinary URL
      public_id: result.public_id, // Public ID for future reference
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", {
        message: error.message || "Unknown error",
        http_code: error.http_code || "No HTTP code",
        api_raw: error.api_raw_response || "No API response",
      });
  
    throw new Error("Failed to upload image to Cloudinary");
  }
};

export default uploadImageToCloudinary;
