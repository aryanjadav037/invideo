import bcrypt from 'bcrypt';
class AuthService {
    constructor(userModel, tokenService) {
        this.userModel = userModel;
        this.tokenService = tokenService;
    }

    async register(Username, Full_Name, email, password) {
        const existingUser = await this.userModel.findOne({ email });

        if (existingUser) {
            throw new Error('User already exists');
        }

        password = await bcrypt.hash(password, 10);
        const newUser = await this.userModel.create({ Username, Full_Name, email, password });
        return newUser;
    }

    async authenticate(email, password) {
        const user = await this.userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }
        return this.tokenService.generateToken(user);
    }

    async logout(res) {
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
    }
}

export default AuthService;
