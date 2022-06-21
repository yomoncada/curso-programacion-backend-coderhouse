const ProductRepository = require('../repositories/product.repository')

class ProductService {
    constructor() {
        this.repository = new ProductRepository;
    }

    async getProducts() {
        try {
            return await this.repository.getAll();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductById(id) {
        try {
            return await this.repository.get(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProduct(product) {
        try {
            return await this.repository.create(product);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProductById(id, product) {
        try {
            return await this.repository.update(id, product);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProductById(id) {
        try {
            return await this.repository.delete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = ProductService;