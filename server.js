// // Load environment variables and set inside process.env
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// // dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override")
const bcrypt = require("bcrypt");

const initializePassport = require("./config/passport-config");
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = [];

// setup view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,  // do not resave if nothing has changed
    saveUninitialized: false,  // do not save empty values
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// routes
app.get("/", checkAuthenticated, (req, res) => {
    res.render("index", { name: req.user.name })
});

app.get("/map", (req, res) => {
    res.render("map");
});

app.get("/tips", (req, res) => {
    res.render("tips");
});

app.get("/profile", (req, res) => {
    res.render("profile");
});

app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login")
});

app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register")
});

app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/login",
    failureFlash: true
}));

app.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10) // hash user password 10 times
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect("/login");
    } catch {
        res.redirect("/register");
    }
    console.log(users);
})

app.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
})


// auth routes

// authenticate with Google
app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile"]
}));

app.get("/auth/google/cb", passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/",
    failureFlash: true
}));

// authenticate with Facebook
app.get("/auth/facebook", passport.authenticate("facebook", {
}));

app.get("/auth/facebook/cb",
    passport.authenticate("facebook", {
        successRedirect: "/success",
        failureRedirect: "/",
        failureFlash: true
    }));

// authenticate with Twitter
app.get("/auth/twitter", passport.authenticate("twitter", {
}));

app.get("/auth/twitter/cb",
    passport.authenticate("twitter", {
        successRedirect: "/success",
        failureRedirect: "/",
        failureFlash: true
    }));

app.get("/success", checkNotAuthenticated, (req, res) => {
    res.render("success")
});

app.delete("/auth/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
})

// Redirect unauthenticated user to login page if authentication required
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

// starting Express app

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
