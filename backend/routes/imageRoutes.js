
import express from 'express';
import ImageController from '../controllers/imageController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const ImageRoutes = express.Router();

ImageRoutes.post('/generate', authMiddleware, ImageController.createImage);
ImageRoutes.get('/history', authMiddleware, ImageController.fetchUserImages);
ImageRoutes.delete('/delete/:imageId', authMiddleware, ImageController.deleteUserImage)
ImageRoutes.post('/enhence', authMiddleware, ImageController.enhencePrompt);

export default ImageRoutes;
