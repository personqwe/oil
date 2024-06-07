const express = require('express');
const router = express.Router();
const { AddFavorite, RemoveFavorite, UserFavorite, UpdateNick } = require('../controller/user');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.post('/addfavorite', isLoggedIn, AddFavorite);
router.post('/removefavorite', isLoggedIn, RemoveFavorite);
router.post('/updateNick', isLoggedIn, UpdateNick);
router.get('/favorite', isLoggedIn, UserFavorite);
module.exports = router;