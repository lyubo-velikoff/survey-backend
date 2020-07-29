const validate = require('../utils/validation')
const { param, body } = require('express-validator')

exports.create = validate([
    body('name').escape().trim().exists().isString(),
    body('gender').escape().trim().exists(), // is enum m or f
    body('postcode').escape().trim().exists().isString(),
    body('dob').escape().trim().exists().isISO8601().toDate(),
])

exports.findOne = validate([
    param('id').exists().isInt()
])

exports.update = validate([
    body('name').escape().trim().exists().isString(),
    body('gender').escape().trim().exists(), // is enum m or f
    body('postcode').escape().trim().exists().isString(),
    body('dob').escape().trim().exists().isISO8601().toDate(),
])

exports.delete = validate([
    param('id').exists().isInt()
])