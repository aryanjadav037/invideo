class SignupController {
    constructor(authService) {
        this.authService = authService;
    }

    async signup(req, res, next) {
        try {
            const { Username, Full_Name, email, password, dob, role } = req.body;
            const user = await this.authService.register(Username, Full_Name, email, password, dob, role);
            res.status(201).json({ success: true, user });
        } catch (error) {
            next(error);
        }
    }
    async validateToken(req, res, next) {
        try {
            if (req.user) {
                return res.status(200).json({isValid : true})
            }
            return res.status(200).json({isValid : false})
        } catch (error) {
            next(error);
        }
    }
}

export default SignupController;
