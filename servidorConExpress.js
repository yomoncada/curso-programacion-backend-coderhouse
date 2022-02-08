const fs = require('fs');
const express = require('express');

class Contenedor {
    constructor() {
    }

    async save({title, price, thumbnail}) {
        try {  
            let product = {
                id: 1,
                title: title,
                price: price,
                thumbnail: thumbnail
            };

            let contents = await this.getAll();
            
            if (contents.length > 0) {
                product.id = contents[contents.length-1].id + 1;
            } else {
                contents = new Array;
            }

            contents.push(product);

            await fs.promises.writeFile('./productos.txt', JSON.stringify(contents, null, 2));

            console.log('Se guardó el producto.');
            return product.id;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const contents = await fs.promises.readFile('./productos.txt', 'utf-8');
            const products = JSON.parse(contents);
            const product = products.find(product => product.id == id);

            console.log('Se obtuvo el producto.');
            return product ? product : null;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const contents = await fs.promises.readFile('./productos.txt', 'utf-8');
            const products = JSON.parse(contents);

            console.log('Se obtuvieron los productos.');
            return products;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async deleteById(id) {
        try {
            const products = await this.getAll();
            const newProducts = products.filter((product) => product.id !== id);

            await fs.promises.writeFile('./productos.txt', JSON.stringify(newProducts, null, 2));

            console.log('Se eliminó el producto.');
            return newProducts;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile('./productos.txt', JSON.stringify([], null, 2));

            console.log('Se eliminaron todose los productos.');
            return [];
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }
}

let contenedor = new Contenedor();

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/productos', async (req, res) => {
    const products = await contenedor.getAll();
    
    res.json(products);
});

app.get('/productoRandom', async (req, res) => {
    const products = await contenedor.getAll();
    const randomId = Math.floor(Math.random() * products.length) + 1;
    const product = await contenedor.getById(randomId);

    res.json(product);
});

const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`)
})

connectedServer.on('error', (error) => {
    console.log(error.message)
});