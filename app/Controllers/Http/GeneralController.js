'use strict'

const os = require('os')

class GeneralController {
    constructor() {
        this.service
    }

    renderInfo({request, response, view}) {
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
            }
        
            console.log(info)
        
            return view.render('info', {info})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = GeneralController
