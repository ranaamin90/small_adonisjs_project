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

Route.on('/').render('welcome')

// Route.post('/categories', 'CategoryController.store').validator('StoreCategory')
Route.resource('/categories', 'CategoryController')
    .validator(new Map([
    [['/categories.store'], ['StoreCategory']],
    [['/categories.update'], ['UpdateCategory']]
  ])).apiOnly()
Route.resource('/products', 'ProductController')
    .validator(new Map([
    [['/products.store'], ['StoreProduct']],
    [['/products.update'], ['UpdateProduct']]
  ])).apiOnly()