const axios = require('axios');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const passport = require("passport");

// 회원가입
exports.Join = async (req, res, next) => {
    const { nick, email, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('https://gr5home.iptime.org:8443/error');
        }
        const hash = await bcrypt.hash(password, 12); // 높을수록 느림 암호화
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 로그인
exports.Login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) { // 로그인 실패
            return res.redirect(`https://gr5home.iptime.org:8443/error=${info.message}`);
        }
        return req.login(user, (loginError) => { // 로그인 성공
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('https://gr5home.iptime.org:8443/main');
        });
    })(req, res, next); // 미들웨어 확장패턴, localStrategy 사용 done이 호출되었을 때 가는 곳
};

// 로그아웃
exports.Logout = async (req, res, next) => {
  console.log('Logout request received');
  if (req.isAuthenticated() && req.user) {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });
      if (user.provider === 'kakao') {
        const ACCESS_TOKEN = req.session.accessToken; // 세션에서 accessToken 가져오기
        
        console.log('Logging out from Kakao');
        await axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
          headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
          }
        });

        req.logout((err) => {
          if (err) {
            console.error('Session logout error:', err);
            return res.redirect('https://gr5home.iptime.org:8443/');
          }
          req.session.destroy((err) => {
            if (err) {
              console.error('Session destroy error:', err);
              return res.redirect('https://gr5home.iptime.org:8443/');
            }
            console.log('Kakao logout successful');
            return res.redirect('https://gr5home.iptime.org:8443/');
          });
        });
      } else {
        req.logout((err) => {
          if (err) {
            console.error('Session logout error:', err);
            return res.redirect('https://gr5home.iptime.org:8443/');
          }
          req.session.destroy((err) => {
            if (err) {
              console.error('Session destroy error:', err);
              return res.redirect('https://gr5home.iptime.org:8443/');
            }
            console.log('Local logout successful');
            return res.redirect('https://gr5home.iptime.org:8443/');
          });
        });
      }
    } catch (error) {
      console.error('Logout processing error:', error);
      return res.redirect('https://gr5home.iptime.org:8443/');
    }
  } else {
    return res.redirect('https://gr5home.iptime.org:8443/');
  }
};



// 사용자 정보 확인
exports.User = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.json({ user: req.user });
    } else {
        res.json({ user: null });
        return res.redirect('https://gr5home.iptime.org:8443/error');
    }
};

// 로그인 상태 확인
exports.Check = (req, res, next) => {
    console.log("User Data:", JSON.stringify(req.user, null, 2));
    if (req.isAuthenticated()) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
};
