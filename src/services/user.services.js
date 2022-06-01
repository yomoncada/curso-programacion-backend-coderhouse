const { UsersDao } = require('../model/daos/index');
const userContainer = new UsersDao;

const get = async (id) => {
    try {
        return await userContainer.get(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

const getByEmail = async (email) => {
    try {
        return await userContainer.getByEmail(email);
    } catch (error) {
        throw new Error(error.message);
    }
}

const create = async (user) => {
    try {
        user.createdAt = Date.now();
        user.updatedAt = Date.now();
        return await userContainer.create(user);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    get,
    getByEmail,
    create
}