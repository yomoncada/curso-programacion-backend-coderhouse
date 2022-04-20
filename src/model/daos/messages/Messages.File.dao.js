const FileContainer = require("../../../model/containers/File.container");

class FileMessagesDao extends FileContainer {
    constructor(){
        super('./src/data/messages.json');
    }
}

module.exports = FileMessagesDao;