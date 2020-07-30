const validate = require('../utils/validation')
const { param, body } = require('express-validator')

exports.create = validate([
    body('name').escape().trim().exists().isString(),
    body('gender').escape().trim().exists(), // is enum m or f
    body('postcode').escape().trim().exists().isString(),
    body('dob').escape().trim().exists().isISO8601().toDate(),
])

exports.answer = validate([
    param('id').exists().isInt(),
    body('questionId').escape().trim().exists().isInt(),
    body('answerId').escape().trim().exists().isInt(),
])

exports.findOne = validate([
    param('id').exists().isInt()
])

exports.findUserByName = validate([
    param('name').exists().isString()
])

exports.findAllAvailableQuestions = validate([
    param('id').exists().isInt()
])

exports.update = validate([
    body('name').escape().trim().optional().isString(),
    body('gender').escape().trim().optional(), // is enum m or f
    body('postcode').escape().trim().optional().isString(),
    body('dob').escape().trim().optional().isISO8601().toDate(),
])

exports.updateRole = validate([
    param('id').exists().isInt(),
    body('roleId').escape().trim().exists().isInt(),
])

exports.deleteRole = validate([
    param('id').exists().isInt(),
    body('roleId').escape().trim().exists().isInt(),
])

exports.delete = validate([
    param('id').exists().isInt()
])