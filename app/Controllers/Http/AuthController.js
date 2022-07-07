'use strict'

const UserService = use('App/Services/UserService')

class AuthController {
    constructor() {
        this.service = new UserService;
    }

    renderLogin({request, response, view}) {
        return view.render('login')
    }

    renderRegister({request, response, view}) {
        return view.render('register')
    }

    redirectToHome({request, response, view}) {
        response.redirect('/')
    }

    async register({request, response, view, auth, session}) {
        try {
            const user = await this.service.createUser(request.all());

            session.put('user', user.email);

            response.route('/');
        } catch(error) {
            console.log(error)
        }
    }

    async login({request, response, view, auth, session}) {
        try {
            const {email, password} = request.all();
            
            if (await auth.attempt(email, password, true)) {
                const user = await this.service.getUserByEmail(email);

                session.put('user', user.email);

                response.route('/');
            }
        } catch(error) {
            console.log(error)
        }
    }

    async logout({request, response, view, auth, session}) {
        try {
            await auth.logout();

            session.forget('user');
            
            response.redirect('/');
        } catch(error) {
            console.log(error)
        }
    }
}

module.exports = AuthController
