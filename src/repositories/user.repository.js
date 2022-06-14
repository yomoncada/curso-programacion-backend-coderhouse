require('dotenv').config();

const UserDTO = require('../models/dtos/user.dto');
const DAOSFactory = require('../models/daos/Daos.factory');

class UserRepository {
    constructor() {
        this.dao = DAOSFactory.getDAOS(process.env.PERS).UserDAO;
    }

    async create(user) {
        try {
            const dto = new UserDTO(user);
            return await this.dao.create(dto);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async get(id) {
        try {
            const user = await this.dao.get(id);
            return new UserDTO(user);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async getByEmail(email) {
        try {
            const user = await this.dao.getByEmail(email);
            return new UserDTO(user);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = UserRepository;