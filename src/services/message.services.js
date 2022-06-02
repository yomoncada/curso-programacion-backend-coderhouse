const { MessagesDao } = require('../model/daos/index');
const messageContainer = new MessagesDao;

const getAll = async () => {
    try {
        return await messageContainer.getAll();
    } catch (error) {
        throw new Error(error.message);
    }
}

const create = async (message) => {
    try {
        return await messageContainer.create(message);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAll,
    create
}