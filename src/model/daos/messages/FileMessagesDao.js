const FileContainer = require("../../containers/FileContainer");

class FileCartsDao extends FileContainer {
    constructor(){
        super('./src/data/messages.json');
    }
}

module.exports = FileCartsDao;