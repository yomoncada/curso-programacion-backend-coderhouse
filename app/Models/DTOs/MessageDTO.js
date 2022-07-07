class MessageDTO {
    constructor(messageObj, id) {
        Object.assign(this, messageObj)

        this.created_at = messageObj.created_at || Date.now()
        this.updated_at = Date.now()

        if (id) {
            this.id = id
        }
    }
}

module.exports = MessageDTO