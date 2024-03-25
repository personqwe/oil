const express = require('express');
const router = express.Router();
const { cheapestStation, markerStation, userFavorite } = require('../controller/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.get('/cheapest', isLoggedIn, cheapestStation);

router.get('/marker', isLoggedIn, markerStation);

router.get('/favorite', isLoggedIn, userFavorite);
module.exports = router;