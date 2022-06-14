const MessageFileDAO = require('./message/Message.File.dao');
const MessageFirebaseDAO = require('./message/Message.Firebase.dao');
const MessageMongoDBDAO = require('./message/Message.MongoDB.dao');
const ProductFileDAO = require('./product/Product.File.dao');
const ProductFirebaseDAO = require('./product/Product.Firebase.dao');
const ProductMongoDBDAO = require('./product/Product.MongoDB.dao');
const UserFileDAO = require('./user/User.File.dao');
const UserFirebaseDAO = require('./user/User.Firebase.dao');
const UserMongoDBDAO = require('./user/User.MongoDB.dao');

class DAOSFactory {
    static getDAOS(type) {
        let ProductDAO;
        let MessageDAO;
        let UserDAO;

        switch(type.toLowerCase()) {
            case 'file':
                ProductDAO = new ProductFileDAO();
                MessageDAO = new MessageFileDAO();
                UserDAO = new UserFileDAO();
                break;
            case 'firebase':
                ProductDAO = new ProductFirebaseDAO();
                MessageDAO = new MessageFirebaseDAO();
                UserDAO = new UserFirebaseDAO();
                break;
            case 'mongodb':
                ProductDAO = new ProductMongoDBDAO();
                MessageDAO = new MessageMongoDBDAO();
                UserDAO = new UserMongoDBDAO();
                break;
            default:
                throw new Error('Invalid data source, please provide one of the following (FIREBASE | MONGODB | FILE)')
        }

        return {
            ProductDAO,
            MessageDAO,
            UserDAO
        }
    }
}

module.exports = DAOSFactory;