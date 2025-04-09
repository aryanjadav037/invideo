import express from 'express';
import SignupController from '../controllers/signup.js';
import LoginController from '../controllers/login.js';
import GoogleController from '../controllers/google.js';
import AuthService from '../service/authService.js';
import TokenService from '../service/tokenService.js';
import GoogleService from '../service/googleService.js';
import UserModel from '../models/userModel.js';

const router = express.Router();
const tokenService = new TokenService(process.env.SECRET_KEY, '1h');
const authService = new AuthService(UserModel, tokenService);
const googleService = new GoogleService(authService);
const signupController = new SignupController(authService);
const loginController = new LoginController(authService);
const googleController = new GoogleController(googleService);

router.post('/signup', (req, res, next) => signupController.signup(req, res, next));
router.post('/login', (req, res, next) => loginController.login(req, res, next));
router.post('/logout', (req, res) => loginController.logout(req, res));
router.get('/google', (req, res) => googleController.gAuth(req, res));
router.get('/google/callback', (req, res) => googleController.authenticateCallback(req, res));

export default router;
