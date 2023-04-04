class AuthCheck {
    async loginRequired(req,res,next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    }
    async noLogin (req,res,next) {
        if (req.isAuthenticated()) {
            return res.redirect('/')
        }
        return next();
    }
}

export default new AuthCheck();