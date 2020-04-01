//const db = require('../models');

module.exports = {
    postUser: function (req, res) {
        //this is where we'll do a db.postUser method
        console.log(req);
        res.json({
            message: 'postUser'
        });
    }

};