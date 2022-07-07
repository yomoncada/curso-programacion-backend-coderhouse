const Product = use('App/Models/Product')
const ProductDTO = use('App/Models/DTOs/ProductDTO')

class ProductRepository {
    constructor() {
        this.model = Product
    }

    async getAll() {
        try {
            const products = await this.model.all()
            return products.rows.map(product => new ProductDTO(product.$attributes))
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async get(id) {
        try {
            const product = await this.model.find(id)
            return product.$attributes
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async create(product) {
        try {
            const dto = new ProductDTO(product)
            return await this.model.create(dto)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(id, product) {
        try {
            return await this.model
                .query()
                .where('id', id)
                .update(product)    
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id) {
        try {
            return await this.model
                .query()
                .where('id', id)
                .delete()
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = ProductRepository