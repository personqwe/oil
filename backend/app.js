const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport'); //클라이언트가 서버에 요청할 자격이 있는지 인증 passport/index.js의 module.exports를 불러옴
const cors = require('cors');

// process.env.COOKIE_SECRET 없음
dotenv.config(); // process.env
// process.env.COOKIE_SECRET 있음

const authRouter = require('./routes/auth');

const passportConfig = require('./passport'); // passport설정
const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 8080);
passportConfig(); // passport 실행
app.use(cors({
    origin: '@@@@@',
    credentials: true 
}));

sequelize.sync({ force: false })
.then(() => {
  console.log('데이터베이스 연결 성공');
})
.catch((err) => {
  console.error(err);
});

app.use(morgan('dev')); // 배포할땐 combined
app.use(express.static(path.join(__dirname, 'public'))); //public폴더만 프론트에서 허용 브라우저에서는 원래 접근 X
app.use(express.json()); // req.body를 ajax json 요청으로부터
app.use(express.urlencoded({ extended: false })); // 폼 요청 req.body 폼으로부터
app.use(cookieParser(process.env.COOKIE_SECRET)); // {connect.sid=123456412348} 객체화 시켜줌 이를 통해 user.id를 찾아줌 
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, // 자바스크립트 접근 못하게(보안에 좋음)
        secure: false, // https 적용할 때 true
    },
}));
// 세션쿠키랑 유저 아이디는 연결되어있다.
app.use(passport.initialize()); // passport는 session 아래에 작성해야함 req.user, req.login, req.isAuthenticate, req.logout 여기서 생성
app.use(passport.session()); // user.id를 저장한게 session으로 저장. Connect.id로 session쿠키가 브라우저로 전송
// 브라우저 connect.sid=123456412348 - 쿠키가 서버로 옴 

app.use('/auth', authRouter);

// Express 라우트 설정
// 예: app.get('/api/data', (req, res) => { ... });
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });

module.exports = app;