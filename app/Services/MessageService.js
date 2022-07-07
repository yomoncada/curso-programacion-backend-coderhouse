const MessageRepository = use('App/Repositories/MessageRepository')

class MessageService {
    constructor() {
        this.repository = new MessageRepository
    }

    async getMessages() {
        try {
            return await this.repository.getAll()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createMessage(message) {
        try {
            return await this.repository.create(message)
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = MessageService