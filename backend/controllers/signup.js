class SignupController {
    constructor(authService) {
        this.authService = authService;
    }

    async signup(req, res, next) {
        try {
            const { Username, Full_Name, email, password, dob, role } = req.body;

            const result = await this.authService.register(
                Username, Full_Name, email, password, dob, role
            );

            res.status(201).json({
                success: true,
                message: result.message || 'Signup successful. Please verify your email.'
            });
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
}

export default SignupController;
