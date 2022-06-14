require('dotenv').config();

const ProductDTO = require('../models/dtos/product.dto');
const DAOSFactory = require('../models/daos/Daos.factory');

class ProductRepository {
    constructor() {
        this.dao = DAOSFactory.getDAOS(process.env.PERS).ProductDAO;
    }

    async create(product) {
        try {
            const dto = new ProductDTO(product);
            return await this.dao.create(dto);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAll() {
        try {
            const products = await this.dao.getAll();
            return products.map(product => new ProductDTO(product));
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = ProductRepository;