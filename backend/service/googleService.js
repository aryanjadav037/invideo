import { google } from "googleapis";

class GoogleService {
    constructor(authService) {
        this.authService = authService;
        this.googleClient = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
    }

    async gAuth() {
        const url = this.googleClient.generateAuthUrl({
            access_type: "offline",
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email"
            ]
        });
        return url;
    }

    async authenticateCallback(code) {
        const { tokens } = await this.googleClient.getToken(code);
        this.googleClient.setCredentials(tokens);

        const oauth2 = google.oauth2({ version: "v2", auth: this.googleClient });
        const { data } = await oauth2.userinfo.get();

        const Username = data.name;
        const Full_Name = data.name;
        const email = data.email;
        const password = process.env.GOOGLE_PASSWORD; // Use a default password or generate one

        // Check if user exists
        const existingUser = await this.authService.userModel.findOne({ email });
        
        if (existingUser) {
            // Return the actual user object for existing users
            return existingUser;
        } else {
            // Register and return the user object for new users
            const hashedPassword = await this.authService.hashPassword(password);
            const newUser = await this.authService.userModel.create({
                Username,
                Full_Name,
                email,
                password: hashedPassword,
                dob: null, // You may want to handle this differently
                role: "user", // Default role, adjust as needed
                verificationToken: null,
                isVerified: true // Google-authenticated users are automatically verified
            });
            
            return newUser;
        }
    }
}

export default GoogleService;