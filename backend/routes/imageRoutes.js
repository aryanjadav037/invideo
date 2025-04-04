
import express from 'express';
import ImageController from '../controllers/imageController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const ImageRoutes = express.Router();

ImageRoutes.post('/generate', authMiddleware, ImageController.createImage);
ImageRoutes.get('/history', authMiddleware, ImageController.fetchUserImages);

export default ImageRoutes;
