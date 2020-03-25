var router = require('express').Router();

//Bring in the user controller
var userController = require('../../controllers/user-controller');

//Prefixed with /api/user
router.route('/')
    .post(userController.postUser);




module.exports = router;
