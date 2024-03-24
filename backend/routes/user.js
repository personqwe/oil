const express = require('express');
const router = express.Router();
const { favorite } = require('../controller/user');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.post('/favorite', isLoggedIn, favorite);

module.exports = router;