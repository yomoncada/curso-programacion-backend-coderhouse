const MongoDBContainer = require("../../containers/MongoDB.container");
const ProductSchema = require('../../schemas/Product.schema');

class ProductMongoDBDao extends MongoDBContainer {
    static instance;
    
    constructor() {
        if (!ProductMongoDBDao.instance) {
            super('products', ProductSchema);
            ProductMongoDBDao.instance = this;
            return this;
        } else {
            return ProductMongoDBDao.instance;
        }
    }
}

module.exports = ProductMongoDBDao;