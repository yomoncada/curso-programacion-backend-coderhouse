'use strict'

class Error {
	async handle ({ request }, next) {
		// call next to advance the request
		await next()
	}
}

module.exports = Error