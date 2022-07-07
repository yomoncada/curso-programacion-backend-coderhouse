'use strict'

class ErrorController {
    constructor() {
        this.service
    }

    loginError({request, response, view}) {
        return view.render('error', {error: 'Hubo un problema al intentar iniciar sesión.', href: '/login'})
    }

    registerError({request, response, view}) {
        return view.render('error', {error: 'Hubo un problema al intentar registrarse.', href: '/register'})
    }
}

module.exports = ErrorController
