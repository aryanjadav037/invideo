import express from 'express';
import SignupController from '../controllers/signup.js';
import LoginController from '../controllers/login.js';
import AuthService from '../service/authService.js';
import TokenService from '../service/tokenService.js';
import UserModel from '../models/userModel.js';

const router = express.Router();
const tokenService = new TokenService(process.env.SECRET_KEY, '1h');
const authService = new AuthService(UserModel, tokenService);
const signupController = new SignupController(authService);
const loginController = new LoginController(authService);

router.post('/signup', (req, res) => signupController.signup(req, res));
router.post('/login', (req, res) => loginController.login(req, res));
router.post('/logout', (req, res) => loginController.logout(req, res));

export default router;
