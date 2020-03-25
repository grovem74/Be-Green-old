var router = require('express').Router();

//Bring in the favorites controller
const favoritesController = require('../../controllers/favorites-controller');

router.route('/').post(favoritesController.create);

//Prefixed with /api/favorites
router.route('/user/:userId').get(favoritesController.getByUserId);


module.exports = router;

