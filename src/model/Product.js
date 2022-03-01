class Product {
    constructor(data = []) {
        this.data = data;
    }

    get(id) {
        return this.data.find(product => product.id === +id);
    }

    getAll() {
        const products = [...this.data];

        return products;
    }

    add({ title, price, thumbnail }) {
        const product = {
            id: this.data.length + 1,
            title,
            price,
            thumbnail
        };

        this.data.push(product);
        
        return product;
    }

    edit({ id, title, price, thumbnail }) {
        const index = this.data.findIndex((product) => product.id === +id);

        const product = {
                ...this.data[index],
                title,
                price,
                thumbnail
        };
    
        this.data[index] = product;

        return this.data[index];
    }

    delete(id) {
        const index = this.data.findIndex(product => product.id === +id);

        this.data.splice(index, 1);
    }
}

module.exports = Product;