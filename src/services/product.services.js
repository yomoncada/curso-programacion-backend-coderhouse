const ProductRepository = require('../repositories/product.repository')

class ProductService {
    constructor() {
        this.ProductRepository = new ProductRepository;
    }

    async getAllProducts() {
        try {
            return await this.ProductRepository.getAll();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProduct(product) {
        try {
            return await this.ProductRepository.create(product);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new ProductService();