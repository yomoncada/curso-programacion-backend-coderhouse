const express = require('express')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('../middlewares/passport');

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const { normalize, schema } = require('normalizr')

const { DB_CONFIG } = require('../db/config');
const appRoutes = require('../routers/app.routes.js');
const apiRoutes = require('../routers/api.routes.js');
const { MessagesDao } = require('../model/daos/index');


const init = (args) => {
    const PORT = args.PORT;

    const app = express()
    const httpServer = new HttpServer(app)
    const io = new Socket(httpServer)

    const Message = new MessagesDao;

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

    app.use('/app', appRoutes);
    app.use('/api', apiRoutes);

    app.get('/', function(req, res) {
        res.redirect('/app/auth/login');
    });

    app.get('/info', (req, res) => {
        res.render('pages/info.ejs', { process: process, cwd: process.cwd(), rss: process.memoryUsage().rss, argv: process.argv.slice(2), cpus: os.cpus().length });
    });

    const connectedServer = httpServer.listen(PORT, () => {
        console.log(`Server is up and running on port ${PORT}`)
    })

    connectedServer.on('error', (error) => {
        console.log(error.message)
    })

    io.on('connection', async socket => {
        const messages = await Message.getAll();

        const messagesToNormalize = {
            id: 'messages',
            messages: messages
        }

        const normalizedMessages = normalize(messagesToNormalize, messagesSchema);

        socket.emit('messages', normalizedMessages)

        socket.on('newMessage', async (message) => {
            await Message.create(message);

            const messages = await Message.getAll();

            const messagesToNormalize = {
                id: 'messages',
                messages: messages
            }
        
            const normalizedMessages = normalize(messagesToNormalize, messagesSchema);

            socket.emit('messages', normalizedMessages)
        })
    })
}

module.exports = {
  init
}