const { ENV: { PERS } } = require('../../db/config');

let MessagesDao;
let UsersDao;

switch(PERS) {
    case 'firebase':
        MessagesDao = require('./messages/Messages.Firebase.dao');
        ProductsDao = require('./products/Products.Firebase.dao');
        UsersDao = require('./users/Users.Firebase.dao');
        break;
    case 'mongodb':
        MessagesDao = require('./messages/Messages.MongoDB.dao');
        ProductsDao = require('./products/Products.MongoDB.dao');
        UsersDao = require('./users/Users.MongoDB.dao');
        break;
    case 'file':
        MessagesDao = require('./messages/Messages.File.dao');
        ProductsDao = require('./products/Products.File.dao');
        UsersDao = require('./users/Users.File.dao');
        break;
    default:
        throw new Error('Invalid persistent method');
}

module.exports = {
    MessagesDao,
    ProductsDao,
    UsersDao
}