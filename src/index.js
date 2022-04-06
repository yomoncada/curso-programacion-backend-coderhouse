const express = require('express')
const path = require('path');

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const { normalize, schema } = require('normalizr')
/* const util = require('util')

function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
} */

const { Message } = require('./model/daos/index');

const { generateArray } = require('./utils/index');

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

    /* print(normalizedMessages); */

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

app.get('/api/productos-test', function(req, res) {
    res.render('testProductsTable', {products: generateArray(5)});
});

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})

connectedServer.on('error', (error) => {
    console.log(error.message)
})