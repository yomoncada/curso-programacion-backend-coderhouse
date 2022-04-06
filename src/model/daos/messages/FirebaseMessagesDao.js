const FirebaseContainer = require("../../containers/FirebaseContainer");

class FirebaseCartsDao extends FirebaseContainer {
    constructor(){
        super('messages');
    }
}

module.exports = FirebaseCartsDao;