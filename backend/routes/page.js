const express = require('express');
const router = express.Router();
const { CheapestStation, MarkerStation } = require('../controller/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.get('/cheapest', isLoggedIn, CheapestStation);

router.get('/marker', isLoggedIn, MarkerStation);

module.exports = router;