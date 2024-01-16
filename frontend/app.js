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
        target: 'http://gr5home.iptime.org:500',
        changeOrigin: true,
        pathRewrite: { '^/auth/kakao': '/auth/kakao' }
    }));

    app.use('/auth/api/check', createProxyMiddleware({
        target: 'http://gr5home.iptime.org:500',
        changeOrigin: true,
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.on('data', function(data) {
            console.log("check Received data from Backend: ", data.toString());
    });
    }
    }));

    app.use('/auth/api/user', createProxyMiddleware({
        target: 'http://gr5home.iptime.org:500',
        changeOrigin: true,
        onProxyRes: function (proxyRes, req, res) {
            proxyRes.on('data', function(data) {
            console.log("user Received data from Backend: ", data.toString());
    });
    }
    }));

     app.all('*', (req, res) => {
        console.log('들어옴');
        return handle(req, res);
    });

    app.listen(app.get('port'), () => {
        console.log(app.get('port'), '번 포트에서 대기중');
      });
});