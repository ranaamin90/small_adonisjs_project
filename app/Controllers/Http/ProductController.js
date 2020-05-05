'use strict'
const Product = use('App/Models/Product')
const Database = use('Database')
const { validate } = use('Validator')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    const data = await Product.query().with("category").fetch();
    return response.status(200).json(data)
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const data = request.only(['name', 'description', 'category_id'])
    const product = await Product.create(data)

    return response.status(201).json(product)
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const id = params.id
    const product = await Product.findByOrFail('id', id)

    return response.status(200).json(product)
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const id = params.id
    const { name, description, category_id } = request.only(['name', 'description', 'category_id'])
    const data =  await Product.query().where('id', id)
                                .update({ name: name, description: description, category_id: category_id })

    return response.status(200).json(data)
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const id = params.id
    const affectedRows = await Product.query().where('id', id).delete()
    return response.status(200).json('No of affected rows: ' + affectedRows)
  }
}

module.exports = ProductController
