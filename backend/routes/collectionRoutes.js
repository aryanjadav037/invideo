import express from 'express';
import CollectionController from '../controllers/collectionController.js';
import CollectionService from '../service/collectionService.js';
import collectionModel from '../models/collectionModel.js';
import imageModel from '../models/imageModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const collectionService = new CollectionService(collectionModel, imageModel);
const collectionController = new CollectionController(collectionService);
const collectionRoutes = express.Router();

collectionRoutes.post('/create', authMiddleware,(req, res, next) => collectionController.createCollection(req, res, next));
collectionRoutes.get('/', authMiddleware,(req, res, next) => collectionController.getCollections(req, res, next));
collectionRoutes.delete('/delete/:collectionId', authMiddleware,(req, res, next) => collectionController.deleteCollection(req, res, next));
collectionRoutes.post('/add-image/:collectionId', authMiddleware,(req, res, next) => collectionController.addImageToCollection(req, res, next));
collectionRoutes.delete('/remove-image/:collectionId', authMiddleware,(req, res, next) => collectionController.removeImageFromCollection(req, res, next));

export default collectionRoutes;