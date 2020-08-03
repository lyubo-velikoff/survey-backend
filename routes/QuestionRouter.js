const express = require('express')
const { QuestionController } = require('../controllers')
const { QuestionValidation } = require('../validations')
const router = express.Router()

/**
 * Get a list of questions
 * @route GET /questions
 * @group Question - Operations about question
 * @returns {Error}  default - Unexpected error
 */
router.get('/', QuestionController.findAll)
router.post('/', QuestionValidation.create, QuestionController.create)
router.get('/:id', QuestionValidation.findOne, QuestionController.findOne)
router.put('/:id', QuestionValidation.update, QuestionController.update)
router.delete('/:id', QuestionValidation.delete, QuestionController.delete)

module.exports = router