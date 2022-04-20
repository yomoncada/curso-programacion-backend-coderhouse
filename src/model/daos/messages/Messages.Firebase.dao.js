const FirebaseContainer = require("../../../model/containers/Firebase.container");

class FirebaseMessagesDao extends FirebaseContainer {
    constructor(){
        super('messages');
    }
}

module.exports = FirebaseMessagesDao;