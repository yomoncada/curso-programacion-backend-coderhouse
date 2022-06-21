const randomUtil = require('../utils/random.utils')

class RandomService {
    constructor() {
        this.repository = randomUtil;
    }

    getRandoms(number) {
        try {
            return this.repository.getRandoms(number);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = RandomService;