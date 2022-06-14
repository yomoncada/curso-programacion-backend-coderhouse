const FirebaseContainer = require("../../containers/Firebase.container");

class UserFirebaseDAO extends FirebaseContainer {
    static instance;
    
    constructor() {
        if (!UserFirebaseDAO.instance) {
            super('user');
            UserFirebaseDAO.instance = this;
            return this;
        } else {
            return UserFirebaseDAO.instance;
        }
    }
}

module.exports = UserFirebaseDAO;