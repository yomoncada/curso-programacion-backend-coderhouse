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
const messageApi = new Message();

io.on('connection', async socket => {
    const products = await productApi.getAll();
    socket.emit('products', products)

    socket.on('newProduct', async (product) => {
        await productApi.add(product);
        
        const products = await productApi.getAll();

        io.sockets.emit('products', products);
    })

    socket.emit('messages', await messageApi.getAll())

    socket.on('newMessage', async (message) => {
        await messageApi.add(message);

        const messages = messageApi.getAll().getAll();

        io.sockets.emit('messages', messages)
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