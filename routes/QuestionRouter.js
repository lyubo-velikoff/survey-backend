const express = require('express')
const { QuestionController } = require('../controllers')
const { QuestionValidation } = require('../validations')
const router = express.Router()

router.post('/', QuestionValidation.create, QuestionController.create)
router.get('/', QuestionController.findAll)
router.get('/:id', QuestionValidation.findOne, QuestionController.findOne)
router.put('/:id', QuestionValidation.update, QuestionController.update)
router.delete('/:id', QuestionValidation.delete, QuestionController.delete)

module.exports = router