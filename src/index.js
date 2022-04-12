const express = require('express')
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const { normalize, schema } = require('normalizr')

const { DB_CONFIG } = require('./db/config');
const appRoutes = require('./routers/index');
const { Message } = require('./model/daos/index');

const PORT = process.env.PORT || 8080

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const messageApi = new Message;

const authorSchema = new schema.Entity('author');
const messageSchema = new schema.Entity('message', {
    author: authorSchema
}, {idAttribute: '_id'});
const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema]
});

io.on('connection', async socket => {
    const messages = await messageApi.getAll();

    const messagesToNormalize = {
        id: 'messages',
        messages: messages
    }

    const normalizedMessages = normalize(messagesToNormalize, messagesSchema);

    socket.emit('messages', normalizedMessages)

    socket.on('newMessage', async (message) => {
        await messageApi.create(message);

        const messages = await messageApi.getAll();

        const messagesToNormalize = {
            id: 'messages',
            messages: messages
        }
    
        const normalizedMessages = normalize(messagesToNormalize, messagesSchema);

        socket.emit('messages', normalizedMessages)
    })
})

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './public/views');
app.set('view engine', 'ejs');

app.use(session({
    store: MongoStore.create({ mongoUrl: DB_CONFIG.mongodb.uri }),
    secret: 'yonathan-secret-15',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

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