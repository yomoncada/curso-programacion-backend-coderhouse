const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('../middlewares/passport');

const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const { normalize, schema } = require('normalizr')

const { DB_CONFIG } = require('../db/config');
const appRoutes = require('../routers/app.routes.js');
const apiRoutes = require('../routers/api.routes.js');
const rootRoutes = require('../routers/root.routes.js');
const { MessagesDao, ProductsDao } = require('../model/daos/index');
const logger = require('../utils/logger.utils');

const init = (args) => {
    const PORT = args.PORT;

    const app = express()
    const httpServer = new HttpServer(app)
    const io = new SocketServer(httpServer)

    const Message = new MessagesDao;
    const Product = new ProductsDao;

    const authorSchema = new schema.Entity('author');
    const messageSchema = new schema.Entity('message', {
        author: authorSchema
    }, {idAttribute: '_id'});
    const messagesSchema = new schema.Entity('messages', {
        messages: [messageSchema]
    });

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

    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        logger.write('info', `Se recibió una petición a la ruta [${req.method}] ${req.protocol + '://' + req.get('host') + req.originalUrl} en el servidor.`);

        next();
    })

    app.use('/app', appRoutes);
    app.use('/api', apiRoutes);
    app.use(rootRoutes);

    const connectedServer = httpServer.listen(PORT, () => {
        console.log(`Server is up and running on port ${PORT}`)
    })

    connectedServer.on('error', (error) => {
        console.log(error.message)
    })

    io.on('connection', async (socket) => {
        console.log('Me conecté');
        try {
            const messages = await Message.getAll();
            const products = await Product.getAll();

            const messagesToNormalize = {
                id: 'messages',
                messages: messages
            }

            const normalizedMessages = normalize(messagesToNormalize, messagesSchema);

            socket.emit('messages', normalizedMessages)
            socket.emit('products', products);

            socket.on('newProduct', async (product) => {
                try {
                    await Product.create(product);

                    const products = await Product.getAll();

                    socket.emit('products', products);
                } catch (error) {
                    logger.write('error', `Ocurrio un error: ${error.message} en la api de productos.`)
                }
            });

            socket.on('newMessage', async (message) => {
                try {
                    await Message.create(message);

                    const messages = await Message.getAll();

                    const messagesToNormalize = {
                        id: 'messages',
                        messages: messages
                    }
                
                    const normalizedMessages = normalize(messagesToNormalize, messagesSchema);

                    socket.emit('messages', normalizedMessages)
                } catch (error) {
                    logger.write('error', `Ocurrio un error: ${error.message} en la api de mensajes.`)
                }
            })
        } catch (error) {
            logger.write('error', `Ocurrio un error: ${error.message} en la api de productos o mensajes.`)
        }
    })
}

module.exports = {
  init
}