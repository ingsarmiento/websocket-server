require('dotenv').config();
const express = require('express');
const cors = require('cors');
const webSocket = require('../sockets/web-socket');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}

        //Middlewares
        this.middlewares();

        this.routes();

        //Sockets
        this.sockets()
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Public Direcctory
        this.app.use(express.static('public'));

    }

    routes() { }

    sockets() {
        this.io.on('connection', webSocket);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Aplicación ejecutandose en el puerto: ', this.port);
        });
    }
}

module.exports = Server;