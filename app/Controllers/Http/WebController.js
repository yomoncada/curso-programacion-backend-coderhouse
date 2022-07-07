'use strict'

class WebController {
    constructor() {
        this.service
    }

    renderHome({request, response, view}) {
        return view.render('home', {user: {email: 'yomoncadabooking@gmail.com'}})
    }
}

module.exports = WebController
