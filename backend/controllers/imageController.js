
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

        // Fetch images from DB
        const images = await ImageService.getUserImages(userId);

        res.status(200).json({
            success: true,
            images: images.map(image => ({
                id: image._id,
                prompt: image.prompt,
                imageUrl: image.imageUrl,
                createdAt: image.createdAt
            }))
        });
    } catch (error) {
        console.error("Error fetching images:", error.message);
        res.status(500).json({ success: false, message: "Failed to retrieve images" });
    }
  }

  async deleteUserImage(req, res) {
    try {
        const {imageId} = req.params;

        // Fetch images from DB
        const response = await ImageService.deleteUserImage(imageId);

        res.status(200).json({
            success: true,
            message: "image deleted successfully"
        });
    } catch (error) {
        console.error("Error fetching images:", error.message);
        res.status(500).json({ success: false, message: "Failed to retrieve images" });
    }
  }

  async enhencePrompt(req, res) {
    try {
      const { prompt } = req.body;
      const userId = req.user.id;

      if (!prompt) {
        return res.status(400).json({ success: false, message: "Prompt is required" });
      }

      const ePrompt = await ImageService.enhencePrompt(prompt);

      if (!ePrompt.success) {
        return res.status(400).json({ success: false, message: "prompt not generaeted" });
      }

      res.status(200).json({ success: true, data: ePrompt });
    } catch (error) {
      console.error("❌ Error in enhence prompt:", error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

}

export default new ImageController();
