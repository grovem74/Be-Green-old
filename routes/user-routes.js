const db = require('../models');

module.exports = function(app) {
    app.get('/api/user', function(req, res) {
        db.User.findAll({})
            .then(function(result) {
                res.send(result);
            })
            .catch(function(err) {
              res.send(err);
            });
    }),
    app.post('/api/user', function(req, res) {
        console.log(req.body);
        db.User.create({
            name: req.body.user.name,
            email: req.body.user.email,
            password: req.body.user.password
        })
            .then(function(result) {
                res.send(result);
            })
            .catch(function(err) {
              res.send(err);
            });
    });
};