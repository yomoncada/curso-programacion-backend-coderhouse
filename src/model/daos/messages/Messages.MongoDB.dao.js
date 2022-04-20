const MongoDBContainer = require("../../../model/containers/MongoDB.container");
const mongoose = require('mongoose');
const messageSchema = require('../../../model/schemas/Message.schema');

class MongoDBMessagesDao extends MongoDBContainer {
    constructor(){
        super('messages', messageSchema);
    }
}

module.exports = MongoDBMessagesDao;