const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {

    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'That email address is not registered.' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password is incorrect.' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })

    passport.use(new GoogleStrategy({
        callbackURL: 'http://localhost:8080/auth/google/cb',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }, (accessToken, refreshToken, profile, done) => {
        console.log('passport Google callback function fired:');
        return done(null, console.log(profile));
    }
    ));

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/auth/facebook/cb'
    },
        function (accessToken, refreshToken, profile, done) {
            console.log('passport Facebook callback function fired:');
            return done(null, console.log(profile));
        }
    ));

    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET_KEY,
        callbackURL: 'http://localhost:8080/auth/twitter/cb'
    },
        function (token, tokenSecret, profile, done) {
            console.log('passport Twitter callback function fired:');
            return done(null, console.log(profile));
        }
    ));

}

module.exports = initialize;