class GoogleController {
    constructor(googleService) {
        this.googleService = googleService;
    }

    async gAuth(req, res, next) {
        try {
            const url = await this.googleService.gAuth();

            res.redirect(url)
        } catch (error) {
            next(error); 
        }
    }

    async callAUth(req, res, next) {
        try {
            const { code } = req.query;
            const user = await this.googleService.authenticateCallback(code);
            res.redirect("http://localhost:5173/login");
        } catch (error) {
            next(error);
        }
    }
}

export default GoogleController;
