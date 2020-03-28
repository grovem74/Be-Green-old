// // Load environment variables and set inside process.env
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// // dependencies
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override")

const users = [];

module.exports = users;

const initializePassport = require("./config/passport-config");
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

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





//Need database
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

//Routes
var routes = require('./routes');
app.use(routes);


db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log(`App is now listening on ${PORT}`);
    });
});