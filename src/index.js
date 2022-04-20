const express = require('express')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./middlewares/passport');

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const { normalize, schema } = require('normalizr')

const { DB_CONFIG } = require('./db/config');
const appRoutes = require('./routers/index');
const { MessagesDao } = require('./model/daos/index');

const PORT = process.env.PORT || 8080

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
    secret: 'yonathan-secret-15',
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

app.get('/', function(req, res) {
    res.redirect('/app/auth/login');
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