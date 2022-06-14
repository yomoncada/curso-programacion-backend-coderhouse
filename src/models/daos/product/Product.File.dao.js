const FileContainer = require("../../containers/File.container");

class ProductFileDAO extends FileContainer {
    static instance;
    
    constructor() {
        if (!ProductFileDAO.instance) {
            super('./src/data/products.json');
            ProductFileDAO.instance = this;
            return this;
        } else {
            return ProductFileDAO.instance;
        }
    }
}

module.exports = ProductFileDAO;