const express = require('express');
const compression = require('compression');
const os = require('os');
const logger = require('../utils/logger.utils');

const rootRouter = express.Router();

rootRouter.get('/', function(req, res) {
    /* res.redirect('/app/auth/login'); */
    res.send('<h1>Hello from Heroku</h1>');
});

rootRouter.get('/info', (req, res) => {
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
});

rootRouter.get('/info-compression', compression(), (req, res) => {
    res.render('pages/info.ejs', { process: process, cwd: process.cwd(), rss: process.memoryUsage().rss, argv: process.argv.slice(2), cpus: os.cpus().length });
});

rootRouter.all('*', (req, res) => {
    logger.write('warn', `La ruta [${req.method}] ${req.protocol + '://' + req.get('host') + req.originalUrl} es inexistente en el servidor.`);
    res.json({status: false});
});

module.exports = rootRouter;