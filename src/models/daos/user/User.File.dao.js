const FileContainer = require("../../containers/File.container");

class UserFileDAO extends FileContainer {
    static instance;
    
    constructor() {
        if (!UserFileDAO.instance) {
            super('./src/data/users.json');
            UserFileDAO.instance = this;
            return this;
        } else {
            return UserFileDAO.instance;
        }
    }
}

module.exports = UserFileDAO;