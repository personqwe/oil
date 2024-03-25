const express = require('express');
const router = express.Router();
const { addFavorite, removeFavorite } = require('../controller/user');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.post('/addfavorite', isLoggedIn, addFavorite);
router.post('/removefavorite', isLoggedIn, removeFavorite);
module.exports = router;