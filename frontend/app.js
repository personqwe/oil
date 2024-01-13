const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const server = next({ dev });
const handle = server.getRequestHandler();

server.prepare().then(() => {
    const app = express();

    app.set('port', process.env.PORT || 8080);
    
    app.get('*', (req, res) => handle(req, res));

    app.listen(8080, () => {
        console.log('Server running on port 8080');
    });
});