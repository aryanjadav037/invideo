class LoginController {
    constructor(authService) {
        this.authService = authService;
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.authenticate(email, password);
            res.status(200).json({ success: true, token });
        } catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    }

    async logout(req, res) {
        try {
            await this.authService.logout(req.user);
            res.status(200).json({ success: true, message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default LoginController;
