'use strict'
const Category = use('App/Models/Category')
const Database = use('Database')
const { validate } = use('Validator')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async index({ response }) {
    const data = await Database.table('categories')
    return response.status(200).json(data)
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['name', 'description'])
    const category = await Category.create(data)

    return response.status(201).json(category)
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const id = params.id
    const category = await Category.findByOrFail('id', id)

    return response.status(200).json(category)
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const id = params.id
    const { name, description } = request.only(['name', 'description'])
    const data =  await Category.query().where('id', id)
                                .update({ name: name, description: description })

    return response.status(200).json(data)
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const id = params.id
    const affectedRows = await Category.query().where('id', id).delete()
    return response.status(200).json('No of affected rows: ' + affectedRows)
  }
}

module.exports = CategoryController
