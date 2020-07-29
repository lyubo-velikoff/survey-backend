const validate = require('../utils/validation')
const { param, body } = require('express-validator')

exports.create = validate([
    body('title').escape().trim().exists().isString(),
    body('priority').escape().trim().optional().isInt(),
])

exports.findOne = validate([
    param('id').exists().isInt()
])

exports.update = validate([
    body('title').escape().trim().exists().isString(),
    body('priority').escape().trim().optional().isInt(),
])

exports.delete = validate([
    param('id').exists().isInt()
])