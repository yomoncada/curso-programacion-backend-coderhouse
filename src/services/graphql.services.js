const ProductRepository = require('../repositories/product.repository')

const productsRepository = new ProductRepository;

class GraphQLService {
    constructor() {
    }

    async getProducts() {
        try {
            return await productsRepository.getAll();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductById({_id}) {
        try {
            return await productsRepository.get(_id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProduct({data}) {
        try {
            return await productsRepository.create(data);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProductById({_id, data}) {
        try {
            return await productsRepository.update(_id, data);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProductById({_id}) {
        try {
            return await productsRepository.delete(_id);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = GraphQLService;