const UserRepository = require('../repositories/user.repository')

class UserService {
    constructor() {
        this.repository = new UserRepository;
    }

    async getUser(id) {
        try {
            return await this.repository.get(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUserByEmail(email) {
        try {
            return await this.repository.getByEmail(email);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createUser(user) {
        try {
            return await this.repository.create(user);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new UserService();