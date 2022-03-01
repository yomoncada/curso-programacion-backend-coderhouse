const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const Product = require('./model/Product')
const Message = require('./model/Message')

const PORT = process.env.PORT || 8080

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productApi = new Product();
const messageApi = new Message('messages.json');

io.on('connection', async socket => {
    socket.emit('products', productApi.getAll())

    socket.on('newProduct', (product) => {
        productApi.add(product);
        
        io.sockets.emit('products', productApi.getAll());
    })

    socket.emit('messages', await messageApi.getAll())

    socket.on('newMessage', async (message) => {
        message.dateTime = new Date().toLocaleString();

        await messageApi.add(message);

        io.sockets.emit('messages', await messageApi.getAll())
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})

connectedServer.on('error', (error) => {
    console.log(error.message)
})