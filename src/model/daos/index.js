const { ENV: { PERS } } = require('../../db/config');

let Message;

switch(PERS) {
    case 'firebase':
        Message = require('./messages/FirebaseMessagesDao');
        break;
    case 'mongodb':
        Message = require('./messages/MongoDBMessagesDao');
        break;
    case 'file':
        Message = require('./messages/FileMessagesDao');
        break;
    default:
        throw new Error('Invalid persistent method');
}

module.exports = {
    Message
}