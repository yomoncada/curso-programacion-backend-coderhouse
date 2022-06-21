const RandomService = require('../services/random.services')

class RandomControllers {
    constructor(service) {
        this.service = new RandomService;
        this.getRandoms = this.getRandoms.bind(this);
    }

    getRandoms(req, res, next) {
        try {
            const { cant } = req.query;

            let number = cant ?? 100000000;

            const randoms = this.service.getRandoms(number);
            
            res.send(`El resultado es ${randoms}`);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = RandomControllers;