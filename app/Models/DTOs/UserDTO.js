class UserDTO {
    constructor(userObj, id) {
        Object.assign(this, userObj)

        this.created_at = userObj.created_at || Date.now()
        this.updated_at = Date.now()

        if (id) {
            this.id = id
        }
    }
}

module.exports = UserDTO