const fs = require('fs');
const { formatErrorObject } = require('../../utils/api.utils');
const apiConstants = require('../../utils/constants/api.constants');

const { 
    STATUS: { 
      INTERNAL_ERROR,
      NOT_FOUND
    }
} = apiConstants;

class FileContainer {
    constructor(path = null) {
        this.path = path;
    }
    
    async get(id) {
        try {
            const contents = await fs.promises.readFile(this.path, 'utf-8');
            const data = JSON.parse(contents);
            const object = data.find(object => object.id == id);

            return object ? object : null;
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
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
    
    async create(data) {
        try {  
            let object = {
                id: 1,
                ...data
            };

            let contents = await this.getAll();

            if (contents.length > 0) {
                object.id = contents[contents.length-1].id + 1;
            } else {
                contents = new Array;
            }

            contents.push(object);

            await fs.promises.writeFile(this.path, JSON.stringify(contents, null, 2));

            return object.id;
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }

    async update(id, data) {
        try {  
            let contents = await this.getAll();

            const index = contents.findIndex((object) => object.id === +id);

            const object = {
                ...contents[index],
                ...data
            };

            contents[index] = object;

            await fs.promises.writeFile(this.path, JSON.stringify(contents, null, 2));

            return contents[index];
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }

    async delete(id) {
        try {
            const contents = await this.getAll();
            const newData = contents.filter((object) => object.id !== +id);

            await fs.promises.writeFile(this.path, JSON.stringify(newData, null, 2));

            return newData;
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));

            return [];
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }
}

module.exports = FileContainer; 