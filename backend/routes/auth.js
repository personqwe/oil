const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const router = express.Router();

// /auth/kakao
router.get('/kakao', passport.authenticate('kakao')); // 카카오톡 로그인 화면으로 redirect
// /auth/kakao -> 카카오톡 로그인 화면 -> 로그인이 성공 -> /auth/kakao/callback
// /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '@@@@@@@@@@@@@@@/login', // 로그인 실패 시 리디렉션
}), (req, res) => {
    res.redirect('@@@@@@@@@@@@/main');
});

router.get('/check', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ isLoggedIn: true });
    } else {
      res.json({ isLoggedIn: false });
    }
  });
  
module.exports = router;

//app.use(passort.authenticate('kakao)); = 기본 기능만 사용
//app.use((req, res, next) => passport.authenticate('kakkao')(req, res, next)) = req, res, next를 사용하고 싶을 때
