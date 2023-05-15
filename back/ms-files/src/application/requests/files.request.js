const Joi = require('joi')
const ErrorsCatalog = require('../dictionaries/errors/files.error.json')
const csvPattern = '^.*\\.csv$'
const schema = Joi.object().keys({
  fileName: Joi.string().pattern(new RegExp(csvPattern))
})

module.exports = class GetFilesRequest {
  constructor (data) {
    const { error, value } = schema.validate(data)
    if (!error) {
      Object.assign(this, value)
      return data
    }
    const err = new Error()
    Object.assign(err, ErrorsCatalog.bad_request)
    return err
  }
}
