import express from 'express';
import LoginController from './LoginController.js';
import AuthService from './AuthService.js';
import TokenService from './TokenService.js';
import UserModel from './UserModel.js';

const router = express.Router();
const tokenService = new TokenService('your_secret_key', '1h');
const authService = new AuthService(UserModel, tokenService);
const signupController = new SignupController(authService);
const loginController = new LoginController(authService);

router.post('/signup', (req, res) => signupController.signup(req, res));
router.post('/login', (req, res) => loginController.login(req, res));
router.post('/logout', (req, res) => loginController.logout(req, res));

export default router;
