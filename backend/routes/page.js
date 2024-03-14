const express = require('express');
const router = express.Router();
const { cheapestStation } = require('../controller/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.get('/cheapest', isLoggedIn, cheapestStation);

module.exports = router;