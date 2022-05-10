const express = require('express');
const randomRouter = express.Router();
const { getRandoms } = require('../../utils/random.utils');

randomRouter.get('/', (req, res) => {
    const { cant } = req.query;

    let number = cant ?? 100000000;

    const randoms = getRandoms(number);
    
    res.send(`El resultado es ${randoms}`);
});

module.exports = randomRouter;