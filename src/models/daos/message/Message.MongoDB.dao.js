const MongoDBContainer = require("../../containers/MongoDB.container");
const MessageSchema = require('../../schemas/Message.schema');

class MessageMongoDBDAO extends MongoDBContainer {
    static instance;
    
    constructor() {
        if (!MessageMongoDBDAO.instance) {
            super('messages', MessageSchema);
            MessageMongoDBDAO.instance = this;
            return this;
        } else {
            return MessageMongoDBDAO.instance;
        }
    }
}

module.exports = MessageMongoDBDAO;