require('dotenv').config();

const MessageDTO = require('../models/dtos/message.dto');
const DAOSFactory = require('../models/daos/Daos.factory');

class MessageRepository {
    constructor() {
        this.dao = DAOSFactory.getDAOS(process.env.PERS).MessageDAO;
    }

    async create(message) {
        try {
            const dto = new MessageDTO(message);
            return await this.dao.create(dto);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAll() {
        try {
            const messages = await this.dao.getAll();
            return messages.map(message => new MessageDTO(message));
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = MessageRepository;