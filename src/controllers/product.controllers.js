const ProductService = require('../services/product.services')

class ProductControllers {
    constructor() {
        this.service = new ProductService();
        this.getProducts = this.getProducts.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.updateProductById = this.updateProductById.bind(this);
        this.deleteProductById = this.deleteProductById.bind(this);
    }

    async getProducts(req, res, next) {
        try {
            return res.status(200).json({ success: true, data: await this.service.getProducts() });
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req, res, next) {
        try {
            const { id } = req.params;
    
            const existingProduct = await this.service.getProductById(id);
        
            if (!existingProduct) {
                return res.status(404).json({ success: false, error: 'Producto no encontrado' });
            }
        
            return res.status(200).json({ success: true, data: existingProduct });
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req, res, next) {
        try {
            const { title, price, thumbnail } = req.body;
    
            if ( !title || !price || !thumbnail ) {
                return res.status(400).json({ succes: false, error: 'Formato del cuerpo incorrecto' });
            }
    
            const product = {
                title,
                price,
                thumbnail
            }
    
            const createdProduct = await this.service.createProduct(product);
    
            return res.json({ success: true, data: createdProduct });
        } catch (error) {
            next(error);
        }
    }

    async updateProductById(req, res, next) {
        try {
            const { id } = req.params;
            const { title, price, thumbnail } = req.body;
    
            if ( !title || !price || !thumbnail ) {
                return res.status(400).json({ succes: false, error: 'Formato del cuerpo incorrecto' });
            }
    
            const product = {
                title,
                price,
                thumbnail
            }
            
            const existingProduct = await this.service.getProductById(id);

            if (!existingProduct) {
                return res.status(404).json({ success: false, error: 'Producto no encontrado' });
            }
    
            const modifiedProduct = await this.service.updateProductById(id, product);
    
            return res.json({ success: true, data: modifiedProduct});
        } catch (error) {
            next(error);
        }
    }

    async deleteProductById(req, res, next) {
        try {
            const { id } = req.params;

            const existingProduct = await this.service.getProductById(id);
          
            if (!existingProduct) {
                return res.status(404).json({ success: false, error: 'Producto no encontrado' });
            }
          
            const deletedProduct = await this.service.deleteProductById(id);
          
            return res.json({ success: true, data: deletedProduct });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ProductControllers;