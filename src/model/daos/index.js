const { ENV: { PERS } } = require('../../db/config');

let MessagesDao;
let UsersDao;

switch(PERS) {
    case 'firebase':
        MessagesDao = require('./messages/Messages.Firebase.dao');
        UsersDao = require('./users/Users.Firebase.dao');
        break;
    case 'mongodb':
        MessagesDao = require('./messages/Messages.MongoDB.dao');
        UsersDao = require('./users/Users.MongoDB.dao');
        break;
    case 'file':
        MessagesDao = require('./messages/Messages.File.dao');
        UsersDao = require('./users/Users.File.dao');
        break;
    default:
        throw new Error('Invalid persistent method');
}

module.exports = {
    MessagesDao,
    UsersDao
}