const express = require('express')
const { PermissionController } = require('../controllers')
const { PermissionValidation } = require('../validations')
const router = express.Router()

router.post('/', PermissionValidation.create, PermissionController.create)
router.get('/', PermissionController.findAll)
router.get('/:id', PermissionValidation.findOne, PermissionController.findOne)
router.put('/:id', PermissionValidation.update, PermissionController.update)
router.delete('/:id', PermissionValidation.delete, PermissionController.delete)

module.exports = router