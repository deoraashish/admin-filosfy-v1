import passport from 'passport';
import passportLocal from 'passport-local';
import Admin from '../models/Admin';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField:'password'
}, async (email,password,done) => {
    try {
        const user = await Admin.findOne({email});
        if(!user) {
            return done(null,false)
        }
        if (user.password !== password) {
            return done(null,false)
        }
        return done(null,user)
    } catch (err) {
        done(err);
    }
}));

passport.serializeUser((user,done) => {
    return done(null,user._id)
})

passport.deserializeUser(async (id,done) => {
    try {
        const user = await Admin.findById(id);
        if (user) {
            return done(null,user)
        }
    } catch (err) {
        console.log(err.message)
        done(err)
    }
})

export default passport;