const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

dotenv.config();

const server = next({ dev });
const app = express();
const handle = server.getRequestHandler();

server.prepare().then(() => {
    app.set('port', process.env.PORT || 8080);
    app.use(morgan('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    }));
    
    app.get('*', (req, res) => handle(req, res));
    
    app.use((req, res, next) => {
        const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
        error.status = 404;
        next(error);
      });
      
      app.use((err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
        res.status(err.status || 500);
        res.render('error');
      });

      app.listen(app.get('port'), () => {
        console.log(app.get('port'), '번 포트에서 대기중');
      });
      
});