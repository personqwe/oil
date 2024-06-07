const express = require('express');
const router = express.Router();
const { SearchResult } = require('../controller/search');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.get('/searchresult', isLoggedIn, SearchResult);

module.exports = router;