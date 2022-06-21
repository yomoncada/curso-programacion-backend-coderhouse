require('dotenv').config();

const ProductDTO = require('../models/dtos/product.dto');
const DAOSFactory = require('../models/daos/Daos.factory');

class ProductRepository {
    constructor() {
        this.dao = DAOSFactory.getDAOS(process.env.PERS).ProductDAO;
    }

    async getAll() {
        try {
            const products = await this.dao.getAll();
            return products.map(product => new ProductDTO(product));
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async get(id) {
        try {
            const product = await this.dao.get(id);
            return new ProductDTO(product);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(product) {
        try {
            const dto = new ProductDTO(product);
            return await this.dao.create(dto);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id, product) {
        try {
            const dto = new ProductDTO(product);
            return await this.dao.update(id, dto);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id) {
        try {
            return await this.dao.delete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = ProductRepository;