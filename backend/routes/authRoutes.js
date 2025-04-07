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
router.post('/logout', (req, res, next) => loginController.logout(req, res, next));
router.get('/google', (req, res, next) => googleController.gAuth(req, res, next));
router.get('/google/callback', (req, res, next) => googleController.authenticateCallback(req, res, next));
router.get('/verify/:token', (req, res, next) => signupController.verifyEmail(req, res, next));

export default router;
