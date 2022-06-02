
const { normalize, schema } = require('normalizr')

const productService = require('../services/product.services');
const messageService = require('../services/message.services');
const loggerUtil = require('./logger.utils');

const authorSchema = new schema.Entity('author');
const messageSchema = new schema.Entity('message', {
    author: authorSchema
}, {idAttribute: '_id'});
const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema]
});

const eventsHandler = async (io, socket) => {
    try {
        const getMessages = async () => {
            try {
                const messages = await messageService.getAll();
        
                const messagesToNormalize = {
                    id: 'messages',
                    messages: messages
                }
        
                return normalize(messagesToNormalize, messagesSchema);
            } catch (error) {
                throw new Error(error.message);
            }
        };

        const getProducts = async () => {
            try {
                return await productService.getAll();
            } catch (error) {
                throw new Error(error.message);
            }
        };
        
        const createMessage = async (message) => {
            try {
                await messageService.create(message);
        
                const messages = await messageService.getAll();
        
                const messagesToNormalize = {
                    id: 'messages',
                    messages: messages
                }
            
                const normalizedMessages = normalize(messagesToNormalize, messagesSchema);
        
                socket.emit('messages', normalizedMessages);
            } catch (error) {
                loggerUtil.write('error', `Ocurrio un error: ${error.message} en la api de mensajes.`)
            }
        };
        
        const createProduct = async (product) => {
            try {
                await productService.create(product);
        
                const products = await productService.getAll();
        
                socket.emit('products', products);
            } catch (error) {
                loggerUtil.write('error', `Ocurrio un error: ${error.message} en la api de productos.`)
            }
        };

        const products = await getMessages();
        const messages = await getProducts();

        socket.emit('messages', products);
        socket.emit('products', messages);

        socket.on('newProduct', createProduct);
        socket.on('newMessage', createMessage)
    } catch (error) {
        loggerUtil.write('error', `Ocurrio un error: ${error.message} en la api de productos o mensajes.`)
    }
}

module.exports = {
    eventsHandler
};