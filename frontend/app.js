const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dev = process.env.NODE_ENV !== 'production';
const server = next({ dev });
const handle = server.getRequestHandler();

server.prepare().then(() => {
    const app = express();  
    app.set('port', process.env.PORT || 2000);
    
    // 백엔드 라우트를 위한 프록시 설정
    app.use('/auth/kakao', createProxyMiddleware({
        target: 'https://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/auth/kakao': '/auth/kakao' },
        secure: false, // 자체 서명된 인증서에 대한 검증 비활성화
        ssl: {
            rejectUnauthorized: false // 자체 서명된 인증서를 신뢰
        }
    }));

    app.use('/auth/api/check', createProxyMiddleware({
        target: 'https://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/auth/api/check': '/auth/check' },
        secure: false, // 자체 서명된 인증서에 대한 검증 비활성화
        ssl: {
            rejectUnauthorized: false // 자체 서명된 인증서를 신뢰
        },
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.on('data', function(data) {
            console.log("check Received data from Backend: ", data.toString());
    });
    }
    }));

    app.use('/auth/api/user', createProxyMiddleware({
        target: 'https://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/auth/api/user': '/auth/user' },
        secure: false, // 자체 서명된 인증서에 대한 검증 비활성화
        ssl: {
            rejectUnauthorized: false // 자체 서명된 인증서를 신뢰
        },
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.on('data', function(data) {
            console.log("user Received data from Backend: ", data.toString());
    });
    }
    }));

    app.use('/auth/api/join', createProxyMiddleware({
        target: 'https://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/auth/api/join': '/auth/join' },
        secure: false, // 자체 서명된 인증서에 대한 검증 비활성화
        ssl: {
            rejectUnauthorized: false // 자체 서명된 인증서를 신뢰
        },
    }));

    app.use('/auth/api/logout', createProxyMiddleware({
        target: 'https://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/auth/api/logout': '/auth/logout' },
        secure: false,
        ssl: {
          rejectUnauthorized: false
        },
      }));

    app.use('/page/api/cheapest', createProxyMiddleware({
        target: 'https://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/page/api/cheapest': '/page/cheapest' },
        secure: false, // 자체 서명된 인증서에 대한 검증 비활성화
        ssl: {
            rejectUnauthorized: false // 자체 서명된 인증서를 신뢰
        },
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.on('data', function(data) {
            console.log("cheapest Received data from Backend: ", data.toString());
    });
    }
    }));

    app.use('/page/api/marker', createProxyMiddleware({
        target: 'https://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/page/api/marker': '/page/marker' },
        secure: false, // 자체 서명된 인증서에 대한 검증 비활성화
        ssl: {
            rejectUnauthorized: false // 자체 서명된 인증서를 신뢰
        },
    }));

    app.use('/user/api/addfavorite', createProxyMiddleware({
        target: 'https://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/user/api/addfavorite': '/user/addfavorite' },
        secure: false, // 자체 서명된 인증서에 대한 검증 비활성화
        ssl: {
            rejectUnauthorized: false // 자체 서명된 인증서를 신뢰
        },
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.on('data', function(data) {
            console.log("addfavorite Received data from Backend: ", data.toString());
    });
    }
    }));

    app.use('/user/api/removefavorite', createProxyMiddleware({
        target: 'https://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/user/api/removefavorite': '/user/removefavorite' },
        secure: false, // 자체 서명된 인증서에 대한 검증 비활성화
        ssl: {
            rejectUnauthorized: false // 자체 서명된 인증서를 신뢰
        },
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.on('data', function(data) {
            console.log("removefavorite Received data from Backend: ", data.toString());
    });
    }
    }));

    app.use('/user/api/favorite', createProxyMiddleware({
        target: 'https://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/user/api/favorite': '/user/favorite' },
        secure: false, // 자체 서명된 인증서에 대한 검증 비활성화
        ssl: {
            rejectUnauthorized: false // 자체 서명된 인증서를 신뢰
        },
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.on('data', function(data) {
            console.log("favorite Received data from Backend: ", data.toString());
    });
    }
    }));

    app.use('/user/api/updateNick', createProxyMiddleware({
        target: 'https://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/user/api/updateNick': '/user/updateNick' },
        secure: false, // 자체 서명된 인증서에 대한 검증 비활성화
        ssl: {
            rejectUnauthorized: false // 자체 서명된 인증서를 신뢰
        },
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.on('data', function(data) {
            console.log("Nick Received data from Backend: ", data.toString());
    });
    }
    }));

    app.use('/search/api/searchresult', createProxyMiddleware({
        target: 'https://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/search/api/searchresult': '/search/searchresult' },
        secure: false, // 자체 서명된 인증서에 대한 검증 비활성화
        ssl: {
            rejectUnauthorized: false // 자체 서명된 인증서를 신뢰
        },
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.on('data', function(data) {
            console.log("search Received data from Backend: ", data.toString());
    });
    }
    }));

     app.all('*', (req, res) => {
        return handle(req, res);
    });

    app.listen(app.get('port'), () => {
        console.log(app.get('port'), '번 포트에서 대기중');
      });
});
