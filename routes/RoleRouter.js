const express = require('express')
const { RoleController } = require('../controllers')
const { RoleValidation } = require('../validations')
const router = express.Router()

/**
 * Get a roles
 * @route GET /roles
 * @group Role - Operations about role
 * @returns {Error}  default - Unexpected error
 */
router.get('/', RoleController.findAll)
router.post('/', RoleValidation.create, RoleController.create)
router.get('/:id', RoleValidation.findOne, RoleController.findOne)
router.put('/:id', RoleValidation.update, RoleController.update)
router.put('/:id/permission', RoleValidation.updatePermission, RoleController.updatePermission)
router.delete('/:id/permission', RoleValidation.deletePermission, RoleController.deletePermission)
router.delete('/:id', RoleValidation.delete, RoleController.delete)

module.exports = router