const { ProductsDao } = require('../model/daos/index');
const productContainer = new ProductsDao;

const getAll = async () => {
    try {
        return await productContainer.getAll();
    } catch (error) {
        throw new Error(error.message);
    }
}

const create = async (product) => {
    try {
        return await productContainer.create(product);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAll,
    create
}