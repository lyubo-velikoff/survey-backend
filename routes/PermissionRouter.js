const express = require('express')
const { PermissionController } = require('../controllers')
const { PermissionValidation } = require('../validations')
const router = express.Router()

/**
 * Get a list of permissions
 * @route GET /permissions
 * @group Permission - Operations about permission
 * @returns {Error}  default - Unexpected error
 */
router.get('/', PermissionController.findAll)
router.post('/', PermissionValidation.create, PermissionController.create)
router.get('/:id', PermissionValidation.findOne, PermissionController.findOne)
router.put('/:id', PermissionValidation.update, PermissionController.update)
router.delete('/:id', PermissionValidation.delete, PermissionController.delete)

module.exports = router