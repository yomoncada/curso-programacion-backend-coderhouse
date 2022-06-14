const os = require('os');
class GeneralControllers {
    constructor(service) {
        this.service = service;
        this.renderInfo = this.renderInfo.bind(this);
    }
    
    renderInfo(req, res, next) {
        try {
            const info = { 
                inputArguments: process.argv.slice(2), 
                cpus: os.cpus().length,
                platformName: process.platform, 
                nodeJsVersion: process.version, 
                reservedTotalMemory: process.memoryUsage().rss, 
                executionPath: process.execPath,
                processId: process.pid, 
                projectFolder: process.cwd()
            };
        
            console.log(info);
        
            res.render('pages/info.ejs', { info });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = GeneralControllers;