class SignupController {
    constructor(authService) {
        this.authService = authService;
    }

    async signup(req, res) {
        try {
            const { Username, Full_Name, email, password } = req.body;
            const user = await this.authService.register(Username, Full_Name, email, password);
            res.status(201).json({ success: true, user });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}

export default SignupController;