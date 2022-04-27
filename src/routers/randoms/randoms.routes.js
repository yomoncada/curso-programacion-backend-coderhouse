const express = require('express');
const randomRouter = express.Router();
const { fork } = require('child_process');


randomRouter.get('/', (req, res) => {
    const { cant } = req.query;

    let number = cant ?? 100000000;

    const randoms = fork('./randoms.js', [`${number}`]);

    randoms.send('start');
    randoms.on('message', (data) => {
        res.send(`El resultado es ${data}`);
    })
});

module.exports = randomRouter;