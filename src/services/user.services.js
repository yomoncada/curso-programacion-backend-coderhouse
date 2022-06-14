const UserRepository = require('../repositories/user.repository')

class UserService {
    constructor() {
        this.UserRepository = new UserRepository;
    }

    async getUser(id) {
        try {
            return await this.UserRepository.get(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUserByEmail(email) {
        try {
            return await this.UserRepository.getByEmail(email);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createUser(user) {
        try {
            return await this.UserRepository.create(user);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new UserService();