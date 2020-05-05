'use strict'

class StoreCategory {
  get rules () {
    return {
      name: 'required',
    }
  }

  get messages () {
    return {
      'name.required': 'You must provide a name.',
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = StoreCategory
