'use strict'

const ProductService = use('App/Services/ProductService')

class ProductController {
    constructor() {
        this.service = new ProductService
    }

    async getProducts({request, response, view}) {
        try {
            return response.status(200).json({ success: true, data: await this.service.getProducts() })
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById({request, response, view, params}) {
        try {
            const { id } = params
    
            const existingProduct = await this.service.getProductById(id)
        
            if (!existingProduct) {
                return response.status(404).json({ success: false, error: 'Producto no encontrado' })
            }
        
            return response.status(200).json({ success: true, data: existingProduct })
        } catch (error) {
            console.log(error)
        }
    }

    async createProduct({request, response, view}) {
        try {
            const { title, price, thumbnail } = req.body
    
            if ( !title || !price || !thumbnail ) {
                return response.status(400).json({ succes: false, error: 'Formato del cuerpo incorrecto' })
            }
    
            const product = {
                title,
                price,
                thumbnail
            }
    
            const createdProduct = await this.service.createProduct(product)
    
            return response.json({ success: true, data: createdProduct })
        } catch (error) {
            console.log(error)
        }
    }

    async updateProductById({request, response, view}) {
        try {
            const { id } = req.params
            const { title, price, thumbnail } = req.body
    
            if ( !title || !price || !thumbnail ) {
                return response.status(400).json({ succes: false, error: 'Formato del cuerpo incorrecto' })
            }
    
            const product = {
                title,
                price,
                thumbnail
            }
            
            const existingProduct = await this.service.getProductById(id)

            if (!existingProduct) {
                return response.status(404).json({ success: false, error: 'Producto no encontrado' })
            }
    
            const modifiedProduct = await this.service.updateProductById(id, product)
    
            return response.json({ success: true, data: modifiedProduct})
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductById({request, response, view}) {
        try {
            const { id } = req.params

            const existingProduct = await this.service.getProductById(id)
          
            if (!existingProduct) {
                return response.status(404).json({ success: false, error: 'Producto no encontrado' })
            }
          
            const deletedProduct = await this.service.deleteProductById(id)
          
            return response.json({ success: true, data: deletedProduct })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductController
