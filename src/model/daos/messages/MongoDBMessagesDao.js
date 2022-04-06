const MongoDBContainer = require("../../containers/MongoDBContainer");
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: {
        id: { type: String, require: true },
        name: { type: String, require: true },
        lastName: { type: String, require: true },
        age: { type: String, require: true },
        alias: { type: String, require: true },
        avatar: { type: String, require: true },
    },
    text: { type: String, required: true },
    dateTime: { type: Date, required: true },
});

class MongoDBCartsDao extends MongoDBContainer {
    constructor(){
        super('messages', messageSchema);
    }
}

module.exports = MongoDBCartsDao;