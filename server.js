const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

//Need database
var db = require("");

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