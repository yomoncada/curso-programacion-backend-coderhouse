'use strict'

const ProductService = use('App/Services/ProductService')

class ProductController {
    constructor ({ socket, request }) {
		this.service = new ProductService
        this.socket = socket
        this.request = request

		const products = await this.service.getProducts()

		this.socket.broadcastToAll('products', products)
    }

	async onNewProduct(product) {
		try {
			await this.service.createProduct(product)
	
			const products = await this.service.getProducts()
	
			this.socket.broadcastToAll('products', products)
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = ProductController