const express = require('express')
const { RoleController } = require('../controllers')
const { RoleValidation } = require('../validations')
const router = express.Router()

router.post('/', RoleValidation.create, RoleController.create)
router.get('/', RoleController.findAll)
router.get('/:id', RoleValidation.findOne, RoleController.findOne)
router.put('/:id', RoleValidation.update, RoleController.update)
router.delete('/:id', RoleValidation.delete, RoleController.delete)

module.exports = router