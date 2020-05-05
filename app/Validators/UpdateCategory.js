'use strict'

class UpdateCategory {
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
}

module.exports = UpdateCategory
