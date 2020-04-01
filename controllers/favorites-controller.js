//const db = require('../models');

module.exports = {
    create: function (req, res) {
        //this is where we'll do a db.create method
        console.log(req);
        res.json({
            message: 'create method'
        });
    },

    getByUserId: function (req, res) {
        //this is where we'll do a db.getByUserId method
        console.log(req);
        res.json({
            message: 'getByUserId'
        });
    }
};

