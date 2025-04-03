class LoginController {
    constructor(authService) {
        this.authService = authService;
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.authenticate(email, password);
            res.status(200).json({ success: true, token });
        } catch (error) {
            next(error); 
        }
    }

    async logout(req, res, next) {
        try {
            await this.authService.logout(req.user);
            res.status(200).json({ success: true, message: 'Logged out successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default LoginController;
