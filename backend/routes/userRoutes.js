import express from 'express';
import UserController from '../controllers/userController.js';
import UserService from '../service/userService.js';
import userModel from '../models/userModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userService = new UserService(userModel);
const userController = new UserController(userService);
const userRoutes = express.Router();

userRoutes.get('/me', authMiddleware, (req, res) => userController.getProfile(req, res));
userRoutes.put('/me', authMiddleware, (req, res) => userController.updateProfile(req, res));
userRoutes.delete('/me', authMiddleware, (req, res) => userController.deleteAccount(req, res));

export default userRoutes;
