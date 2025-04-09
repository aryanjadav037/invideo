export default class CollectionService {
  constructor(collectionModel, imageModel) {
    this.collectionModel = collectionModel;
    this.imageModel = imageModel;
  }

  async createCollection(userId, name) {
    try {
      const existingCollection = await this.collectionModel.findOne({
        user: userId,
        name,
      });
      if (existingCollection) {
        return { success: false, message: "collection already exists" };
      }

      const collection = await this.collectionModel.create({
        user: userId,
        name,
      });
      if (!collection) {
        return { success: false, message: "Failed to create collection" };
      }
      return { success: true, collection };
    } catch (error) {
      console.error("❌ Error creating collection:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getCollections(userId) {
    try {
      const collections = await this.collectionModel
        .find({ user: userId })
        .sort({ createdAt: -1 });
      if (collections.length === 0) {
        return { success: false, message: "No collections found" };
      }
      return { success: true, collections };
    } catch (error) {
      console.error("❌ Error fetching collections:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async deleteCollection(collectionId) {
    try {
      const collection =
        await this.collectionModel.findByIdAndDelete(collectionId);
      if (!collection) {
        return { success: false, message: "Collection not found" };
      }
      return { success: true, message: "Collection deleted successfully" };
    } catch (error) {
      console.error("❌ Error deleting collection:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async addImageToCollection(userId, collectionId, imageIds) {
    try {
      if (!Array.isArray(imageIds) || imageIds.length === 0) {
        return {
          success: false,
          message: "imageIds must be a non-empty array",
        };
      }

      await imageIds.forEach(async (imageId) => {
        const image = await this.imageModel.findById(imageId);
        if (!image) {
          return {
            success: false,
            message: `Image with ID ${imageId} not found`,
          };
        }
        if (image.user.toString() !== userId) {
          return {
            success: false,
            message: `Unauthorized access to image with ID ${imageId}`,
          };
        }
      });
      const collection = await this.collectionModel.findById(collectionId);

      if (collection.user.toString() !== userId) {
        return { success: false, message: "Unauthorized access" };
      }

      if (!collection) {
        return { success: false, message: "Collection not found" };
      }

      await imageIds.forEach( async imageId => {
        if (collection.images.includes(imageId)) {
          return {
            success: false,
            message: `Image with ID ${imageId} already exists in the collection`,
          };
        }
      });

      collection.images.push(...imageIds);
      await collection.save();
      return {
        success: true,
        message: "Image added to collection successfully",
      };
    } catch (error) {
      console.error("❌ Error adding image to collection:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

    async removeImageFromCollection(userId, collectionId, imageIds) {
        try {
        if (!Array.isArray(imageIds) || imageIds.length === 0) {
            return {
            success: false,
            message: "imageIds must be a non-empty array",
            };
        }
    
        const collection = await this.collectionModel.findById(collectionId);
        if (!collection) {
            return { success: false, message: "Collection not found" };
        }
    
        if (collection.user.toString() !== userId) {
            return { success: false, message: "Unauthorized access" };
        }
    
        collection.images = collection.images.filter(
            (imageId) => !imageIds.includes(imageId.toString())
        );
        await collection.save();
        return {
            success: true,
            message: "Image removed from collection successfully",
        };
        } catch (error) {
        console.error("❌ Error removing image from collection:", error.message);
        return {
            success: false,
            message: error.message,
        };
        }
    }
}
