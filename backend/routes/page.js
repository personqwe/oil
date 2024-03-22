const express = require('express');
const router = express.Router();
const { cheapestStation, markerStation } = require('../controller/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.get('/cheapest', isLoggedIn, cheapestStation);

router.get('/marker', isLoggedIn, markerStation);
module.exports = router;