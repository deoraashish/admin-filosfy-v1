import express from 'express';
import http from 'http';
import { APP_PORT, PASSPORT_SECRET } from './config';
import router from './routes';
import './config/db';
import session from 'express-session';
import './middlewares/localStrategy'
import passport from 'passport';
import errorHandler from './middlewares/ErrorHandler';

const app = express();
const server = http.createServer(app);

app.use(session({
    name: "user",
    secret: PASSPORT_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24*365
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.use(express.static('./static'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.use(errorHandler);
server.listen(APP_PORT, () => {
    console.log(`Your admin is running on port ${APP_PORT}`);
})