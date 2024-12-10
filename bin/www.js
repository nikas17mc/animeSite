const http = require('http');
const app = require('../app');
require('dotenv').config();
let envPORT = process.env.PORT || '8080';

const port = parsedPORT(envPORT);
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening)


function parsedPORT(val) {
    let portInt = parseInt(val, 10);
    if (isNaN(portInt)) {
        return val;
    } else if (portInt >= 0) {
        return portInt;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCESS':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use!');
            process.exit(1);
        default:
            throw error;
    }
};

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
    ? 'Pipe ' + addr
    : 'Port ' + addr.port;
    console.debug('\x1b[34m%s\x1b[33m%s\x1b[0m','Listening on: ', bind);
}