const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    author: {
        id: { type: String, require: true },
        name: { type: String, require: true },
        lastName: { type: String, require: true },
        age: { type: String, require: true },
        alias: { type: String, require: true },
        avatar: { type: String, require: true }
    },
    text: { type: String, required: true },
    dateTime: { type: Date, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

module.exports = MessageSchema;