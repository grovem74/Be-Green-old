const bcrypt = require("bcrypt");
const router = require("express").Router();
const passport = require("passport");

const users = [];

// routes
router.get("/", checkAuthenticated, (req, res) => {
    res.render("index", { name: req.user.name })
});

router.get("/map", (req, res) => {
    res.render("map");
});

router.get("/tips", (req, res) => {
    res.render("tips");
});

router.get("/profile", (req, res) => {
    res.render("profile");
});

router.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login")
});

router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register")
});

router.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/login",
    failureFlash: true
}));

router.post("/register", checkNotAuthenticated, async (req, res) => {
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

router.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
})


// routes
router.get("/", checkAuthenticated, (req, res) => {
    res.render("index", { name: req.user.name })
});

router.get("/map", (req, res) => {
    res.render("map");
});

router.get("/tips", (req, res) => {
    res.render("tips");
});

router.get("/profile", (req, res) => {
    res.render("profile");
});

router.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login")
});

router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register")
});

router.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/login",
    failureFlash: true
}));

router.post("/register", checkNotAuthenticated, async (req, res) => {
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

router.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
})


// auth routes

// authenticate with Google
router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile"]
}));

router.get("/auth/google/cb", passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/",
    failureFlash: true
}));

// authenticate with Facebook
router.get("/auth/facebook", passport.authenticate("facebook", {
}));

router.get("/auth/facebook/cb",
    passport.authenticate("facebook", {
        successRedirect: "/success",
        failureRedirect: "/",
        failureFlash: true
    }));

// authenticate with Twitter
router.get("/auth/twitter", passport.authenticate("twitter", {
}));

router.get("/auth/twitter/cb",
    passport.authenticate("twitter", {
        successRedirect: "/success",
        failureRedirect: "/",
        failureFlash: true
    }));

router.get("/success", checkNotAuthenticated, (req, res) => {
    res.render("success")
});

router.delete("/auth/logout", (req, res) => {
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

module.exports = router;