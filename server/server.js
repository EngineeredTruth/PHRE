import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import massive from 'massive';
import config from './config.json';
import multer from 'multer';
const Auth0Strategy = require('passport-auth0');

const massiveInstance = massive.connectSync({
    connectionString: config.connectionString
})

const app = module.exports = express();

app.use(session({
    secret: config.sessionSecret,
    saveUninitialized: false,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.set('db', massiveInstance);

app.use(express.static(__dirname + '/../public'));

app.set('view engine', 'ejs');

const db = app.get('db');
const ctrl = require('./ctrl.js');

const strategy = new Auth0Strategy({
        domain: 'tran.auth0.com',
        clientID: config.auth0ClientId,
        clientSecret: config.auth0Secret,
        callbackURL: config.callbackURL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {

        return done(null, profile);
    }
);

passport.use(strategy);

app.get('/auth/', passport.authenticate('auth0'));
app.get('/callback', passport.authenticate('auth0', {
    failureRedirect: '/auth',
    successRedirect: '/#/create-listing'
}));

app.get('/checkUser', (req, res, next) => {
    if (req.user !== undefined && req.user.id === "facebook|10101264400622962") {
        return res.json({
            "admin": true
        });
    }
    return res.json({
        "admin": false
    });
})


app.post('/api/photo', ctrl.upload_stage0, ctrl.upload_stage1, ctrl.upload_stage2);

passport.serializeUser((user, done) => {
    done(null, user); // put the whole user object from YouTube on the sesssion;
});

passport.deserializeUser((obj, done) => {
    //Only do something here that needs to be done with every request
    done(null, obj); // get data from session and put it on req.user in every endpoint;
});

app.listen(config.port, function() {
    console.log('Hosting port', config.port);
});
