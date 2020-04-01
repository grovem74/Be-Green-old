const db = require('../models');

module.exports = function(app) {
    app.get('/api/favorites', function(req, res) {
        db.User.findAll({})
            .then(function(res) {
                res.send('were hfffer ein the du')
            })
            .catch(function(err) {
              res.send(err);
            });
    });
};

