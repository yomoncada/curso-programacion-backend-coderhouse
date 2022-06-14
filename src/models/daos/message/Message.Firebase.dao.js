const FirebaseContainer = require("../../containers/Firebase.container");

class MessageFirebaseDAO extends FirebaseContainer {
    static instance;
    
    constructor() {
        if (!MessageFirebaseDAO.instance) {
            super('messages');
            MessageFirebaseDAO.instance = this;
            return this;
        } else {
            return MessageFirebaseDAO.instance;
        }
    }
}

module.exports = MessageFirebaseDAO;