import { google } from "googleapis";
class GoogleService {
    constructor(authService) {
        this.authService = authService;
        this.googleClient = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
    }

    async gAuth() {

        const url = this.googleClient.generateAuthUrl({
            access_type:"offline",
            scope:[
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email"
            ]
        })
        return url
    }

    async authenticateCallback(code) {

        const { tokens } = await this.googleClient.getToken(code)
        googleClient.setCredentials(tokens)

        const oauth2 = google.oauth2({ version: "v2", auth: this.googleClient });
        const { data } = await oauth2.userinfo.get();

        Username = data.name;
        Full_Name = data.name;
        email = data.email;
        password = "google";

        const user = await this.authService.register(Username, Full_Name, email, password);
        return user;
    }
}

export default GoogleService;
