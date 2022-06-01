const randomUtil = require('../utils/random.utils');

const getRandoms = (req, res, next) => {
    try {
        const { cant } = req.query;

        let number = cant ?? 100000000;

        const randoms = randomUtil.getRandoms(number);
        
        res.send(`El resultado es ${randoms}`);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getRandoms
};