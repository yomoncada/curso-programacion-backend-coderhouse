class RandomControllers {
    constructor(service) {
        this.service = service;
        this.getRandoms = this.getRandoms.bind(this);
    }

    getRandoms(req, res, next) {
        try {
            const { cant } = req.query;

            let number = cant ?? 100000000;

            const randoms = randomUtil.getRandoms(number);
            
            res.send(`El resultado es ${randoms}`);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = RandomControllers;