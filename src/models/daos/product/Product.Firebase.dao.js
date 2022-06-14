const FirebaseContainer = require("../../containers/Firebase.container");

class ProductFirebaseDAO extends FirebaseContainer {
    static instance;
    
    constructor() {
        if (!ProductFirebaseDAO.instance) {
            super('products');
            ProductFirebaseDAO.instance = this;
            return this;
        } else {
            return ProductFirebaseDAO.instance;
        }
    }
}

module.exports = ProductFirebaseDAO;