const User = use('App/Models/User')
const UserDTO = use('App/Models/DTOs/UserDTO')

class UserRepository {
    constructor() {
        this.model = User
    }

    async create(user) {
        try {
            const dto = new UserDTO(user)
            return await this.model.create(dto)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async get(id) {
        try {
            const user = await this.model.get(id)
            return new UserDTO(user)
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    async getByEmail(email) {
        try {
            const user = await this.model.getByEmail(email)
            return new UserDTO(user)
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = UserRepository