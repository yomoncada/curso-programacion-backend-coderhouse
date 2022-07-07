const Message = use('App/Models/Message')
const MessageDTO = use('App/Models/DTOs/MessageDTO')

class MessageRepository {
    constructor() {
        this.model = Message
    }

    async create(message) {
        try {
            const dto = new MessageDTO(message)
            return await this.model.create(dto)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAll() {
        try {
            const messages = await this.model.all()
            return messages.map(message => new MessageDTO(message))
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = MessageRepository