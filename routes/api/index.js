var router = require('express').Router();

var userRoutes = require('./user-routes');

var favoritesRoutes = require('./favorites-routes');


//User routes
router.use('/user', userRoutes);

router.use('/favorites', favoritesRoutes);


module.exports = router;