class GoogleController {
    constructor(googleService, tokenService) {
        this.googleService = googleService;
        this.tokenService = tokenService; // Add tokenService to constructor
    }

    async gAuth(req, res, next) {
        try {
            const url = await this.googleService.gAuth();
            res.redirect(url);
        } catch (error) {
            console.error("Google auth error:", error);
            next(error); 
        }
    }

    async callAUth(req, res, next) {
        try {
            const { code } = req.query;
            const user = await this.googleService.authenticateCallback(code);
            
            // Generate token for the authenticated user
            const token = await this.tokenService.generateToken(user);
            
            // Set cookie similar to LoginController
            // For deployment
            // res.cookie("auth_token", token, {
            //     httpOnly: true,
            //     secure: true,      
            //     maxAge: 3600000,   // 1 hour
            //     sameSite: 'None',  // For cross-origin
            // });
            
            // For local development if needed
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: false,      
                maxAge: 3600000,   // 1 hour
                sameSite: 'Lax',  
            });
            
            // Redirect to workspace with authentication now in place
            res.redirect("http://localhost:5005/workspace");
        } catch (error) {
            console.error("Google auth callback error:", error);
            next(error);
        }
    }
}

export default GoogleController;