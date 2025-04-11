import { isValid } from "zod";

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

    async verifyEmail(req, res, next) {
        try {
            const { token } = req.params;
            await this.authService.verifyEmail(token);
            res.redirect("https://invideo-eta.vercel.app/login");
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
