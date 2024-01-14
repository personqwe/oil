const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.use((req, res, next) => { // 여기서 직접 찾아도 following follower 됨
    res.locals.user = req.user; // 로그인 안하면 null locals는 따로 저장할 데이터를 담아둠(미들웨어간 공유되는 데이터)
     // passort의 index.js에 deserializeUser에서 가져옴
    // req.session은 사용자끼리 공유되는 데이터(사용자가 로그아웃 시 데이터 삭제)
    next();
})

router.get('/', isLoggedIn, renderMain); //라우터의 마지막 미들웨어는 컨트롤러

module.exports = router;