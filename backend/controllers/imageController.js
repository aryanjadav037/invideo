
import ImageService from "../service/imageService.js";
import uploadImageToCloudinary from "../service/uploadService.js";

class ImageController {
  async createImage(req, res) {
    try {
      const { prompt } = req.body;
      const userId = req.user.id;

      if (!prompt) {
        return res.status(400).json({ success: false, message: "Prompt is required" });
      }

      const response = await ImageService.generateImage(prompt);

      if (!response.success) {
        return res.status(400).json({ success: false, message: response.message });
      }

      const base64Data = response.base64Data;

      const { url, public_id} = await uploadImageToCloudinary(base64Data);

      await ImageService.saveImageToDatabase(userId, prompt, url);

      res.status(200).json({ success: true, data: url });
    } catch (error) {
      console.error("❌ Error in createImage:", error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  async fetchUserImages(req, res) {
    try {
      const userId = req.user.id;
      const images = await ImageModel.find({ user: userId });

      res.status(200).json({ success: true, images });
    } catch (error) {
      console.error("❌ Error fetching images:", error.message);
      res.status(500).json({ success: false, message: "Failed to retrieve images" });
    }
  }
}

export default new ImageController();
