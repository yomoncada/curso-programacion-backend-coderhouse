'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/* Route.on('/').render('welcome') */
Route
    .get('/', 'WebController.renderHome')
    .middleware('auth')

Route.group(() => {
        Route.get('/', 'AuthController.renderLogin')
        Route.post('/', 'AuthController.login')
}).prefix('/login')
Route.group(() => {
        Route.get('/', 'AuthController.renderRegister')
        Route.post('/', 'AuthController.register')
}).prefix('/register')

Route.get('/login-error', 'ErrorController.login')
Route.get('/register-error', 'ErrorController.register')

Route.get('/info', 'GeneralController.renderInfo')
/* Route.get('/info-compression', 'GeneralController.renderInfo') */

Route.group(() => {
    Route.get('/', 'ProductController.getProducts')
    Route.post('/', 'ProductController.createProduct')
}).prefix('/api/products')
Route.group(() => {
    Route.get('/', 'ProductController.getProductById')
    Route.put('/', 'ProductController.updateProductById')
    Route.delete('/', 'ProductController.deleteProductById')
}).prefix('/api/products/:id')

Route.get('/randoms', 'RandomController.getRandoms')


