const dbconfig = require('../db/config');
const knex = require('knex')(dbconfig.sqlite3);

class Message {
    constructor() {
    }

    async get(id) {
        try {
            const messages = await knex.from('messages')
            .select('*')
            .where('id', '=', id)

            return messages[0] ? messages[0] : null;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const messages = await knex.from('messages')
            .select('*')

            return messages ? messages : [];
        } catch (error) {
            return [];
        }
    }

    async add({author, text}) {
        try {  
            let message = {
                id: null,
                author: author,
                text: text,
                dateTime: null
            };

            await knex('messages').insert(message);

            return message;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await this.knexObject('messages').where({id: id}).del();
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async deleteAll() {
        try {
            await this.knexObject('messages').del();
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }
}

module.exports = Message;