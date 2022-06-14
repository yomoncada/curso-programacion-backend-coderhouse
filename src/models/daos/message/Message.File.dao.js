const FileContainer = require("../../containers/File.container");

class MessageFileDAO extends FileContainer {
    static instance;

    constructor() {
        if (!MessageFileDAO.instance) {
            super('./src/data/messages.json');
            MessageFileDAO.instance = this;
            return this;
        } else {
            return MessageFileDAO.instance;
        }
    }
}

module.exports = MessageFileDAO;