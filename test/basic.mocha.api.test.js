const assert = require('assert').strict;
const ProductService = require('../src/services/product.services');

const Product = new ProductService;

let productsCount = 0;
let productId = '';

describe('Prueba de la api de productos', () => {
    it('Obtención de productos', async () => {
        const products = await Product.getProducts();
        console.log(products);
        productsCount = products.length;
        productId = products[0]._id;

        assert.strictEqual(products.length, productsCount);
    });

    it('Obtención de un producto', async () => {
        const product = await Product.getProductById(productId);
        console.log(product);

        assert.notStrictEqual(product, null);
    });

    it('Creación de un producto', async () => {
        const data = {
            title: 'Esto es un producto',
            price: 150,
            thumbnail: 'https://place-hold.it/300x300/'
        };

        const product = await Product.createProduct(data);
        console.log(product);
        productId = product._id;

        assert.notStrictEqual(productId, null);
    });


    it('Actualización de un producto', async () => {
        const data = {
            title: 'Esto es un producto modificado',
            price: 350,
            thumbnail: 'https://place-hold.it/150x150/'
        };

        const modifiedProduct = await Product.updateProductById(productId, data);
        console.log(modifiedProduct);

        assert.strictEqual(modifiedProduct.acknowledged, true);
    });

    it('Eliminación de un producto', async () => {
        const deletedProduct = await Product.deleteProductById(productId);
        console.log(deletedProduct);
        
        assert.strictEqual(deletedProduct.acknowledged, true);
    });
})