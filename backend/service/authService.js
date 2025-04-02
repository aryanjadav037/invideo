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
        const newUser = await this.userModel.create({ Username, Full_Name, email, password });
        return newUser;
    }

    async authenticate(email, password) {
        const user = await this.userModel.findByEmail(email);
        if (!user || !user.verifyPassword(password)) {
            throw new Error('Invalid email or password');
        }
        return this.tokenService.generateToken(user);
    }

    async logout(user) {
        await this.tokenService.invalidateToken(user);
    }
}

export default AuthService;
