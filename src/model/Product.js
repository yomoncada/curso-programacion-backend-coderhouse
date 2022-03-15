const dbconfig = require('../db/config');
const knex = require('knex')(dbconfig.mariaDB);

class Product {
    constructor() {
    }

    async get(id) {
        try {
            const products = await knex.from('products')
            .select('*')
            .where('id', '=', id)

            return products[0] ? products[0] : null;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const products = await knex.from('products')
            .select('*')

            return products ? products : [];
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async add({ title, price, thumbnail }) {
        try {
            const product = {
                id: null,
                title,
                price,
                thumbnail
            };

            await knex('products').insert(product);

            return product;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await this.knexObject('products').where({id: id}).del();
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async deleteAll() {
        try {
            await this.knexObject('products').del();
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }
}

module.exports = Product;