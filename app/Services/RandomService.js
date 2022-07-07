const RandomUtil = use('App/Utils/RandomUtil')

class RandomService {
    constructor() {
        this.repository = RandomUtil
    }

    getRandoms(number) {
        try {
            return this.repository.getRandoms(number)
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = RandomService