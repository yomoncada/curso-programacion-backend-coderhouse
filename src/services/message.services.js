const MessageRepository = require('../repositories/message.repository')

class MessageService {
    constructor() {
        this.MessageRepository = new MessageRepository;
    }

    async getAllMessages() {
        try {
            return await this.MessageRepository.getAll();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createMessage(message) {
        try {
            return await this.MessageRepository.create(message);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new MessageService();