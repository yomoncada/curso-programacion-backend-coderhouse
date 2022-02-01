const fs = require('fs');

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
            console.log(product.id);
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
            console.log(product ? product : null);
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
            console.log(products);
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
            console.log(newProducts);
            return newProducts;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile('./productos.txt', JSON.stringify([], null, 2));

            console.log('Se eliminaron todose los productos.');
            console.log([]);
            return [];
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }
}

let contenedor = new Contenedor();

const product1 = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
};

const product2 = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
};

const product3 = {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
};

const runChallenge = async () => {
    await contenedor.save(product1);
    await contenedor.save(product2);
    await contenedor.save(product3);
    await contenedor.getById(1);
    await contenedor.deleteById(2);
    await contenedor.deleteAll();
}

runChallenge();