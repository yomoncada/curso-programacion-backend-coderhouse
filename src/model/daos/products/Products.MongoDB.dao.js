const MongoDBContainer = require("../../containers/MongoDB.container");
const mongoose = require('mongoose');
const productSchema = require('../../schemas/Product.schema');

class MongoDBProductsDao extends MongoDBContainer {
    constructor(){
        super('products', productSchema);
    }
}

module.exports = MongoDBProductsDao;