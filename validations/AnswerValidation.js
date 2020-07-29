const validate = require('../utils/validation')
const { param, body } = require('express-validator')

exports.create = validate([
    body('answer').escape().trim().exists().isInt(),
    body('title').escape().trim().exists().isString(),
])

exports.findOne = validate([
    param('id').exists().isInt()
])

exports.update = validate([
    body('answer').escape().trim().exists().isInt(),
    body('title').escape().trim().exists().isString(),
])

exports.delete = validate([
    param('id').exists().isInt()
])