export default class CollectionController {
    constructor(collectionService) {
        this.collectionService = collectionService;
    }

    async createCollection(req, res) {
        try {
            const { name } = req.body;
            const userId = req.user.id;

            if (!name) {
                return res.status(400).json({ success:false, message: "name is required" });
            }

            const collection = await this.collectionService.createCollection(userId, name);
            if (!collection.success) {
                return res.status(400).json({ success: false, message: collection.message });
            }

            res.status(200).json({ success:true, data: collection.collection });
        }
        catch (error) {
            console.error("❌ Error creating collection:", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    async getCollections(req, res) {
        try {
            const userId = req.user.id;
            const collections = await this.collectionService.getCollections(userId);
            if (!collections.success) {
                return res.status(400).json({ success: false, message: collections.message });
            }

            res.status(200).json({ success:true, data: collections.collections });
        }
        catch (error) {
            console.error("❌ Error fetching collections:", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    async deleteCollection(req, res) {
        try {
            const { collectionId } = req.params;
            const collection = await this.collectionService.deleteCollection(collectionId);
            if (!collection.success) {
                return res.status(400).json({ success: false, message: collection.message });
            }

            res.status(200).json({ success:true, message: collection.message });
        }
        catch (error) {
            console.error("❌ Error deleting collection:", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    async addImageToCollection(req, res) {
        try {
            const { collectionId } = req.params;
            const { imageIds } = req.body;
            const userId = req.user.id;

            if (!collectionId || !imageIds) {
                return res.status(400).json({ success: false, message: "collectionId and imageId are required" });
            }

            const result = await this.collectionService.addImageToCollection(userId, collectionId, imageIds);
            if (!result.success) {
                return res.status(400).json({ success: false, message: result.message });
            }

            res.status(200).json({ success:true, data: result.data });
        }
        catch (error) {
            console.error("❌ Error adding image to collection:", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    async removeImageFromCollection(req, res) {
        try {
            const { collectionId } = req.params;
            const { imageIds } = req.body;
            const userId = req.user.id;

            if (!collectionId || !imageIds) {
                return res.status(400).json({ success: false, message: "collectionId and imageId are required" });
            }

            const result = await this.collectionService.removeImageFromCollection(userId, collectionId, imageIds);
            if (!result.success) {
                return res.status(400).json({ success: false, message: result.message });
            }

            res.status(200).json({ success:true, data: result.data });
        }
        catch (error) {
            console.error("❌ Error removing image from collection:", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}