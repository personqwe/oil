const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, check, user } = require('../controller/auth');
const router = express.Router();

// /auth/kakao
router.get('/kakao', passport.authenticate('kakao')); // 카카오톡 로그인 화면으로 redirect
// /auth/kakao -> 카카오톡 로그인 화면 -> 로그인이 성공 -> /auth/kakao/callback
// /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: 'https://gr5home.iptime.org:8443/', // 로그인 실패 시 리디렉션
}), (req, res) => {
    res.redirect('https://gr5home.iptime.org:8443/main');
});

router.post('/join', isNotLoggedIn, join);

router.post('/login', isNotLoggedIn, login);

router.get('/check', check);

router.get('/user', isLoggedIn, user);

module.exports = router;

//app.use(passort.authenticate('kakao)); = 기본 기능만 사용
//app.use((req, res, next) => passport.authenticate('kakkao')(req, res, next)) = req, res, next를 사용하고 싶을 때
