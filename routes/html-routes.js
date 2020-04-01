const bcrypt = require('bcrypt');
//const app = require('express').app();
const passport = require('passport');

const users = require('../server');
console.log(users);

module.exports = function(app) {

// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/map', (req, res) => {
    res.render('map');
});

app.get('/tips', (req, res) => {
    res.render('tips');
});

app.get('/profile', checkAuthenticated, (req, res) => {
    res.render('profile');
});

app.get('/messages', checkAuthenticated, (req, res) => {
    res.render('messages');
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login',
    failureFlash: true
}));

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10) // hash user password 10 times
        //create call to database here
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        console.log('should be redirecting to /');
        return res.redirect('/login');
    } catch {
        console.log('should be redirecting to /register');
        return res.redirect('/register');
    }
    console.log('this is local strategy', users);
})

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})


// auth routes

// authenticate with Google
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));

app.get('/auth/google/cb', passport.authenticate('google', {
    successRedirect: '/success',
    failureRedirect: '/',
    failureFlash: true
}));

// authenticate with Facebook
app.get('/auth/facebook', passport.authenticate('facebook', {
}));

app.get('/auth/facebook/cb',
    passport.authenticate('facebook', {
        successRedirect: '/success',
        failureRedirect: '/',
        failureFlash: true
    }));

// authenticate with Twitter
app.get('/auth/twitter', passport.authenticate('twitter', {
}));

app.get('/auth/twitter/cb',
    passport.authenticate('twitter', {
        successRedirect: '/success',
        failureRedirect: '/',
        failureFlash: true
    }));

app.get('/success', checkNotAuthenticated, (req, res) => {
    res.render('success')
});

app.delete('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})

// Redirect unauthenticated user to login page if authentication required
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    console.log(req.body);
    //make a database call to find the user based on email entered
    //use bcrypt 

    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

 }

