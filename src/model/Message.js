const fs = require('fs');

class Message {
    constructor(path = null) {
        this.path = path;
    }

    async add({author, text, dateTime}) {
        try {  
            let message = {
                id: 1,
                author: author,
                text: text,
                dateTime: dateTime
            };

            let contents = await this.getAll();

            if (contents.length > 0) {
                message.id = contents[contents.length-1].id + 1;
            } else {
                contents = new Array;
            }

            contents.push(message);

            await fs.promises.writeFile(this.path, JSON.stringify(contents, null, 2));

            return message.id;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async get(id) {
        try {
            const contents = await fs.promises.readFile(this.path, 'utf-8');
            const messages = JSON.parse(contents);
            const message = messages.find(message => message.id == id);

            return message ? message : null;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const contents = await fs.promises.readFile(this.path, 'utf-8');
            
            return JSON.parse(contents);
        } catch (error) {
            return [];
        }
    }

    async delete(id) {
        try {
            const messages = await this.getAll();
            const newMessages = messages.filter((message) => message.id !== id);

            await fs.promises.writeFile(this.path, JSON.stringify(newMessages, null, 2));

            return newMessages;
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));

            return [];
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }
}

module.exports = Message;