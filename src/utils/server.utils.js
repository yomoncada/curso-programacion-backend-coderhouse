const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passportMiddleware = require('../middlewares/passport');

const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')

const { DB_CONFIG } = require('../db/config');
const routes = require('../routers/index.js');
const socketUtil = require('../utils/socket.utils');
const loggerUtil = require('../utils/logger.utils');

const init = (args) => {
    const PORT = args.PORT;

    const app = express()
    const httpServer = new HttpServer(app)
    const socketIoServer = new SocketServer(httpServer)

    app.use(express.static('public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.set('views', './public/views');
    app.set('view engine', 'ejs');

    app.use(session({
        name: 'some-session',
        store: MongoStore.create({ mongoUrl: DB_CONFIG.mongodb.uri }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 60000
        }
    }))

    app.use(passportMiddleware.initialize());
    app.use(passportMiddleware.session());
    app.use((req, res, next) => {
        loggerUtil.write('info', `Se recibió una petición a la ruta [${req.method}] ${req.protocol + '://' + req.get('host') + req.originalUrl} en el servidor.`);

        next();
    })

    app.use(routes);

    const connectedServer = httpServer.listen(PORT, () => {
        console.log(`Server is up and running on port ${PORT}`)
    })

    connectedServer.on('error', (error) => {
        console.log(error.message)
    })

    socketIoServer.on('connection', (socket) => {
        socketUtil.eventsHandler(socketIoServer, socket);
    });
}

module.exports = {
  init
}