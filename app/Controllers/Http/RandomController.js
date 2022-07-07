'use strict'

const RandomService = use('App/Services/RandomService')

class RandomController {
    constructor() {
        this.service = new RandomService
    }

    getRandoms({request, response, view}) {
        try {
            const { cant } = request.qs

            let number = cant ?? 100000000

            const randoms = this.service.getRandoms(number)
            
            return response.send(`El resultado es ${randoms}`)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = RandomController
