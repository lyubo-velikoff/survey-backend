const express = require('express')
const { AnswerController } = require('../controllers')
const { AnswerValidation } = require('../validations')
const router = express.Router()

/**
 * Get a list of answers
 * @route GET /answers
 * @group Answer - Operations about answer
 * @returns {Error}  default - Unexpected error
 */
router.get('/', AnswerController.findAll)
router.post('/', AnswerValidation.create, AnswerController.create)
router.get('/:id', AnswerValidation.findOne, AnswerController.findOne)
router.put('/:id', AnswerValidation.update, AnswerController.update)
router.delete('/:id', AnswerValidation.delete, AnswerController.delete)

module.exports = router