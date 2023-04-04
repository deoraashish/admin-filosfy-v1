class LoginController {
    async login (req,res,next) {
        return res.render('login')
    }
    async loginDetails (req,res,next) {
        return res.redirect('/')
    }
    async logout (req,res,next) {
        req.logout((err) => {
            if (err) {
                return next(err)
            }
            return res.redirect('/login')
        })
    }
}

export default new LoginController();