const express = require('express')
const { UserController } = require('../controllers')
const { UserValidation } = require('../validations')
const router = express.Router()

router.post('/', UserValidation.create, UserController.create)
router.get('/', UserController.findAll)
router.get('/:id', UserValidation.findOne, UserController.findOne)
router.put('/:id', UserValidation.update, UserController.update)
router.delete('/:id', UserValidation.delete, UserController.delete)

module.exports = router