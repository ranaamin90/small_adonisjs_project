'use strict'

class StoreProduct {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      category_id: 'required'
    }
  }

  get messages () {
    return {
      'name.required': 'You must provide a name.',
      'category_id.required': 'You must provide a category.'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = StoreProduct
