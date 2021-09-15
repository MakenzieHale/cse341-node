const http = require('http');

const paths = require('./paths');

const server = http.createServer(paths.handler);

server.listen(3000);