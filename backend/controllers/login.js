class LoginController {
    constructor(authService) {
        this.authService = authService;
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.authenticate(email, password);

            res.cookie("auth_token", token, {
                httpOnly: true,     // ✅ For security, protects from XSS
                secure: false,      // ✅ Use true only with HTTPS
                maxAge: 3600000,    // 1 hour
                sameSite: 'Lax',    // or 'None' with secure: true for cross-origin
            });
            

            res.status(200).json({ success: true, token });
        } catch (error) {
           console.log(error) 
        }
    }

    async logout(req, res, next) {
        try {
            await this.authService.logout(res);
            res.status(200).json({ success: true, message: 'Logged out successfully' });
        } catch (error) {
            console.error("Logout error:", error);
            next(error);
        }
    }
}

export default LoginController;
