const { DB_CONFIG: dbconfig } = require('../../db/config');
const mongoose = require('mongoose');
const { formatErrorObject } = require('../../utils/api.utils');
const apiConstants = require('../../utils/constants/api.constants');

const { 
    STATUS: { 
        BAD_REQUEST,
        INTERNAL_ERROR,
        NOT_FOUND
    }
} = apiConstants;

class MongoDBContainer {
    constructor(collection, schema) {
        mongoose.connect(dbconfig.mongodb.uri);

        this.model = mongoose.model(collection, schema)
    }

    async get(id) {
        try {
            let data = await this.model.findById(id).lean();

            if (!data) {
                const errorMessage = `Resource with id ${id} does not exist in our records`;
                const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
                throw new Error(JSON.stringify(newError));
            } else {
                return data;
            }

        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }

    async getAll(conditions = {}) {
        try {
            return await this.model.find(conditions, { __v: 0 }).lean();
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }

    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            let newError;

            if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
                newError = formatErrorObject(BAD_REQUEST.tag, 'User with given email already exist');
                throw new Error(JSON.stringify(newError));
            } else {
                newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            }

            throw new Error(JSON.stringify(newError));
        }
    }

    async update(id, data) {
        try {
            return await this.model.updateOne({ '_id' : id }, { $set: { ...data } });
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }

    async delete(id) {
        try {
            return await this.model.deleteOne({ '_id' : id });
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }
}

module.exports = MongoDBContainer;